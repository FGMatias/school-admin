import type { RolUsuarioId } from '@/constants/roles'
import { ROUTES } from '@/constants/routes'
import { useAuth } from '@/hooks/useAuth'
import { Navigate, Outlet } from 'react-router-dom'

interface RoleRouteProps {
  allowedRole: RolUsuarioId
}

export function RoleRoute({ allowedRole }: RoleRouteProps) {
  const { usuario } = useAuth()

  if (!usuario) {
    return <Navigate to={ROUTES.LOGIN} replace />
  }

  if (usuario.id_rol !== allowedRole) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
