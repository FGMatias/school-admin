import { ROLES } from '@/constants/roles'
import { ROUTES } from '@/constants/routes'
import { useAuth } from '@/hooks/useAuth'
import { DashboardEmpresaPage } from '@/pages/empresa/DashboardPage'
import { LoginPage } from '@/pages/LoginPage'
import { DashboardSucursalPage } from '@/pages/sucursal/DashboardPage'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
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
            <Route path={ROUTES.EMPRESA.DASHBOARD} element={<DashboardEmpresaPage />} />
            <Route path={ROUTES.EMPRESA.SUCURSAL} element={<Placeholder titulo="Sucursales" />} />
            <Route
              path={ROUTES.EMPRESA.PERIODO}
              element={<Placeholder titulo="Periodos Académicos" />}
            />
            <Route path={ROUTES.EMPRESA.GRADO} element={<Placeholder titulo="Grados" />} />
            <Route path={ROUTES.EMPRESA.PROFESOR} element={<Placeholder titulo="Profesores" />} />
            <Route path={ROUTES.EMPRESA.PAGO} element={<Placeholder titulo="Pagos" />} />
            <Route path={ROUTES.EMPRESA.TARIFA} element={<Placeholder titulo="Tarifas" />} />
            <Route
              path={ROUTES.EMPRESA.REPORTE_ALUMNO}
              element={<Placeholder titulo="Reporte de Alumnos" />}
            />
            <Route
              path={ROUTES.EMPRESA.REPORTE_PAGO_ALUMNO}
              element={<Placeholder titulo="Reporte de Pagos - Alumnos" />}
            />
            <Route
              path={ROUTES.EMPRESA.REPORTE_PAGO_PROFESOR}
              element={<Placeholder titulo="Reporte de Pagos - Profesores" />}
            />
            <Route
              path={ROUTES.EMPRESA.REPORTE_MATRICULA}
              element={<Placeholder titulo="Reporte de Matrícula" />}
            />
            <Route path={ROUTES.EMPRESA.LICENCIA} element={<Placeholder titulo="Licencia" />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<RoleRoute allowedRole={ROLES.ADMIN_SUCURSAL} />}>
            <Route path={ROUTES.SUCURSAL.DASHBOARD} element={<DashboardSucursalPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to={getDefaultRoute()} replace />} />
      </Routes>
    </BrowserRouter>
  )
}

function Placeholder({ titulo }: { titulo: string }) {
  return (
    <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white">
      <p className="text-lg text-slate-400">
        Módulo <span className="font-semibold text-slate-600">{titulo}</span> — próximamente
      </p>
    </div>
  )
}
