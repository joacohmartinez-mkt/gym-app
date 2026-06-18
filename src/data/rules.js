// Reglas de entrenamiento y señales de alarma para discopatía L5-S1.
// Texto de referencia (Tab "Más → Reglas y alertas"). Verbatim del brief.

export const RULES_DO = [
  'Columna neutra en todos los ejercicios. Si la perdés, el peso está demasiado alto.',
  'Core siempre primero en cada sesión.',
  'Calentamiento obligatorio, nunca saltear.',
  'Bajada lenta (2-3 seg) en todos los ejercicios.',
  'Descanso 2-3 min en ejercicios principales, 60-90 seg en accesorios.',
  'Semana de descarga cada 4 semanas.',
  'Dormir 8 horas — el músculo crece en la recuperación.',
  'No entrenar gym el mismo día que boxeo si es posible.',
]

// Señales que obligan a frenar ESE ejercicio ESE día.
export const ALERTS_STOP_EXERCISE = [
  'Dolor irradiado hacia glúteo o pierna durante o después del ejercicio.',
  'Hormigueo o entumecimiento en pierna o pie.',
  'Dolor lumbar que no es muscular (agudo, eléctrico, profundo).',
]

// Señales que requieren ir al médico.
export const ALERTS_SEE_DOCTOR = [
  'Dolor irradiado nuevo o que empeoró respecto a antes de empezar el programa.',
  'Pérdida de fuerza en pierna o pie.',
  'Hormigueo persistente que no cede con el descanso.',
  'Incontinencia urinaria o intestinal (urgente, emergencia).',
]
