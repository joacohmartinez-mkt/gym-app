// Rutina completa hardcodeada: 3 fases (4 semanas c/u), 3 días por semana.
//
// Fase 1 está transcrita verbatim del brief.
// Fases 2 y 3 se construyen aplicando las diferencias indicadas sobre la base
// de Fase 1. Donde el brief daba un rango de series (ej. "4-5 series") se eligió
// un valor concreto, conservador, y editable más adelante desde el Tab "Más → Rutina".
// Los puntos resueltos por criterio están marcados con [criterio] en los comentarios.
//
// Cada ejercicio referencia su id de la biblioteca (exId). El historial de progresión
// se indexa por exId, de modo que el mismo movimiento comparte registro entre días/fases.

import { EXERCISES } from './exercises'

export const PROGRAM_LENGTH_WEEKS = 12
export const WEEKS_PER_PHASE = 4
export const DELOAD_WEEKS = [4, 8, 12]
export const DELOAD_FACTOR = 0.6 // 60% del máximo registrado en semana de descarga

// Helper para construir una entrada de ejercicio sin repetir el nombre de la biblioteca.
function ex(exId, sets, reps, { group, note = '', isMain = false, optional = false, name } = {}) {
  return {
    exId,
    name: name || EXERCISES[exId].name,
    sets,
    reps,
    group,
    note,
    isMain,
    optional,
  }
}

// Calentamientos (distintos por día). Items con id estable para los checkboxes.
const WARMUPS = {
  A: [
    { id: 'cat-cow', label: 'Cat-cow × 10' },
    { id: 'glute-bridge', label: 'Glute bridge × 15' },
    { id: 'bird-dog', label: 'Bird dog × 8 por lado' },
    { id: 'psoas', label: 'Psoas 30 seg por lado' },
  ],
  B: [
    { id: 'cat-cow', label: 'Cat-cow × 10' },
    { id: '90-90', label: '90/90 cadera 30 seg por lado' },
    { id: 'bird-dog', label: 'Bird dog × 8 por lado' },
    { id: 'psoas', label: 'Psoas 30 seg por lado' },
  ],
  C: [
    { id: 'cat-cow', label: 'Cat-cow × 10' },
    { id: 'glute-bridge', label: 'Glute bridge × 15' },
    { id: '90-90', label: '90/90 cadera 30 seg por lado' },
    { id: 'psoas', label: 'Psoas 30 seg por lado' },
  ],
}

