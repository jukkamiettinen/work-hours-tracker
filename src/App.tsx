import { useState } from 'react';
import { WeekView } from './components/WeekView';
import { OvertimeSummary } from './components/OvertimeSummary';
import './App.css'

function App() {
  const [view, setView] = useState<'week' | 'summary'>('week');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="container mx-auto py-4">
          <h1 className="text-3xl font-bold text-gray-900">Work Hours Tracker</h1>
        </div>
      </header>
      <div className="container mx-auto p-4">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setView(view === 'week' ? 'summary' : 'week')}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            {view === 'week' ? 'Show Overtime Summary' : 'Show Weekly View'}
          </button>
        </div>
        {view === 'week' ? <WeekView /> : <OvertimeSummary />}
      </div>
    </div>
  )
}

export default App
