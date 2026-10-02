import type { CasaId } from './state'

export interface TarjetaTabu {
  /** Único aunque la palabra se repita en el mazo. */
  id: string
  palabra: string
  prohibidas: [string, string, string, string]
}

export type ResultadoTabu = 'acierto' | 'error'

export interface TurnoTabu {
  /** Timestamp (ms) en que vence el turno. `null` = la casa todavía no jugó. */
  venceEn: number | null
  /** Resultado de cada tarjeta jugada, en el orden del reparto. */
  resultados: ResultadoTabu[]
}

export type EstadoTurnoTabu = 'pendiente' | 'en-curso' | 'terminado'

export const TARJETAS_POR_CASA = 15
export const DURACION_TURNO_TABU_SEGUNDOS = 180

/** Si el mazo cambia y ya no admite un reparto sin repetidos, se usa el último sorteo. */
const MAX_INTENTOS_REPARTO = 1000

export const TARJETAS_TABU: TarjetaTabu[] = [
  { id: 'varita', palabra: 'VARITA', prohibidas: ['magia', 'hechizo', 'madera', 'Harry'] },
  { id: 'hermione', palabra: 'HERMIONE', prohibidas: ['Harry', 'Ron', 'Granger', 'bruja'] },
  { id: 'dragon-1', palabra: 'DRAGÓN', prohibidas: ['fuego', 'alas', 'animal', 'escamas'] },
  { id: 'pocion-1', palabra: 'POCIÓN', prohibidas: ['beber', 'líquido', 'caldero', 'magia'] },
  { id: 'quidditch-1', palabra: 'QUIDDITCH', prohibidas: ['escoba', 'deporte', 'pelota', 'Harry'] },
  { id: 'dementor', palabra: 'DEMENTOR', prohibidas: ['Azkaban', 'beso', 'alma', 'negro'] },
  { id: 'castillo', palabra: 'CASTILLO', prohibidas: ['Hogwarts', 'edificio', 'rey', 'princesa'] },
  { id: 'dumbledore', palabra: 'DUMBLEDORE', prohibidas: ['director', 'barba', 'Hogwarts', 'Harry'] },
  { id: 'invisibilidad', palabra: 'INVISIBILIDAD', prohibidas: ['invisible', 'capa', 'ver', 'Harry'] },
  { id: 'arana', palabra: 'ARAÑA', prohibidas: ['ocho', 'patas', 'Aragog', 'Ron'] },
  { id: 'hechizo-1', palabra: 'HECHIZO', prohibidas: ['magia', 'varita', 'palabras', 'lanzar'] },
  { id: 'voldemort', palabra: 'VOLDEMORT', prohibidas: ['Harry', 'Tom', 'villano', 'nariz'] },
  { id: 'espejo', palabra: 'ESPEJO', prohibidas: ['reflejo', 'mirar', 'imagen', 'Oesed'] },
  { id: 'escoba-1', palabra: 'ESCOBA', prohibidas: ['volar', 'Quidditch', 'Harry', 'palo'] },
  { id: 'fantasma', palabra: 'FANTASMA', prohibidas: ['muerto', 'espíritu', 'transparente', 'Hogwarts'] },
  { id: 'ron', palabra: 'RON', prohibidas: ['Harry', 'Hermione', 'Weasley', 'pelirrojo'] },
  { id: 'hogwarts', palabra: 'HOGWARTS', prohibidas: ['escuela', 'castillo', 'magia', 'estudiantes'] },
  { id: 'avada-kedavra', palabra: 'AVADA KEDAVRA', prohibidas: ['maldición', 'muerte', 'verde', 'Voldemort'] },
  { id: 'leviosa', palabra: 'LEVIOSA', prohibidas: ['Wingardium', 'Hermione', 'pluma', 'volar'] },
  { id: 'azkaban', palabra: 'AZKABAN', prohibidas: ['prisión', 'Sirius', 'Dementores', 'cárcel'] },
  { id: 'hagrid', palabra: 'HAGRID', prohibidas: ['gigante', 'barba', 'Hogwarts', 'criaturas'] },
  { id: 'fuego', palabra: 'FUEGO', prohibidas: ['caliente', 'quemar', 'llamas', 'rojo'] },
  { id: 'horrocrux', palabra: 'HORROCRUX', prohibidas: ['Voldemort', 'alma', 'inmortal', 'objeto'] },
  { id: 'nimbus-2000', palabra: 'NIMBUS 2000', prohibidas: ['escoba', 'Harry', 'volar', 'Quidditch'] },
  { id: 'mapa-del-merodeador', palabra: 'MAPA DEL MERODEADOR', prohibidas: ['Fred', 'George', 'Hogwarts', 'mapa'] },
  { id: 'sombrero-seleccionador-1', palabra: 'SOMBRERO SELECCIONADOR', prohibidas: ['casas', 'cabeza', 'Gryffindor', 'hablar'] },
  { id: 'lobo', palabra: 'LOBO', prohibidas: ['Lupin', 'luna', 'animal', 'aullar'] },
  { id: 'diario', palabra: 'DIARIO', prohibidas: ['escribir', 'Tom Riddle', 'páginas', 'Horrocrux'] },
  { id: 'magico', palabra: 'MÁGICO', prohibidas: ['bruja', 'hechizo', 'varita', 'Hogwarts'] },
  { id: 'gryffindor', palabra: 'GRYFFINDOR', prohibidas: ['león', 'rojo', 'Harry', 'casa'] },
  { id: 'hechizo-2', palabra: 'HECHIZO', prohibidas: ['magia', 'varita', 'encantamiento', 'palabras'] },
  { id: 'gringotts', palabra: 'GRINGOTTS', prohibidas: ['banco', 'duendes', 'dinero', 'bóveda'] },
  { id: 'snape', palabra: 'SNAPE', prohibidas: ['profesor', 'pociones', 'Lily', 'negro'] },
  { id: 'lechuza', palabra: 'LECHUZA', prohibidas: ['ave', 'carta', 'volar', 'Hedwig'] },
  { id: 'slytherin', palabra: 'SLYTHERIN', prohibidas: ['serpiente', 'verde', 'casa', 'Voldemort'] },
  { id: 'giratiempo', palabra: 'GIRATIEMPO', prohibidas: ['Hermione', 'tiempo', 'reloj', 'pasado'] },
  { id: 'dobby', palabra: 'DOBBY', prohibidas: ['elfo', 'calcetín', 'Harry', 'Malfoy'] },
  { id: 'bosque-prohibido', palabra: 'BOSQUE PROHIBIDO', prohibidas: ['árboles', 'Hogwarts', 'arañas', 'centauros'] },
  { id: 'patronus', palabra: 'PATRONUS', prohibidas: ['animal', 'Dementor', 'protección', 'hechizo'] },
  { id: 'cicatriz', palabra: 'CICATRIZ', prohibidas: ['Harry', 'frente', 'rayo', 'Voldemort'] },
  { id: 'mandragora-1', palabra: 'MANDRÁGORA', prohibidas: ['planta', 'grito', 'raíz', 'invernadero'] },
  { id: 'snitch-dorada', palabra: 'SNITCH DORADA', prohibidas: ['Quidditch', 'pelota', 'alas', 'dorada'] },
  { id: 'callejon-diagon', palabra: 'CALLEJÓN DIAGON', prohibidas: ['tiendas', 'magia', 'Londres', 'Gringotts'] },
  { id: 'sombrero-seleccionador-2', palabra: 'SOMBRERO SELECCIONADOR', prohibidas: ['casas', 'cabeza', 'Hogwarts', 'elegir'] },
  { id: 'rana-de-chocolate', palabra: 'RANA DE CHOCOLATE', prohibidas: ['dulce', 'comer', 'saltar', 'chocolate'] },
  { id: 'espada', palabra: 'ESPADA', prohibidas: ['Gryffindor', 'cortar', 'acero', 'arma'] },
  { id: 'pocion-2', palabra: 'POCIÓN', prohibidas: ['beber', 'caldero', 'líquido', 'ingredientes'] },
  { id: 'escudo', palabra: 'ESCUDO', prohibidas: ['proteger', 'defensa', 'guerra', 'cubrir'] },
  { id: 'caldero', palabra: 'CALDERO', prohibidas: ['poción', 'olla', 'cocinar', 'bruja'] },
  { id: 'escoba-2', palabra: 'ESCOBA', prohibidas: ['volar', 'Quidditch', 'barrer', 'palo'] },
  { id: 'carta', palabra: 'CARTA', prohibidas: ['sobre', 'escribir', 'correo', 'Hogwarts'] },
  { id: 'mandragora-2', palabra: 'MANDRÁGORA', prohibidas: ['planta', 'grito', 'raíz', 'invernadero'] },
  { id: 'mortifago', palabra: 'MORTÍFAGO', prohibidas: ['Voldemort', 'máscara', 'marca', 'negro'] },
  { id: 'troll', palabra: 'TROLL', prohibidas: ['gigante', 'baño', 'piedra', 'Hermione'] },
  { id: 'profecia', palabra: 'PROFECÍA', prohibidas: ['futuro', 'predicción', 'bola', 'Trelawney'] },
  { id: 'sala-de-los-menesteres', palabra: 'SALA DE LOS MENESTERES', prohibidas: ['Hogwarts', 'habitación', 'esconder', 'objetos'] },
  { id: 'dragon-2', palabra: 'DRAGÓN', prohibidas: ['fuego', 'alas', 'escamas', 'criatura'] },
  { id: 'piedra-filosofal', palabra: 'PIEDRA FILOSOFAL', prohibidas: ['Nicolas Flamel', 'roja', 'inmortalidad', 'Voldemort'] },
  { id: 'quidditch-2', palabra: 'QUIDDITCH', prohibidas: ['escoba', 'deporte', 'pelota', 'equipo'] },
  { id: 'siempre-always', palabra: 'SIEMPRE / ALWAYS', prohibidas: ['Snape', 'Lily', 'amor', 'pregunta'] },
]

