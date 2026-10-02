/**
 * Banco fijo de preguntas del Juego 1 (Preguntas y respuestas), en el orden
 * en que el anfitrión las lee. El `id` es la clave de los aciertos marcados:
 * se mantiene estable aunque se corrija el texto o se reordene el banco.
 */

export type Pregunta =
  | { id: string; tipo: 'abierta'; enunciado: string; respuesta: string }
  | {
      id: string
      tipo: 'multiple-choice'
      enunciado: string
      opciones: [string, string, string, string]
      correcta: 0 | 1 | 2 | 3
    }

export const SEGUNDOS_TIMER_INICIAL = 10
export const PASO_TIMER_SEGUNDOS = 5

export const PREGUNTAS_JUEGO_1: Pregunta[] = [
  { id: 'banco-magos', tipo: 'abierta', enunciado: '¿Cómo se llama el banco de los magos?', respuesta: 'Gringotts.' },
  { id: 'patronus-harry', tipo: 'abierta', enunciado: '¿Cuál es el Patronus de Harry?', respuesta: 'Un ciervo.' },
  {
    id: 'mapa-merodeador',
    tipo: 'abierta',
    enunciado: '¿Cómo se llama el mapa que muestra todos los pasadizos y personas de Hogwarts?',
    respuesta: 'El Mapa del Merodeador.',
  },
  {
    id: 'madre-draco',
    tipo: 'abierta',
    enunciado: '¿Cuál es el nombre de la madre de Draco Malfoy?',
    respuesta: 'Narcissa Malfoy.',
  },
  {
    id: 'criatura-camara',
    tipo: 'abierta',
    enunciado: '¿Qué criatura vive en la Cámara de los Secretos?',
    respuesta: 'Un basilisco.',
  },
  {
    id: 'tienda-varitas',
    tipo: 'abierta',
    enunciado: '¿Qué tienda vende varitas en el Callejón Diagon?',
    respuesta: 'Ollivanders.',
  },
  {
    id: 'nombre-voldemort',
    tipo: 'abierta',
    enunciado: '¿Cuál es el nombre completo de Voldemort?',
    respuesta: 'Tom Marvolo Riddle.',
  },
  {
    id: 'reliquias-muerte',
    tipo: 'abierta',
    enunciado: '¿Cuáles son las tres Reliquias de la Muerte?',
    respuesta: 'La Varita de Saúco, la Piedra de la Resurrección y la Capa de Invisibilidad.',
  },
  { id: 'mata-nagini', tipo: 'abierta', enunciado: '¿Quién mata a Nagini?', respuesta: 'Neville Longbottom.' },
  {
    id: 'amor-snape',
    tipo: 'abierta',
    enunciado: '¿Quién fue el primer amor de Severus Snape?',
    respuesta: 'Lily Potter.',
  },
  {
    id: 'hermano-dumbledore',
    tipo: 'abierta',
    enunciado: '¿Cómo se llama el hermano de Dumbledore?',
    respuesta: 'Aberforth Dumbledore.',
  },
  { id: 'lechuza-harry', tipo: 'abierta', enunciado: '¿Cómo se llama la lechuza de Harry?', respuesta: 'Hedwig.' },
  {
    id: 'primer-horrocrux',
    tipo: 'abierta',
    enunciado: '¿Cuál fue el primer Horrocrux que Harry destruyó?',
    respuesta: 'El diario de Tom Riddle.',
  },
  {
    id: 'guardapelo-slytherin',
    tipo: 'multiple-choice',
    enunciado: '¿Quién destruye el guardapelo de Slytherin?',
    opciones: ['Harry', 'Hermione', 'Neville', 'Ron'],
    correcta: 3,
  },
  {
    id: 'patronus-hermione',
    tipo: 'multiple-choice',
    enunciado: '¿Cuál es el Patronus de Hermione?',
    opciones: ['Gato', 'Nutria', 'Cisne', 'Zorro'],
    correcta: 1,
  },
  {
    id: 'padrino-harry',
    tipo: 'multiple-choice',
    enunciado: '¿Quién es el padrino de Harry?',
    opciones: ['Remus Lupin', 'Arthur Weasley', 'Sirius Black', 'Alastor Moody'],
    correcta: 2,
  },
  {
    id: 'mata-dumbledore',
    tipo: 'multiple-choice',
    enunciado: '¿Quién mata a Dumbledore?',
    opciones: ['Voldemort', 'Snape', 'Draco', 'Bellatrix'],
    correcta: 1,
  },
  {
    id: 'hechizo-invocar',
    tipo: 'multiple-choice',
    enunciado: '¿Qué hechizo se utiliza para invocar objetos?',
    opciones: ['Accio', 'Alohomora', 'Wingardium Leviosa', 'Reparo'],
    correcta: 0,
  },
  {
    id: 'hechizos-imperdonables',
    tipo: 'abierta',
    enunciado: '¿Cuáles son los tres hechizos imperdonables?',
    respuesta: 'Avada Kedavra, Imperio y Crucio.',
  },
  {
    id: 'siete-horrocruxes',
    tipo: 'abierta',
    enunciado: '¿Cuáles son los 7 Horrocruxes?',
    respuesta:
      'El diario de Tom Riddle, el anillo de Marvolo Gaunt, el guardapelo de Salazar Slytherin, la copa de Helga Hufflepuff, la diadema de Rowena Ravenclaw, Nagini y Harry.',
  },
]
