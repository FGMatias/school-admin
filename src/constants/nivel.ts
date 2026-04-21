export const NIVEL = {
  INICIAL: 'INICIAL',
  PRIMARIA: 'PRIMARIA',
  SECUNDARIA: 'SECUNDARIA',
} as const

export type Nivel = (typeof NIVEL)[keyof typeof NIVEL]
