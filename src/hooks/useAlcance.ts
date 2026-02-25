import { useAuth } from './useAuth'

export function useAlcance() {
  const { usuario } = useAuth()

  if (!usuario) {
    return {
      sucursal: null,
      esColegio: false,
      filtroHabilitado: false,
    }
  }

  if (usuario.rol.nivel_alcance === 'COLEGIO') {
    return {
      sucursal: null,
      esColegio: true,
      filtroHabilitado: true,
    }
  }

  return {
    sucursal: usuario.usuario_sucursal?.map((us) => us.id_sucursal) ?? [],
    esColegio: false,
    filtroHabilitado: false,
  }
}
