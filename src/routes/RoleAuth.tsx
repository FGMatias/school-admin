import type { RolUsuario } from '@/constants/roles'
import { ROUTES } from '@/constants/routes'
import { useAuth } from '@/hooks/useAuth'
import { Navigate, Outlet } from 'react-router-dom'

interface RoleRouteProps {
  allowedRole: RolUsuario
}

export function RoleRoute({ allowedRole }: RoleRouteProps) {
  const { usuario } = useAuth()

  if (!usuario) {
    return <Navigate to={ROUTES.LOGIN} replace />
  }

  if (usuario.rol.nombre !== allowedRole) {
    const redirectTo =
      usuario.rol.nombre === 'ADMIN_EMPRESA' ? ROUTES.EMPRESA.DASHBOARD : ROUTES.SUCURSAL.DASHBOARD

    return <Navigate to={redirectTo} replace />
  }

  return <Outlet />
}
