// Calcula el estado del programa para "hoy": semana actual, fase, deload,
// y qué día (A/B/C) toca según las sesiones ya completadas en la semana.

import { useMemo } from 'react'
import { parseDateKey, toDateKey, weeksSince } from '../lib/dates'
import {
  PROGRAM_LENGTH_WEEKS,
  isDeloadWeek,
  getPhaseForWeek,
  getEffectiveDay,
} from '../data/routine'
import { useAppData } from '../context/AppDataContext'

const DAY_ORDER = ['A', 'B', 'C']

export function useProgram() {
  const { config, history, routineOverrides } = useAppData()

  return useMemo(() => {
    const now = new Date()
    const start = parseDateKey(config.startDate)
    const todayKey = toDateKey(now)

    // Semana del programa (start es siempre un lunes; semanas de lunes a lunes).
    const rawWeek = weeksSince(start, now) + 1
    const startsInFuture = rawWeek < 1
    const currentWeek = Math.min(PROGRAM_LENGTH_WEEKS, Math.max(1, rawWeek))
    const programFinished = rawWeek > PROGRAM_LENGTH_WEEKS

    const phase = getPhaseForWeek(currentWeek)
    const deload = isDeloadWeek(currentWeek)

    // Rotación por sesiones: cuántas sesiones regulares ya se hicieron esta semana.
    const regularThisWeek = history.filter(
      (s) => s.programWeek === currentWeek && !s.isExtra,
    )
    const doneCount = regularThisWeek.length
    const weekComplete = doneCount >= DAY_ORDER.length
    const dayType = weekComplete ? 'A' : DAY_ORDER[doneCount]
    const day = getEffectiveDay(currentWeek, dayType, routineOverrides)

    const trainedToday = history.find((s) => s.dateKey === todayKey) || null

    return {
      now,
      todayKey,
      startsInFuture,
      programFinished,
      currentWeek,
      phase,
      deload,
      doneCount,
      weekComplete,
      dayType,
      day,
      trainedToday,
    }
  }, [config.startDate, history, routineOverrides])
}
