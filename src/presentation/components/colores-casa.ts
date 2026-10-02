import type { CasaId } from '../../domain'

export const COLORES_CASA: Record<CasaId, { fondo: string; texto: string }> = {
  gryffindor: { fondo: 'var(--gryf)', texto: 'var(--gryf-t)' },
  slytherin: { fondo: 'var(--slyt)', texto: 'var(--slyt-t)' },
  ravenclaw: { fondo: 'var(--rave)', texto: 'var(--rave-t)' },
  hufflepuff: { fondo: 'var(--huff)', texto: 'var(--huff-t)' },
}
