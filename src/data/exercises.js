// Biblioteca de ejercicios del programa.
// Cada entrada está indexada por su id (el mismo id que usa la rutina en routine.js
// para vincular cada serie con su descripción técnica e historial de progresión).
//
// `execution` y `whyL5S1` provienen del brief original (verbatim).
// `muscles` y `commonError` se completan al construir el Tab "Más" → Biblioteca
// (el brief no los incluyó). Quedan como placeholders por ahora.

export const EXERCISES = {
  'dead-bug': {
    id: 'dead-bug',
    name: 'Dead bug',
    execution:
      'Tumbado boca arriba, brazos al techo, rodillas 90°. Bajás brazo opuesto + pierna opuesta sin despegar la zona lumbar del suelo. Ombligo adentro todo el tiempo.',
    whyL5S1:
      'Entrena el transverso abdominal sin flexión lumbar — protección directa del disco.',
    muscles: '',
    commonError: '',
  },
  'dead-bug-piernas': {
    id: 'dead-bug-piernas',
    name: 'Dead bug variante solo piernas',
    execution:
      'Igual que el dead bug pero con los brazos apoyados; solo bajás las piernas alternadas, manteniendo la lumbar pegada al suelo.',
    whyL5S1:
      'Progresión controlada del transverso abdominal sin flexión lumbar — protección directa del disco.',
    muscles: '',
    commonError: '',
  },
  'bird-dog': {
    id: 'bird-dog',
    name: 'Bird dog',
    execution:
      'En cuatro apoyos, extendés brazo derecho + pierna izquierda. La cadera no rota, columna quieta, pausa 2-3 seg arriba.',
    whyL5S1:
      'Estabilización lumbar en descarga — activa multífidos y transverso simultáneamente.',
    muscles: '',
    commonError: '',
  },
  'plancha-frontal': {
    id: 'plancha-frontal',
    name: 'Plancha frontal',
    execution:
      'En codos, cuerpo recto. Glúteos y abdomen apretados al mismo tiempo. No hundir ni elevar la cadera.',
    whyL5S1:
      'Anti-extensión pura — el core resiste sin que la columna se mueva.',
    muscles: '',
    commonError: '',
  },
  'plancha-lateral': {
    id: 'plancha-lateral',
    name: 'Plancha lateral',
    execution:
      'En codo lateral, cuerpo recto. Trabaja cuadrado lumbar y oblicuos.',
    whyL5S1:
      'Estabilización lateral de la columna, evita el colapso lateral que sobrecarga el disco.',
    muscles: '',
    commonError: '',
  },
  'plancha-lateral-elevacion': {
    id: 'plancha-lateral-elevacion',
    name: 'Plancha lateral con elevación de cadera',
    execution:
      'En codo lateral, bajás y subís la cadera de forma controlada sin perder la alineación del cuerpo.',
    whyL5S1:
      'Versión dinámica de la estabilización lateral — refuerza cuadrado lumbar y oblicuos protegiendo el disco.',
    muscles: '',
    commonError: '',
  },
  'pallof-press': {
    id: 'pallof-press',
    name: 'Pallof press',
    execution:
      'Polea a altura de pecho, de lado. Extendés brazos al frente resistiendo la rotación. Carga liviana.',
    whyL5S1:
      'Anti-rotación — la combinación flexión+rotación es la más lesiva para el disco; este ejercicio entrena exactamente la resistencia a eso.',
    muscles: '',
    commonError: '',
  },
  'hip-thrust': {
    id: 'hip-thrust',
    name: 'Hip thrust con barra',
    execution:
      'Espalda en banco, barra sobre caderas con almohadilla. Caderas al techo apretando glúteos. No arquear lumbar arriba.',
    whyL5S1:
      'Glúteo fuerte reduce dramáticamente la carga en L5-S1 en todos los movimientos del día a día. Es el ejercicio más importante del programa.',
    muscles: '',
    commonError: '',
  },
  'glute-bridge': {
    id: 'glute-bridge',
    name: 'Glute bridge',
    execution:
      'Igual que hip thrust pero en el piso. Pausa 3-5 seg arriba.',
    whyL5S1:
      'Activación de glúteo sin carga axial, ideal para aprender el patrón antes del hip thrust con barra.',
    muscles: '',
    commonError: '',
  },
  rdl: {
    id: 'rdl',
    name: 'RDL con mancuernas/barra',
    execution:
      'Rodillas levemente flexionadas, bajás siguiendo los muslos con espalda recta, cadera empuja atrás. Sin bajar más allá de la tibia.',
    whyL5S1:
      'Fortalece isquiotibiales y glúteo sin carga axial alta — alternativa segura al peso muerto convencional.',
    muscles: '',
    commonError: '',
  },
  'curl-femoral': {
    id: 'curl-femoral',
    name: 'Curl femoral máquina',
    execution:
      'Tumbado boca abajo, trabajo aislado de isquiotibiales. Bajada lenta (3 seg excéntrico).',
    whyL5S1: 'Fortalece isquiotibiales sin ninguna carga en columna.',
    muscles: '',
    commonError: '',
  },
  abduccion: {
    id: 'abduccion',
    name: 'Abducción en máquina',
    execution:
      'Sentado, abrís las piernas contra resistencia. Sin empujar con la espalda.',
    whyL5S1:
      'Glúteo medio débil genera inestabilidad pélvica que sobrecarga el disco lumbar.',
    muscles: '',
    commonError: '',
  },
  'leg-press': {
    id: 'leg-press',
    name: 'Leg press',
    execution:
      'Pies a la altura de los hombros. Espalda pegada al respaldo. No bajar tanto que la pelvis se vuelque.',
    whyL5S1:
      'Trabajo de cuádriceps y glúteo sin carga axial sobre la columna.',
    muscles: '',
    commonError: '',
  },
  'extension-cuadriceps': {
    id: 'extension-cuadriceps',
    name: 'Extensión de cuádriceps máquina',
    execution: 'Máquina de extensión, bajada lenta (3 seg excéntrico).',
    whyL5S1: 'Aislamiento de cuádriceps sin ninguna carga lumbar.',
    muscles: '',
    commonError: '',
  },
  'split-squat': {
    id: 'split-squat',
    name: 'Split squat con mancuernas',
    execution:
      'Un pie adelante, otro atrás, bajada vertical, tronco erguido y controlado.',
    whyL5S1:
      'Mucho menos carga lumbar que la sentadilla, trabaja cuádriceps y glúteo unilateralmente.',
    muscles: '',
    commonError: '',
  },
  'goblet-squat': {
    id: 'goblet-squat',
    name: 'Goblet squat',
    execution:
      'Mancuerna al pecho, profundidad moderada, columna neutra.',
    whyL5S1:
      'La carga frontal mantiene el tronco erguido reduciendo el momento de flexión lumbar — versión más segura de sentadilla para esta patología.',
    muscles: '',
    commonError: '',
  },
  'press-banca-barra': {
    id: 'press-banca-barra',
    name: 'Press de banca con barra',
    execution:
      'Tumbado, pies en el suelo, espalda levemente arqueada natural.',
    whyL5S1: 'Sin carga lumbar directa si se ejecuta acostado.',
    muscles: '',
    commonError: '',
  },
  'press-banca-mancuernas': {
    id: 'press-banca-mancuernas',
    name: 'Press de banca con mancuernas',
    execution:
      'Tumbado, pies en el suelo. Más rango que con barra, controlado.',
    whyL5S1: 'Sin carga lumbar directa si se ejecuta acostado.',
    muscles: '',
    commonError: '',
  },
  'press-inclinado-mancuernas': {
    id: 'press-inclinado-mancuernas',
    name: 'Press inclinado con mancuernas',
    execution: '45°, codos a 45° del cuerpo.',
    whyL5S1: 'Igual que banca, sin carga lumbar.',
    muscles: '',
    commonError: '',
  },
  'press-militar-mancuernas': {
    id: 'press-militar-mancuernas',
    name: 'Press militar con mancuernas sentado',
    execution: 'Sentado con respaldo, mancuernas.',
    whyL5S1:
      'Sentado elimina la carga axial que tendría el press de pie.',
    muscles: '',
    commonError: '',
  },
  fondos: {
    id: 'fondos',
    name: 'Fondos en paralelas',
    execution:
      'Sin bajar demasiado, tronco levemente inclinado.',
    whyL5S1: 'Sin carga lumbar directa.',
    muscles: '',
    commonError: '',
  },
  'jalon-pecho': {
    id: 'jalon-pecho',
    name: 'Jalón al pecho',
    execution:
      'Codos hacia las caderas, no balancear el tronco.',
    whyL5S1:
      'Trabajo de dorsal sentado, sin carga lumbar si el tronco no se balancea.',
    muscles: '',
    commonError: '',
  },
  'jalon-pecho-neutro': {
    id: 'jalon-pecho-neutro',
    name: 'Jalón al pecho agarre neutro',
    execution:
      'Palmas enfrentadas, codos al cuerpo, sin balancear el tronco.',
    whyL5S1:
      'Trabajo de dorsal sentado, sin carga lumbar si el tronco no se balancea.',
    muscles: '',
    commonError: '',
  },
  'remo-polea-sentado': {
    id: 'remo-polea-sentado',
    name: 'Remo en polea sentado',
    execution: 'Tronco quieto, retracción escapular.',
    whyL5S1:
      'La posición sentada y el respaldo eliminan la carga lumbar.',
    muscles: '',
    commonError: '',
  },
  'remo-mancuerna-banco': {
    id: 'remo-mancuerna-banco',
    name: 'Remo con mancuerna apoyo en banco',
    execution:
      'Apoyo en banco, codo pegado al cuerpo, tirar desde el codo.',
    whyL5S1: 'El apoyo en el banco descarga completamente la columna.',
    muscles: '',
    commonError: '',
  },
  'elevaciones-laterales': {
    id: 'elevaciones-laterales',
    name: 'Elevaciones laterales con mancuernas',
    execution: 'Peso liviano, sin impulso del tronco.',
    whyL5S1: 'Sin carga lumbar.',
    muscles: '',
    commonError: '',
  },
  'face-pull': {
    id: 'face-pull',
    name: 'Face pull en polea',
    execution: 'Polea alta, tirar hacia la cara.',
    whyL5S1:
      'Salud del manguito rotador — hombros fuertes y estables reducen compensaciones posturales que afectan la columna.',
    muscles: '',
    commonError: '',
  },
  'curl-biceps': {
    id: 'curl-biceps',
    name: 'Curl de bíceps con mancuernas',
    execution: 'Sin balancear el tronco.',
    whyL5S1: 'Sin carga lumbar.',
    muscles: '',
    commonError: '',
  },
  'triceps-polea': {
    id: 'triceps-polea',
    name: 'Tríceps en polea cuerda',
    execution: 'Codos fijos al costado del cuerpo.',
    whyL5S1: 'Sin carga lumbar.',
    muscles: '',
    commonError: '',
  },
}

export function getExercise(id) {
  return EXERCISES[id] || null
}
