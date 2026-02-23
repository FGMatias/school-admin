export const ROLES = {
  ADMIN_EMPRESA: 'ADMIN_EMPRESA',
  ADMIN_SUCURSAL: 'ADMIN_SUCURSAL',
} as const

export type RolUsuario = (typeof ROLES)[keyof typeof ROLES]
