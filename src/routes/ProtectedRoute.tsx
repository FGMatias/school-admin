import { ROUTES } from '@/constants/routes'
import { useAuth } from '@/hooks/useAuth'
import { Navigate, Outlet } from 'react-router-dom'

export function ProtectedRoute() {
  const { usuario, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-muted-foreground">Cargando...</div>
      </div>
    )
  }

  if (!usuario) {
    return <Navigate to={ROUTES.LOGIN} replace />
  }

  return <Outlet />
}