// ─────────────────────────────────────────────────────────────────────────
// FASE 1 (Semanas 1-4) — verbatim del brief
// ─────────────────────────────────────────────────────────────────────────
const PHASE_1 = {
  id: 1,
  name: 'Fase 1',
  weeks: [1, 2, 3, 4],
  days: {
    A: {
      id: 'A',
      name: 'Día A',
      warmup: WARMUPS.A,
      exercises: [
        ex('dead-bug', 3, '8 por lado', { group: 'Core', note: 'Lumbar pegada al suelo todo el tiempo' }),
        ex('plancha-frontal', 3, '25 seg', { group: 'Core', note: 'Glúteos apretados, no hundir la cadera' }),
        ex('hip-thrust', 4, '12', { group: 'Tren inferior', isMain: true, note: 'Peso moderado, sentir el glúteo arriba, no arquear lumbar' }),
        ex('leg-press', 3, '12', { group: 'Tren inferior', isMain: true, note: 'Espalda pegada al respaldo, profundidad sin voltear pelvis' }),
        ex('curl-femoral', 3, '12', { group: 'Tren inferior', note: 'Bajada lenta 3 seg excéntrico' }),
        ex('press-banca-barra', 3, '10', { group: 'Empuje', isMain: true, note: 'Pies en el suelo, espalda levemente arqueada natural' }),
        ex('press-militar-mancuernas', 3, '12', { group: 'Empuje', isMain: true, note: 'Sentado para no cargar la columna' }),
        ex('jalon-pecho', 3, '12', { group: 'Tirón', isMain: true, note: 'Codos hacia las caderas, no balancear el tronco' }),
        ex('remo-polea-sentado', 3, '12', { group: 'Tirón', isMain: true, note: 'Tronco quieto, retracción de escápulas' }),
      ],
    },
    B: {
      id: 'B',
      name: 'Día B',
      warmup: WARMUPS.B,
      exercises: [
        ex('bird-dog', 3, '10 por lado', { group: 'Core', note: 'Pausa 2 seg arriba, cadera no rota' }),
        ex('plancha-lateral', 3, '20 seg por lado', { group: 'Core', note: 'Cuadrado lumbar y oblicuos' }),
        ex('rdl', 4, '10', { group: 'Tren inferior', isMain: true, name: 'RDL con mancuernas', note: 'Espalda recta, cadera empuja atrás, sin bajar más allá de la tibia' }),
        ex('split-squat', 3, '10 por lado', { group: 'Tren inferior', isMain: true, note: 'Tronco vertical, bajada controlada' }),
        ex('abduccion', 3, '15', { group: 'Tren inferior', note: 'Sin empujar con la espalda' }),
        ex('press-inclinado-mancuernas', 3, '12', { group: 'Empuje', isMain: true, note: '45°, codos a 45° del cuerpo' }),
        ex('fondos', 3, '8-10', { group: 'Empuje', isMain: true, note: 'Sin bajar demasiado, tronco levemente inclinado' }),
        ex('remo-mancuerna-banco', 3, '12 por lado', { group: 'Tirón + brazos', isMain: true, note: 'Codo pegado al cuerpo, tirar desde el codo' }),
        ex('curl-biceps', 3, '12', { group: 'Tirón + brazos', note: 'Sin balancear el tronco' }),
        ex('triceps-polea', 3, '12', { group: 'Tirón + brazos', note: 'Codos fijos al costado del cuerpo' }),
      ],
    },
    C: {
      id: 'C',
      name: 'Día C',
      warmup: WARMUPS.C,
      exercises: [
        ex('pallof-press', 3, '10 por lado', { group: 'Core', note: 'Carga liviana, resistís la rotación' }),
        ex('dead-bug-piernas', 3, '10 por lado', { group: 'Core', note: 'Brazos apoyados, solo bajás piernas alternadas' }),
        ex('hip-thrust', 4, '10', { group: 'Tren inferior', isMain: true, note: 'Podés subir el peso respecto al Día A si te sentís bien' }),
        ex('extension-cuadriceps', 3, '15', { group: 'Tren inferior', note: 'Excéntrico lento 3 seg' }),
        ex('curl-femoral', 3, '12', { group: 'Tren inferior', note: 'Control total en la bajada' }),
        ex('abduccion', 2, '20', { group: 'Tren inferior', note: 'Finalizador, más reps' }),
        ex('press-banca-mancuernas', 3, '12', { group: 'Tren superior', isMain: true, note: 'Más rango que con barra, controlado' }),
        ex('jalon-pecho-neutro', 3, '12', { group: 'Tren superior', isMain: true, note: 'Palmas enfrentadas, codos al cuerpo' }),
        ex('elevaciones-laterales', 3, '15', { group: 'Tren superior', note: 'Peso liviano, sin impulso del tronco' }),
        ex('face-pull', 3, '15', { group: 'Tren superior', note: 'Salud del hombro y trapecio medio' }),
      ],
    },
  },
}

