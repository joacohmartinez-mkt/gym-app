// Tab HISTORIAL. Tres niveles: lista de sesiones → detalle de sesión →
// progresión del ejercicio.
import { useState, useRef, useEffect } from 'react'
import { useAppData } from '../../context/AppDataContext'
import { SessionList } from './SessionList'
import { SessionDetail } from './SessionDetail'
import { ExerciseHistory } from './ExerciseHistory'

export function HistoryScreen() {
  const { history } = useAppData()
  const [view, setView] = useState('list') // 'list' | 'session' | 'exercise'
  const [sessionId, setSessionId] = useState(null)
  const [exId, setExId] = useState(null)
  const listScroll = useRef(0)

  // Conserva la posición de scroll de la lista al entrar y volver del detalle.
  useEffect(() => {
    if (view === 'list') window.scrollTo(0, listScroll.current)
    else window.scrollTo(0, 0)
  }, [view])

  const openSession = (s) => {
    listScroll.current = window.scrollY
    setSessionId(s.id)
    setView('session')
  }

  const session = history.find((s) => s.id === sessionId) || null

  if (view === 'exercise' && exId) {
    return <ExerciseHistory exId={exId} onBack={() => setView('session')} />
  }

  if (view === 'session' && session) {
    return (
      <SessionDetail
        session={session}
        onBack={() => setView('list')}
        onOpenExercise={(id) => {
          setExId(id)
          setView('exercise')
        }}
      />
    )
  }

  // 'list' (o sesión inexistente, p. ej. tras limpiar datos)
  return <SessionList history={history} onOpen={openSession} />
}
