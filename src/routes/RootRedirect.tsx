import { ROLES } from '@/constants/roles'
import { ROUTES } from '@/constants/routes'
import { useAuth } from '@/hooks/useAuth'
import { Navigate } from 'react-router-dom'

export function RootRedirect() {
  const { usuario } = useAuth()

  if (!usuario) {
    return <Navigate to={ROUTES.LOGIN} replace />
  }

  switch (usuario.id_rol) {
    case ROLES.ADMIN_EMPRESA:
      return <Navigate to={ROUTES.EMPRESA.DASHBOARD} replace />
    case ROLES.ADMIN_SUCURSAL:
      return <Navigate to={ROUTES.SUCURSAL.DASHBOARD} replace />
    default:
      return <Navigate to={ROUTES.LOGIN} replace />
  }
}