// ─────────────────────────────────────────────────────────────────────────
// FASE 2 (Semanas 5-8) — Fase 1 + diferencias del brief
//  · Hip thrust → 8-10 reps, RPE 7-8   [criterio: 4 series de las "4-5"]
//  · Press banca → 4×8   · RDL → barra 4×8   · Jalón y remo → 4×10
//  · Accesorios → +1 serie respecto a Fase 1
//  · Plancha frontal → 35-40 seg   · Plancha lateral → variante con elevación de cadera
//  · Goblet squat opcional 3×10   [criterio: agregado en Día B, si no hubo síntomas]
// ─────────────────────────────────────────────────────────────────────────
const PHASE_2 = {
  id: 2,
  name: 'Fase 2',
  weeks: [5, 6, 7, 8],
  days: {
    A: {
      id: 'A',
      name: 'Día A',
      warmup: WARMUPS.A,
      exercises: [
        ex('dead-bug', 4, '8 por lado', { group: 'Core', note: 'Lumbar pegada al suelo todo el tiempo' }),
        ex('plancha-frontal', 4, '35-40 seg', { group: 'Core', note: 'Glúteos apretados, no hundir la cadera' }),
        ex('hip-thrust', 4, '8-10', { group: 'Tren inferior', isMain: true, note: 'RPE 7-8. Sentir el glúteo arriba, no arquear lumbar' }),
        ex('leg-press', 3, '12', { group: 'Tren inferior', isMain: true, note: 'Espalda pegada al respaldo, profundidad sin voltear pelvis' }),
        ex('curl-femoral', 4, '12', { group: 'Tren inferior', note: 'Bajada lenta 3 seg excéntrico' }),
        ex('press-banca-barra', 4, '8', { group: 'Empuje', isMain: true, note: 'Pies en el suelo, espalda levemente arqueada natural' }),
        ex('press-militar-mancuernas', 3, '12', { group: 'Empuje', isMain: true, note: 'Sentado para no cargar la columna' }),
        ex('jalon-pecho', 4, '10', { group: 'Tirón', isMain: true, note: 'Codos hacia las caderas, no balancear el tronco' }),
        ex('remo-polea-sentado', 4, '10', { group: 'Tirón', isMain: true, note: 'Tronco quieto, retracción de escápulas' }),
      ],
    },
    B: {
      id: 'B',
      name: 'Día B',
      warmup: WARMUPS.B,
      exercises: [
        ex('bird-dog', 4, '10 por lado', { group: 'Core', note: 'Pausa 2 seg arriba, cadera no rota' }),
        ex('plancha-lateral-elevacion', 4, '10 por lado', { group: 'Core', note: 'Bajás y subís la cadera de forma controlada' }),
        ex('rdl', 4, '8', { group: 'Tren inferior', isMain: true, name: 'RDL con barra', note: 'Espalda recta, cadera empuja atrás, sin bajar más allá de la tibia' }),
        ex('split-squat', 3, '10 por lado', { group: 'Tren inferior', isMain: true, note: 'Tronco vertical, bajada controlada' }),
        ex('goblet-squat', 3, '10', { group: 'Tren inferior', isMain: true, optional: true, note: 'Opcional si no hubo síntomas. Columna neutra, carga frontal' }),
        ex('abduccion', 4, '15', { group: 'Tren inferior', note: 'Sin empujar con la espalda' }),
        ex('press-inclinado-mancuernas', 3, '12', { group: 'Empuje', isMain: true, note: '45°, codos a 45° del cuerpo' }),
        ex('fondos', 3, '8-10', { group: 'Empuje', isMain: true, note: 'Sin bajar demasiado, tronco levemente inclinado' }),
        ex('remo-mancuerna-banco', 4, '10 por lado', { group: 'Tirón + brazos', isMain: true, note: 'Codo pegado al cuerpo, tirar desde el codo' }),
        ex('curl-biceps', 4, '12', { group: 'Tirón + brazos', note: 'Sin balancear el tronco' }),
        ex('triceps-polea', 4, '12', { group: 'Tirón + brazos', note: 'Codos fijos al costado del cuerpo' }),
      ],
    },
    C: {
      id: 'C',
      name: 'Día C',
      warmup: WARMUPS.C,
      exercises: [
        ex('pallof-press', 4, '10 por lado', { group: 'Core', note: 'Carga liviana, resistís la rotación' }),
        ex('dead-bug-piernas', 4, '10 por lado', { group: 'Core', note: 'Brazos apoyados, solo bajás piernas alternadas' }),
        ex('hip-thrust', 4, '8-10', { group: 'Tren inferior', isMain: true, note: 'RPE 7-8. Podés subir el peso si te sentís bien' }),
        ex('extension-cuadriceps', 4, '15', { group: 'Tren inferior', note: 'Excéntrico lento 3 seg' }),
        ex('curl-femoral', 4, '12', { group: 'Tren inferior', note: 'Control total en la bajada' }),
        ex('abduccion', 3, '20', { group: 'Tren inferior', note: 'Finalizador, más reps' }),
        ex('press-banca-mancuernas', 3, '12', { group: 'Tren superior', isMain: true, note: 'Más rango que con barra, controlado' }),
        ex('jalon-pecho-neutro', 4, '10', { group: 'Tren superior', isMain: true, note: 'Palmas enfrentadas, codos al cuerpo' }),
        ex('elevaciones-laterales', 4, '15', { group: 'Tren superior', note: 'Peso liviano, sin impulso del tronco' }),
        ex('face-pull', 4, '15', { group: 'Tren superior', note: 'Salud del hombro y trapecio medio' }),
      ],
    },
  },
}

