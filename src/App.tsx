import { WeekView } from './components/WeekView'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="container mx-auto py-4">
          <h1 className="text-3xl font-bold text-gray-900">Work Hours Tracker</h1>
        </div>
      </header>
      <main className="container mx-auto py-8">
        <WeekView />
      </main>
    </div>
  )
}

export default App
