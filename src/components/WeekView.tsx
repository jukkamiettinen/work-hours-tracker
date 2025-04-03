import { useState, useEffect, useMemo } from 'react';
import { format, startOfWeek, addDays, subWeeks, addWeeks, getWeek } from 'date-fns';
import { fi } from 'date-fns/locale';
import { workHoursService, WeekHours, Project } from '../services/workHoursService';

const STANDARD_HOURS_PER_DAY = 7.5;

export const WeekView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [workHours, setWorkHours] = useState<WeekHours>({});
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const weekStart = useMemo(() => startOfWeek(currentDate, { weekStartsOn: 1 }), [currentDate]); // Monday
  const weekNumber = getWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = useMemo(() => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)), [weekStart]);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        console.log('Starting to load data...');
        const [hours, projectsList] = await Promise.all([
          workHoursService.getWorkHours(weekStart),
          workHoursService.getProjects()
        ]);
        if (isMounted) {
          console.log('Loaded projects:', projectsList);
          console.log('Loaded hours:', hours);
          setWorkHours(hours);
          setProjects(projectsList);
        }
      } catch (err) {
        if (isMounted) {
          console.error('Error loading data:', err);
          setError(err instanceof Error ? err.message : 'Failed to load data');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [currentDate, weekStart]);

  const handlePreviousWeek = () => {
    setCurrentDate(subWeeks(currentDate, 1));
  };

  const handleNextWeek = () => {
    setCurrentDate(addWeeks(currentDate, 1));
  };

  const handleCopyPreviousWeek = async () => {
    try {
      const previousHours = await workHoursService.getPreviousWeekHours(weekStart);
      setWorkHours(previousHours);
      await workHoursService.saveWorkHours(weekStart, previousHours);
    } catch (err) {
      console.error('Error copying previous week:', err);
      setError(err instanceof Error ? err.message : 'Failed to copy previous week');
    }
  };

  const handleHoursChange = async (date: string, projectId: string, hours: number) => {
    try {
      const currentDayHours = workHours[date] || {};
      const newDayHours = {
        ...currentDayHours,
        [projectId]: hours
      };
      const newWorkHours = {
        ...workHours,
        [date]: newDayHours
      };
      setWorkHours(newWorkHours);
      await workHoursService.saveWorkHours(weekStart, newWorkHours);
    } catch (err) {
      console.error('Error saving work hours:', err);
      setError(err instanceof Error ? err.message : 'Failed to save work hours');
    }
  };

  const calculateDayDifference = (dayHours: Record<string, number>) => {
    const totalHours = Object.values(dayHours).reduce((sum, hours) => sum + hours, 0);
    // Only calculate difference if there are hours entered
    return totalHours > 0 ? +(totalHours - STANDARD_HOURS_PER_DAY).toFixed(1) : null;
  };

  const calculateTotalDifference = () => {
    return weekDays
      .map(day => {
        const dateStr = format(day, 'yyyy-MM-dd');
        const dayHours = workHours[dateStr] || {};
        const totalHours = Object.values(dayHours).reduce((sum, hours) => sum + hours, 0);
        // Only include days that have hours
        return totalHours > 0 ? calculateDayDifference(dayHours) : null;
      })
      .filter(diff => diff !== null) // Filter out null values (days without hours)
      .reduce((sum, diff) => sum + (diff || 0), 0);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="text-lg mb-2">Loading...</div>
        {error && (
          <div className="text-red-500 mt-2">
            Error: {error}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Week {weekNumber}</h1>
        <div className="flex gap-2">
          <button
            onClick={handlePreviousWeek}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Previous Week
          </button>
          <button
            onClick={handleCopyPreviousWeek}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Copy Previous Week
          </button>
          <button
            onClick={handleNextWeek}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Next Week
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
          Error: {error}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="w-32 p-2 border-b text-left">Project</th>
              {weekDays.map((day) => (
                <th key={day.toISOString()} className="w-32 p-2 border-b">
                  <div className="font-semibold">
                    {format(day, 'EEEEEE', { locale: fi })}
                  </div>
                  <div className="text-sm text-gray-600">
                    {format(day, 'd.M', { locale: fi })}
                  </div>
                </th>
              ))}
              <th className="w-32 p-2 border-b text-left">Total</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="hover:bg-gray-50">
                <td className="p-2 border-b" style={project.color ? { color: project.color } : undefined}>
                  {project.name}
                </td>
                {weekDays.map((day) => {
                  const dateStr = format(day, 'yyyy-MM-dd');
                  const dayHours = workHours[dateStr] || {};
                  return (
                    <td key={day.toISOString()} className="p-2 border-b">
                      <input
                        type="number"
                        min="0"
                        max="24"
                        step="0.5"
                        value={dayHours[project.id] || ''}
                        onChange={(e) => handleHoursChange(
                          dateStr,
                          project.id,
                          parseFloat(e.target.value)
                        )}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder=""
                      />
                    </td>
                  );
                })}
                <td className="p-2 border-b font-semibold">
                  {weekDays
                    .map(day => workHours[format(day, 'yyyy-MM-dd')]?.[project.id] || '')
                    .filter(hours => hours !== '')
                    .reduce((sum, hours) => sum + (typeof hours === 'number' ? hours : 0), 0)
                    .toFixed(1)}
                </td>
              </tr>
            ))}
            <tr className="bg-gray-50 font-semibold">
              <td className="p-2 border-b">Total</td>
              {weekDays.map((day) => {
                const dateStr = format(day, 'yyyy-MM-dd');
                const dayHours = workHours[dateStr] || {};
                const total = Object.values(dayHours).reduce((sum, hours) => sum + hours, 0);
                return (
                  <td key={day.toISOString()} className="p-2 border-b text-center">
                    {total > 0 ? total.toFixed(1) : ''}
                  </td>
                );
              })}
              <td className="p-2 border-b">
                {Object.values(workHours)
                  .reduce((sum, day) => sum + Object.values(day).reduce((daySum, hours) => daySum + hours, 0), 0) > 0 
                  ? Object.values(workHours)
                      .reduce((sum, day) => sum + Object.values(day).reduce((daySum, hours) => daySum + hours, 0), 0)
                      .toFixed(1)
                  : ''}
              </td>
            </tr>
            <tr className="bg-gray-100">
              <td className="p-2 border-b">+/- (7.5h)</td>
              {weekDays.map((day) => {
                const dateStr = format(day, 'yyyy-MM-dd');
                const dayHours = workHours[dateStr] || {};
                const totalHours = Object.values(dayHours).reduce((sum, hours) => sum + hours, 0);
                // Only show difference if there are hours entered
                const difference = totalHours > 0 ? calculateDayDifference(dayHours) : null;
                const textColor = difference !== null ? (difference > 0 ? 'text-green-600' : difference < 0 ? 'text-red-600' : '') : '';
                return (
                  <td key={day.toISOString()} className={`p-2 border-b text-center ${textColor}`}>
                    {difference !== null && ((difference > 0 ? '+' : '') + difference)}
                  </td>
                );
              })}
              <td className={`p-2 border-b font-bold ${calculateTotalDifference() > 0 ? 'text-green-600' : calculateTotalDifference() < 0 ? 'text-red-600' : ''}`}>
                {calculateTotalDifference() !== 0 && ((calculateTotalDifference() > 0 ? '+' : '') + calculateTotalDifference().toFixed(1))}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}; 