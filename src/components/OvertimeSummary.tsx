import { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { fi } from 'date-fns/locale';
import { workHoursService, WeekData } from '../services/workHoursService';

const STANDARD_HOURS_PER_DAY = 7.5;

export const OvertimeSummary = () => {
  const [allHours, setAllHours] = useState<WeekData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const data = await workHoursService.getAllWorkHours();
        setAllHours(data.sort((a, b) => 
          new Date(b.weekStart).getTime() - new Date(a.weekStart).getTime()
        ));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const calculateWeekDifference = (hours: Record<string, Record<string, number>>) => {
    return Object.values(hours)
      .map(dayHours => {
        const totalHours = Object.values(dayHours).reduce((sum, h) => sum + h, 0);
        return totalHours > 0 ? totalHours - STANDARD_HOURS_PER_DAY : 0;
      })
      .reduce((sum, diff) => sum + diff, 0);
  };

  const totalOvertime = allHours.reduce((total, week) => {
    return total + calculateWeekDifference(week.hours);
  }, 0);

  if (isLoading) {
    return <div className="text-center p-4">Loading summary...</div>;
  }

  if (error) {
    return <div className="text-red-600 p-4">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Overtime Summary</h1>
      
      <div className="mb-6">
        <div className="text-xl font-semibold mb-2">
          Total Overtime: 
          <span className={totalOvertime > 0 ? 'text-green-600' : 'text-red-600'}>
            {' '}{totalOvertime > 0 ? '+' : ''}{totalOvertime.toFixed(1)} hours
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-2 border-b text-left">Week</th>
              <th className="p-2 border-b text-right">Overtime Hours</th>
            </tr>
          </thead>
          <tbody>
            {allHours.map((week) => {
              const weekDiff = calculateWeekDifference(week.hours);
              return (
                <tr key={week.weekStart} className="hover:bg-gray-50">
                  <td className="p-2 border-b">
                    Week {format(parseISO(week.weekStart), 'w/yyyy', { locale: fi })}
                  </td>
                  <td className={`p-2 border-b text-right ${
                    weekDiff > 0 ? 'text-green-600' : weekDiff < 0 ? 'text-red-600' : ''
                  }`}>
                    {weekDiff > 0 ? '+' : ''}{weekDiff.toFixed(1)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}; 