const TARJETA_POR_ID = new Map(TARJETAS_TABU.map((tarjeta) => [tarjeta.id, tarjeta]))

export function tarjetaTabu(id: string): TarjetaTabu {
  const tarjeta = TARJETA_POR_ID.get(id)
  if (!tarjeta) throw new Error(`Tarjeta de Tabú desconocida: ${id}`)
  return tarjeta
}

function normalizarPalabra(palabra: string): string {
  return palabra.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()
}

function mezclar<T>(items: T[]): T[] {
  const mezclados = [...items]
  for (let i = mezclados.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[mezclados[i], mezclados[j]] = [mezclados[j], mezclados[i]]
  }
  return mezclados
}

function repitePalabra(ids: string[]): boolean {
  const palabras = ids.map((id) => normalizarPalabra(tarjetaTabu(id).palabra))
  return new Set(palabras).size !== palabras.length
}

/**
 * Mezcla el mazo y reparte 15 tarjetas por casa. Si alguna casa recibe dos
 * tarjetas con la misma palabra, descarta el sorteo y vuelve a mezclar.
 */
export function repartirTarjetas(casas: CasaId[]): Record<CasaId, string[]> {
  const ids = TARJETAS_TABU.map((tarjeta) => tarjeta.id)
  let reparto = {} as Record<CasaId, string[]>

  for (let intento = 0; intento < MAX_INTENTOS_REPARTO; intento++) {
    const mezclados = mezclar(ids)
    reparto = casas.reduce<Record<CasaId, string[]>>(
      (acc, casa, indice) => ({
        ...acc,
        [casa]: mezclados.slice(indice * TARJETAS_POR_CASA, (indice + 1) * TARJETAS_POR_CASA),
      }),
      {} as Record<CasaId, string[]>,
    )
    if (!casas.some((casa) => repitePalabra(reparto[casa]))) break
  }

  return reparto
}

export function estadoTurnoTabu(turno: TurnoTabu, ahora: number): EstadoTurnoTabu {
  if (turno.venceEn === null) return 'pendiente'
  if (turno.resultados.length >= TARJETAS_POR_CASA || ahora >= turno.venceEn) return 'terminado'
  return 'en-curso'
}

/** Id de la tarjeta que se está jugando, o `null` si ya se jugaron todas. */
export function tarjetaEnCurso(reparto: string[], turno: TurnoTabu): string | null {
  return reparto[turno.resultados.length] ?? null
}
