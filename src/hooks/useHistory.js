// Acceso al historial de sesiones y derivados de uso frecuente.

import { useCallback } from 'react'
import { useAppData } from '../context/AppDataContext'

export function useHistory() {
  const { history } = useAppData()

  // Todas las sesiones de una fecha (date key 'yyyy-MM-dd').
  const sessionsOn = useCallback(
    (dateKey) => history.filter((s) => s.dateKey === dateKey),
    [history],
  )

  // Último registro (peso × reps) de un ejercicio — lo más usado en la sesión.
  // history viene ordenado del más reciente al más viejo.
  const lastSetForExercise = useCallback(
    (exId) => {
      for (const s of history) {
        const ex = s.exercises?.find((e) => e.exId === exId)
        if (ex && ex.sets?.length) {
          const last = ex.sets[ex.sets.length - 1]
          return { weight: last.weight, reps: last.reps, dateKey: s.dateKey }
        }
      }
      return null
    },
    [history],
  )

  // Peso máximo registrado de un ejercicio (todo el historial) — base del 60% en descarga.
  const maxWeightForExercise = useCallback(
    (exId) => {
      let max = 0
      for (const s of history) {
        const ex = s.exercises?.find((e) => e.exId === exId)
        if (!ex) continue
        for (const set of ex.sets || []) {
          const w = Number(set.weight) || 0
          if (w > max) max = w
        }
      }
      return max
    },
    [history],
  )

  // Serie de progresión de un ejercicio: la mejor serie (peso máximo) por sesión,
  // ordenada cronológicamente (vieja → nueva) para el gráfico.
  const exerciseSeries = useCallback(
    (exId) => {
      const out = []
      for (const s of history) {
        const ex = s.exercises?.find((e) => e.exId === exId)
        if (!ex || !ex.sets?.length) continue
        let top = ex.sets[0]
        for (const set of ex.sets) {
          if ((Number(set.weight) || 0) > (Number(top.weight) || 0)) top = set
        }
        out.push({
          dateKey: s.dateKey,
          date: s.date,
          weight: Number(top.weight) || 0,
          reps: top.reps,
        })
      }
      return out.reverse()
    },
    [history],
  )

  return {
    history,
    sessionsOn,
    lastSetForExercise,
    maxWeightForExercise,
    exerciseSeries,
  }
}
