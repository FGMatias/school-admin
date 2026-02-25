import { ROLES } from '@/constants/roles'
import { ROUTES } from '@/constants/routes'
import { useAuth } from '@/hooks/useAuth'
import { LoginPage } from '@/pages/LoginPage'
import { Route } from 'lucide-react'
import { BrowserRouter, Navigate, Routes } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import { RoleRoute } from './RoleAuth'

export function AppRouter() {
  const { usuario } = useAuth()

  const getDefaultRoute = () => {
    if (!usuario) return ROUTES.LOGIN
    return usuario.rol.nombre === ROLES.ADMIN_EMPRESA
      ? ROUTES.EMPRESA.DASHBOARD
      : ROUTES.SUCURSAL.DASHBOARD
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<RoleRoute allowedRole={ROLES.ADMIN_EMPRESA} />}>
            {/* TODO: agregar rutas de empresa */}
          </Route>
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<RoleRoute allowedRole={ROLES.ADMIN_SUCURSAL} />}>
            {/* TODO: agregar rutas de sucursal */}
          </Route>
        </Route>

        <Route path="*" element={<Navigate to={getDefaultRoute()} replace />} />
      </Routes>
    </BrowserRouter>
  )
}
