// Metadatos extra para la Biblioteca: imágenes de referencia A (inicio) y B (fin),
// músculos trabajados y error más común. Se mergea con EXERCISES.
//
// Imágenes: free-exercise-db (yuhonas/free-exercise-db, dominio público). Cada
// ejercicio tiene 0.jpg (inicio) y 1.jpg (fin). URLs verificadas (HTTP 200).
// Faltan bird-dog y plancha-lateral-elevacion (no están en el dataset) → el usuario
// las enviará; quedan con imageA/imageB: null.
// Músculos: primaryMuscles/secondaryMuscles del dataset, traducidos.

const IMG = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/'
const pair = (folder) => ({
  imageA: `${IMG}${folder}/0.jpg`,
  imageB: `${IMG}${folder}/1.jpg`,
})

export const EXERCISE_MEDIA = {
  'dead-bug': {
    ...pair('Dead_Bug'),
    primary: 'Abdominales (transverso)',
    secondary: '',
    commonError: 'Despegar la zona lumbar del suelo o aguantar la respiración.',
  },
  'dead-bug-piernas': {
    ...pair('Dead_Bug'),
    primary: 'Abdominales (transverso)',
    secondary: '',
    commonError: 'Despegar la lumbar al bajar las piernas.',
  },
  'bird-dog': {
    imageA: null,
    imageB: null,
    primary: 'Core y lumbares (multífidos, transverso)',
    secondary: 'Glúteos',
    commonError: 'Rotar la cadera o arquear la lumbar al extender.',
  },
  'plancha-frontal': {
    ...pair('Plank'),
    primary: 'Abdominales',
    secondary: '',
    commonError: 'Hundir o elevar la cadera; perder la línea recta del cuerpo.',
  },
  'plancha-lateral': {
    ...pair('Side_Bridge'),
    primary: 'Abdominales (oblicuos, cuadrado lumbar)',
    secondary: 'Hombros',
    commonError: 'Dejar caer la cadera; perder la alineación.',
  },
  'plancha-lateral-elevacion': {
    imageA: null,
    imageB: null,
    primary: 'Abdominales (oblicuos, cuadrado lumbar)',
    secondary: 'Glúteo medio',
    commonError: 'Rotar el tronco al subir y bajar la cadera.',
  },
  'pallof-press': {
    ...pair('Pallof_Press'),
    primary: 'Abdominales (anti-rotación)',
    secondary: 'Hombros, pectoral',
    commonError: 'Dejar que el tronco rote hacia la polea; usar demasiada carga.',
  },
  'hip-thrust': {
    ...pair('Barbell_Hip_Thrust'),
    primary: 'Glúteos',
    secondary: 'Isquiotibiales, gemelos',
    commonError: 'Hiperextender (arquear) la lumbar arriba en vez de cerrar con el glúteo.',
  },
  'glute-bridge': {
    ...pair('Butt_Lift_Bridge'),
    primary: 'Glúteos',
    secondary: 'Isquiotibiales',
    commonError: 'Empujar con la lumbar en lugar del glúteo.',
  },
  rdl: {
    ...pair('Romanian_Deadlift'),
    primary: 'Isquiotibiales',
    secondary: 'Glúteos, zona lumbar',
    commonError: 'Redondear la espalda o bajar más allá del rango con la espalda recta.',
  },
  'curl-femoral': {
    ...pair('Lying_Leg_Curls'),
    primary: 'Isquiotibiales',
    secondary: '',
    commonError: 'Despegar la cadera del apoyo; bajar de golpe sin control excéntrico.',
  },
  abduccion: {
    ...pair('Thigh_Abductor'),
    primary: 'Abductores (glúteo medio)',
    secondary: 'Glúteos',
    commonError: 'Empujar con el tronco/espalda en vez de aislar el glúteo medio.',
  },
  'leg-press': {
    ...pair('Leg_Press'),
    primary: 'Cuádriceps',
    secondary: 'Glúteos, isquiotibiales',
    commonError: 'Bajar tanto que la pelvis se voltea y la lumbar se despega del respaldo.',
  },
  'extension-cuadriceps': {
    ...pair('Leg_Extensions'),
    primary: 'Cuádriceps',
    secondary: '',
    commonError: 'Lanzar el peso con impulso; bajar sin control.',
  },
  'split-squat': {
    ...pair('Split_Squat_with_Dumbbells'),
    primary: 'Cuádriceps',
    secondary: 'Glúteos, isquiotibiales',
    commonError: 'Inclinar el tronco al frente; dejar que la rodilla colapse hacia adentro.',
  },
  'goblet-squat': {
    ...pair('Goblet_Squat'),
    primary: 'Cuádriceps',
    secondary: 'Glúteos, isquiotibiales',
    commonError: 'Redondear la espalda alta; levantar los talones.',
  },
  'press-banca-barra': {
    ...pair('Barbell_Bench_Press_-_Medium_Grip'),
    primary: 'Pectoral',
    secondary: 'Hombros, tríceps',
    commonError: 'Arquear excesivamente la lumbar o despegar los pies del suelo.',
  },
  'press-banca-mancuernas': {
    ...pair('Dumbbell_Bench_Press'),
    primary: 'Pectoral',
    secondary: 'Hombros, tríceps',
    commonError: 'Perder el control en la bajada; abrir demasiado los codos.',
  },
  'press-inclinado-mancuernas': {
    ...pair('Incline_Dumbbell_Press'),
    primary: 'Pectoral (porción superior)',
    secondary: 'Hombros, tríceps',
    commonError: 'Inclinación demasiado alta; codos a 90° (estrés de hombro).',
  },
  'press-militar-mancuernas': {
    ...pair('Seated_Dumbbell_Press'),
    primary: 'Hombros',
    secondary: 'Tríceps',
    commonError: 'Arquear la lumbar para empujar; no apoyar bien la espalda.',
  },
  fondos: {
    ...pair('Parallel_Bar_Dip'),
    primary: 'Tríceps',
    secondary: 'Pectoral, hombros',
    commonError: 'Bajar demasiado (estrés de hombro); encoger los hombros.',
  },
  'jalon-pecho': {
    ...pair('Wide-Grip_Lat_Pulldown'),
    primary: 'Dorsal ancho',
    secondary: 'Bíceps, espalda media',
    commonError: 'Balancear el tronco para ayudarse; llevar la barra detrás de la nuca.',
  },
  'jalon-pecho-neutro': {
    ...pair('V-Bar_Pulldown'),
    primary: 'Dorsal ancho',
    secondary: 'Bíceps, espalda media',
    commonError: 'Balancear el tronco; no retraer las escápulas.',
  },
  'remo-polea-sentado': {
    ...pair('Seated_Cable_Rows'),
    primary: 'Espalda media',
    secondary: 'Dorsal ancho, bíceps',
    commonError: 'Balancear el tronco hacia atrás; redondear la espalda.',
  },
  'remo-mancuerna-banco': {
    ...pair('One-Arm_Dumbbell_Row'),
    primary: 'Espalda media',
    secondary: 'Dorsal ancho, bíceps',
    commonError: 'Rotar el tronco; tirar con el brazo en vez del dorsal.',
  },
  'elevaciones-laterales': {
    ...pair('Side_Lateral_Raise'),
    primary: 'Hombros (deltoide medio)',
    secondary: '',
    commonError: 'Usar impulso del tronco; subir por encima de la línea de los hombros.',
  },
  'face-pull': {
    ...pair('Face_Pull'),
    primary: 'Hombros (deltoide posterior)',
    secondary: 'Trapecio medio',
    commonError: 'Usar demasiado peso; tirar con los brazos en vez de los hombros.',
  },
  'curl-biceps': {
    ...pair('Dumbbell_Bicep_Curl'),
    primary: 'Bíceps',
    secondary: 'Antebrazos',
    commonError: 'Balancear el tronco; usar impulso de la cadera.',
  },
  'triceps-polea': {
    ...pair('Triceps_Pushdown_-_Rope_Attachment'),
    primary: 'Tríceps',
    secondary: '',
    commonError: 'Despegar los codos del costado; usar impulso del hombro.',
  },
}

export function getMedia(exId) {
  return EXERCISE_MEDIA[exId] || null
}
