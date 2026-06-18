import { useState } from 'react'
import { useWorkout } from './hooks/useWorkout'
import { TabBar } from './components/TabBar/TabBar'
import { TodayScreen } from './components/Today/TodayScreen'
import { HistoryScreen } from './components/History/HistoryScreen'
import { RoutineScreen } from './components/Routine/RoutineScreen'
import { MoreScreen } from './components/More/MoreScreen'
import { SessionFlow } from './components/Session/SessionFlow'

export default function App() {
  const [tab, setTab] = useState('today')
  // Sesión "minimizada": hay sesión activa pero el usuario volvió a la app.
  // No se persiste — al recargar, la sesión se retoma (per requisito).
  const [minimized, setMinimized] = useState(false)
  const workout = useWorkout()

  const startSession = (plan) => {
    setMinimized(false)
    workout.start(plan)
  }

  const minimize = () => {
    setTab('today')
    setMinimized(true)
  }

  // Hay sesión en curso y está en primer plano → ocupa toda la pantalla.
  if (workout.active && !minimized) {
    return <SessionFlow workout={workout} onMinimize={minimize} />
  }

  return (
    <div className="app">
      {tab === 'today' && (
        <TodayScreen
          onStartSession={startSession}
          onGoTo={setTab}
          activeSession={workout.active}
          onResume={() => setMinimized(false)}
          onDiscard={workout.discard}
        />
      )}
      {tab === 'history' && <HistoryScreen />}
      {tab === 'routine' && <RoutineScreen />}
      {tab === 'more' && <MoreScreen />}
      <TabBar active={tab} onChange={setTab} />
    </div>
  )
}
