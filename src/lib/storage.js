// Claves de localStorage y forma de los datos persistidos.
// Toda la persistencia de la app pasa por acá (sin backend).

export const STORAGE_KEYS = {
  config: 'gym.config.v1',
  history: 'gym.history.v1',
  activeSession: 'gym.activeSession.v1',
  // Ediciones del usuario sobre la rutina base, por fase+día+índice:
  // { '1-A-2': { sets?, reps?, note?, exId?, name? }, ... }
  routineOverrides: 'gym.routineOverrides.v1',
  // Sincronización en la nube:
  syncCode: 'gym.syncCode.v1', // código que liga este dispositivo con la fila en la nube
  syncTs: 'gym.syncTs.v1', // ms del último cambio local sincronizado (last-write-wins)
}

// Forma de una sesión guardada en el historial (la escribe el flujo de sesión):
// {
//   id: string,
//   dateKey: 'yyyy-MM-dd',   // día local, para agrupar/comparar por fecha
//   date: ISOString,         // momento exacto de cierre
//   dayType: 'A' | 'B' | 'C',
//   programWeek: number,     // semana del programa al momento de entrenar (1-12)
//   phase: number,           // 1-3
//   isDeload: boolean,
//   isExtra: boolean,        // sesión extra fuera de la rotación de la semana
//   durationSec: number,
//   exercises: [{ exId, name, sets: [{ weight, reps }] }],
//   symptoms: [{ exId, exerciseName, text, time }],
//   generalNote: string,
// }
