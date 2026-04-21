export const ROLES = {
  ADMIN_EMPRESA: 1,
  ADMIN_SUCURSAL: 2,
} as const

export type RolUsuarioId = (typeof ROLES)[keyof typeof ROLES]
