// Lógica de la sesión activa. Persiste todo en localStorage para poder retomar
// exactamente donde se estaba si el usuario cierra la app.
//
// Flujo de ejercicios LIBRE: tras el calentamiento se muestra la lista de
// ejercicios del día; el usuario elige cuál hacer y en qué orden. El descanso
// va entre series del mismo ejercicio; al completar un ejercicio vuelve a la lista.

import { useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { STORAGE_KEYS } from '../lib/storage'
import { useAppData } from '../context/AppDataContext'
import { getEffectiveDay } from '../data/routine'
import { toDateKey } from '../lib/dates'

function newId() {
  try {
    return crypto.randomUUID()
  } catch {
    return 's_' + Date.now()
  }
}

export function useWorkout() {
  const { addSession, routineOverrides } = useAppData()
  const [active, setActive] = useLocalStorage(STORAGE_KEYS.activeSession, null)

  const day = active
    ? getEffectiveDay(active.programWeek, active.dayType, routineOverrides)
    : null

  const update = useCallback(
    (partial) => setActive((prev) => (prev ? { ...prev, ...partial } : prev)),
    [setActive],
  )

  // Inicia una sesión. plan: { dayType, isExtra, programWeek, phase, isDeload }
  const start = useCallback(
    (plan) => {
      const d = getEffectiveDay(plan.programWeek, plan.dayType, routineOverrides)
      setActive({
        id: newId(),
        startedAt: new Date().toISOString(),
        dayType: plan.dayType,
        isExtra: !!plan.isExtra,
        programWeek: plan.programWeek,
        phase: plan.phase,
        isDeload: !!plan.isDeload,
        step: 'warmup', // 'warmup' | 'list' | 'exercise' | 'rest' | 'post'
        warmupChecked: {},
        currentIndex: 0, // ejercicio abierto en 'exercise' / 'rest'
        results: d.exercises.map((e) => ({ exId: e.exId, name: e.name, sets: [] })),
        symptoms: [],
        rest: null,
      })
    },
    [setActive, routineOverrides],
  )

  const toggleWarmup = useCallback(
    (itemId) =>
      setActive((prev) =>
        prev
          ? {
              ...prev,
              warmupChecked: {
                ...prev.warmupChecked,
                [itemId]: !prev.warmupChecked[itemId],
              },
            }
          : prev,
      ),
    [setActive],
  )

  // Ir a la lista de ejercicios (libre elección).
  const goToList = useCallback(() => update({ step: 'list', rest: null }), [update])

  // Abrir un ejercicio puntual de la lista.
  const openExercise = useCallback(
    (i) => update({ step: 'exercise', currentIndex: i, rest: null }),
    [update],
  )

  // Registra el ejercicio COMPLETO de una: mismo peso × reps en N series.
  // Vuelve a la lista. (El descanso es opcional y vive en la UI, no acá.)
  const completeExercise = useCallback(
    (weight, reps, seriesCount) => {
      setActive((prev) => {
        if (!prev) return prev
        const i = prev.currentIndex
        const n = Math.max(1, seriesCount || 1)
        const sets = Array.from({ length: n }, () => ({ weight, reps }))
        const results = prev.results.map((r, idx) => (idx === i ? { ...r, sets } : r))
        return { ...prev, results, step: 'list', rest: null }
      })
    },
    [setActive],
  )

  const addSymptom = useCallback(
    (text) => {
      const time = new Date().toTimeString().slice(0, 5)
      setActive((prev) => {
        if (!prev) return prev
        const d = getEffectiveDay(prev.programWeek, prev.dayType, routineOverrides)
        const inEx = prev.step === 'exercise' || prev.step === 'rest'
        const exDef = inEx ? d.exercises[prev.currentIndex] : null
        return {
          ...prev,
          symptoms: [
            ...prev.symptoms,
            {
              exId: exDef ? exDef.exId : null,
              exerciseName: exDef ? exDef.name : 'General',
              text,
              time,
            },
          ],
        }
      })
    },
    [setActive, routineOverrides],
  )

  // Ir a la pantalla de cierre (desde la lista, cuando el usuario decide terminar).
  const goToPost = useCallback(() => update({ step: 'post', rest: null }), [update])

  // Cierra la sesión: la guarda en el historial y limpia el estado activo.
  const finish = useCallback(
    (generalNote) => {
      if (!active) return
      const now = new Date()
      const durationSec = Math.max(
        0,
        Math.round((now.getTime() - new Date(active.startedAt).getTime()) / 1000),
      )
      addSession({
        id: active.id,
        dateKey: toDateKey(now),
        date: now.toISOString(),
        dayType: active.dayType,
        programWeek: active.programWeek,
        phase: active.phase,
        isDeload: active.isDeload,
        isExtra: active.isExtra,
        durationSec,
        exercises: active.results.filter((r) => r.sets.length > 0),
        symptoms: active.symptoms,
        generalNote: generalNote || '',
      })
      setActive(null)
    },
    [active, addSession, setActive],
  )

  const discard = useCallback(() => setActive(null), [setActive])

  return {
    active,
    day,
    start,
    toggleWarmup,
    goToList,
    openExercise,
    completeExercise,
    addSymptom,
    goToPost,
    finish,
    discard,
  }
}