// ─────────────────────────────────────────────────────────────────────────
// FASE 3 (Semanas 9-12) — fuerza, RPE objetivo 8-9 en principales
//  · Hip thrust 5×6-8 (peso máximo)  · Press banca 4×6  · RDL barra 4×6
//  · Jalón y remo 4×8  · Leg press 4×8  · Goblet/Split squat 4×8
//  · Core 4 series, variantes más exigentes
//  [criterio: accesorios se mantienen en 4 series (nivel Fase 2); empujes
//   secundarios sin cambio de volumen al no especificarse]
// ─────────────────────────────────────────────────────────────────────────
const PHASE_3 = {
  id: 3,
  name: 'Fase 3',
  weeks: [9, 10, 11, 12],
  days: {
    A: {
      id: 'A',
      name: 'Día A',
      warmup: WARMUPS.A,
      exercises: [
        ex('dead-bug', 4, '10 por lado', { group: 'Core', note: 'Lumbar pegada al suelo, tempo más lento' }),
        ex('plancha-frontal', 4, '40-45 seg', { group: 'Core', note: 'Glúteos apretados, no hundir la cadera' }),
        ex('hip-thrust', 5, '6-8', { group: 'Tren inferior', isMain: true, note: 'Peso máximo · RPE 8-9. No arquear lumbar arriba' }),
        ex('leg-press', 4, '8', { group: 'Tren inferior', isMain: true, note: 'Espalda pegada al respaldo, profundidad sin voltear pelvis' }),
        ex('curl-femoral', 4, '12', { group: 'Tren inferior', note: 'Bajada lenta 3 seg excéntrico' }),
        ex('press-banca-barra', 4, '6', { group: 'Empuje', isMain: true, note: 'RPE 8-9. Pies en el suelo, arqueo natural' }),
        ex('press-militar-mancuernas', 3, '12', { group: 'Empuje', isMain: true, note: 'Sentado para no cargar la columna' }),
        ex('jalon-pecho', 4, '8', { group: 'Tirón', isMain: true, note: 'Codos hacia las caderas, no balancear el tronco' }),
        ex('remo-polea-sentado', 4, '8', { group: 'Tirón', isMain: true, note: 'Tronco quieto, retracción de escápulas' }),
      ],
    },
    B: {
      id: 'B',
      name: 'Día B',
      warmup: WARMUPS.B,
      exercises: [
        ex('bird-dog', 4, '10 por lado', { group: 'Core', note: 'Pausa 3 seg arriba, cadera no rota' }),
        ex('plancha-lateral-elevacion', 4, '12 por lado', { group: 'Core', note: 'Bajás y subís la cadera de forma controlada' }),
        ex('rdl', 4, '6', { group: 'Tren inferior', isMain: true, name: 'RDL con barra', note: 'RPE 8-9. Espalda recta, cadera empuja atrás' }),
        ex('split-squat', 4, '8 por lado', { group: 'Tren inferior', isMain: true, note: 'Tronco vertical, bajada controlada' }),
        ex('goblet-squat', 4, '8', { group: 'Tren inferior', isMain: true, optional: true, note: 'Opcional. Columna neutra, carga frontal' }),
        ex('abduccion', 4, '15', { group: 'Tren inferior', note: 'Sin empujar con la espalda' }),
        ex('press-inclinado-mancuernas', 3, '12', { group: 'Empuje', isMain: true, note: '45°, codos a 45° del cuerpo' }),
        ex('fondos', 3, '8-10', { group: 'Empuje', isMain: true, note: 'Sin bajar demasiado, tronco levemente inclinado' }),
        ex('remo-mancuerna-banco', 4, '8 por lado', { group: 'Tirón + brazos', isMain: true, note: 'Codo pegado al cuerpo, tirar desde el codo' }),
        ex('curl-biceps', 4, '12', { group: 'Tirón + brazos', note: 'Sin balancear el tronco' }),
        ex('triceps-polea', 4, '12', { group: 'Tirón + brazos', note: 'Codos fijos al costado del cuerpo' }),
      ],
    },
    C: {
      id: 'C',
      name: 'Día C',
      warmup: WARMUPS.C,
      exercises: [
        ex('pallof-press', 4, '12 por lado', { group: 'Core', note: 'Carga liviana, resistís la rotación' }),
        ex('dead-bug-piernas', 4, '12 por lado', { group: 'Core', note: 'Brazos apoyados, solo bajás piernas alternadas' }),
        ex('hip-thrust', 5, '6-8', { group: 'Tren inferior', isMain: true, note: 'Peso máximo · RPE 8-9. No arquear lumbar arriba' }),
        ex('extension-cuadriceps', 4, '15', { group: 'Tren inferior', note: 'Excéntrico lento 3 seg' }),
        ex('curl-femoral', 4, '12', { group: 'Tren inferior', note: 'Control total en la bajada' }),
        ex('abduccion', 3, '20', { group: 'Tren inferior', note: 'Finalizador, más reps' }),
        ex('press-banca-mancuernas', 4, '6', { group: 'Tren superior', isMain: true, note: 'RPE 8-9. Más rango que con barra, controlado' }),
        ex('jalon-pecho-neutro', 4, '8', { group: 'Tren superior', isMain: true, note: 'Palmas enfrentadas, codos al cuerpo' }),
        ex('elevaciones-laterales', 4, '15', { group: 'Tren superior', note: 'Peso liviano, sin impulso del tronco' }),
        ex('face-pull', 4, '15', { group: 'Tren superior', note: 'Salud del hombro y trapecio medio' }),
      ],
    },
  },
}

