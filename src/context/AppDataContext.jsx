// Estado global persistido: configuración del usuario + historial de sesiones.
// Todo se guarda en localStorage. Se expone vía contexto para que los hooks
// (useProgram, useHistory) y las pantallas lo consuman.

import { createContext, useContext, useCallback } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { STORAGE_KEYS } from '../lib/storage'
import { mondayOf, toDateKey } from '../lib/dates'

const AppDataContext = createContext(null)

// Config por defecto en el primer uso:
// la fecha de inicio se fija al LUNES de la semana actual (decisión del usuario).
function defaultConfig() {
  return {
    startDate: toDateKey(mondayOf(new Date())),
    userName: '',
    restMain: 90, // seg, descanso default ejercicios principales
    restAccessory: 60, // seg, descanso default accesorios
  }
}

export function AppDataProvider({ children }) {
  const [config, setConfig, patchConfig] = useLocalStorage(
    STORAGE_KEYS.config,
    defaultConfig,
  )
  const [history, setHistory] = useLocalStorage(STORAGE_KEYS.history, [])
  const [routineOverrides, setRoutineOverrides] = useLocalStorage(
    STORAGE_KEYS.routineOverrides,
    {},
  )

  // Agrega una sesión completada al historial (la usará el flujo de sesión).
  const addSession = useCallback(
    (session) => {
      setHistory((prev) => [session, ...prev])
    },
    [setHistory],
  )

  // Edición de la rutina: mergea cambios en un ejercicio (por fase+día+índice).
  const setOverride = useCallback(
    (phaseId, dayId, index, patch) => {
      const key = `${phaseId}-${dayId}-${index}`
      setRoutineOverrides((prev) => ({ ...prev, [key]: { ...prev[key], ...patch } }))
    },
    [setRoutineOverrides],
  )

  // Restaura un ejercicio a su valor original (borra su override).
  const resetOverride = useCallback(
    (phaseId, dayId, index) => {
      const key = `${phaseId}-${dayId}-${index}`
      setRoutineOverrides((prev) => {
        const next = { ...prev }
        delete next[key]
        return next
      })
    },
    [setRoutineOverrides],
  )

  const value = {
    config,
    setConfig,
    patchConfig,
    history,
    setHistory,
    addSession,
    routineOverrides,
    setOverride,
    resetOverride,
  }

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
}

export function useAppData() {
  const ctx = useContext(AppDataContext)
  if (!ctx) {
    throw new Error('useAppData debe usarse dentro de <AppDataProvider>')
  }
  return ctx
}