export const PHASES = [PHASE_1, PHASE_2, PHASE_3]

// Devuelve el objeto fase (1, 2 o 3) según el número de semana del programa.
export function getPhaseForWeek(week) {
  const index = Math.min(PHASES.length - 1, Math.floor((week - 1) / WEEKS_PER_PHASE))
  return PHASES[Math.max(0, index)]
}

// Devuelve los datos de un día (A/B/C) para una semana dada del programa.
export function getDayForWeek(week, dayId) {
  return getPhaseForWeek(week).days[dayId] || null
}

export function isDeloadWeek(week) {
  return DELOAD_WEEKS.includes(week)
}

// ─────────────────────────────────────────────────────────────────────────
// Ediciones del usuario (overrides). Clave por fase+día+índice de ejercicio.
// Permiten cambiar series/reps/notas y reemplazar ejercicios sin tocar la base.
// ─────────────────────────────────────────────────────────────────────────
export function overrideKey(phaseId, dayId, index) {
  return `${phaseId}-${dayId}-${index}`
}

export function applyOverridesToDay(phaseId, dayId, day, overrides) {
  if (!day || !overrides) return day
  return {
    ...day,
    exercises: day.exercises.map((ex, i) => {
      const o = overrides[overrideKey(phaseId, dayId, i)]
      return o ? { ...ex, ...o } : ex
    }),
  }
}

// Día con las ediciones del usuario aplicadas. Si no hay overrides, idéntico a getDayForWeek.
export function getEffectiveDay(week, dayId, overrides) {
  const phase = getPhaseForWeek(week)
  const day = phase.days[dayId]
  if (!day) return null
  return applyOverridesToDay(phase.id, dayId, day, overrides)
}
