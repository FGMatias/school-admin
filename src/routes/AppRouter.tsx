import { AppLayout } from '@/components/layout/AppLayout'
import { ROLES } from '@/constants/roles'
import { ROUTES } from '@/constants/routes'
import { ConceptoPagoPage } from '@/pages/empresa/ConceptoPagoPage'
import { DashboardEmpresaPage } from '@/pages/empresa/DashboardPage'
import { GradoPage } from '@/pages/empresa/GradoPage'
import { PeriodosPage } from '@/pages/empresa/PeriodoPage'
import { SucursalPage } from '@/pages/empresa/SucursalPage'
import { LoginPage } from '@/pages/LoginPage'
import { DashboardSucursalPage } from '@/pages/sucursal/DashboardPage'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import { RoleRoute } from './RoleAuth'
import { RootRedirect } from './RootRedirect'

const router = createBrowserRouter([
  {
    path: ROUTES.LOGIN,
    element: <LoginPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <RootRedirect />,
      },
      {
        element: <AppLayout />,
        children: [
          {
            element: <RoleRoute allowedRole={ROLES.ADMIN_EMPRESA} />,
            children: [
              { path: ROUTES.EMPRESA.DASHBOARD, element: <DashboardEmpresaPage /> },
              { path: ROUTES.EMPRESA.SUCURSAL, element: <SucursalPage /> },
              { path: ROUTES.EMPRESA.PERIODO, element: <PeriodosPage /> },
              { path: ROUTES.EMPRESA.GRADO, element: <GradoPage /> },
              { path: ROUTES.EMPRESA.PROFESOR, element: <Placeholder titulo="Profesores" /> },
              { path: ROUTES.EMPRESA.PAGO, element: <Placeholder titulo="Pagos" /> },
              { path: ROUTES.EMPRESA.TARIFA, element: <ConceptoPagoPage /> },
              {
                path: ROUTES.EMPRESA.REPORTE_ALUMNO,
                element: <Placeholder titulo="Reporte de Alumnos" />,
              },
              {
                path: ROUTES.EMPRESA.REPORTE_PAGO_ALUMNO,
                element: <Placeholder titulo="Reporte de Pagos - Alumnos" />,
              },
              {
                path: ROUTES.EMPRESA.REPORTE_PAGO_PROFESOR,
                element: <Placeholder titulo="Reporte de Pagos - Profesores" />,
              },
              {
                path: ROUTES.EMPRESA.REPORTE_MATRICULA,
                element: <Placeholder titulo="Reporte de Matrícula" />,
              },
              { path: ROUTES.EMPRESA.LICENCIA, element: <Placeholder titulo="Licencia" /> },
            ],
          },
          {
            element: <RoleRoute allowedRole={ROLES.ADMIN_SUCURSAL} />,
            children: [
              { path: ROUTES.SUCURSAL.DASHBOARD, element: <DashboardSucursalPage /> },
              { path: ROUTES.SUCURSAL.ALUMNO, element: <Placeholder titulo="Alumnos" /> },
              { path: ROUTES.SUCURSAL.PAGO, element: <Placeholder titulo="Pagos" /> },
              { path: ROUTES.SUCURSAL.MATRICULA, element: <Placeholder titulo="Matrícula" /> },
              {
                path: ROUTES.SUCURSAL.REPORTE_ALUMNO,
                element: <Placeholder titulo="Reporte de Alumnos" />,
              },
              {
                path: ROUTES.SUCURSAL.REPORTE_PAGO,
                element: <Placeholder titulo="Reporte de Pagos - Alumnos" />,
              },
              {
                path: ROUTES.SUCURSAL.REPORTE_MATRICULA,
                element: <Placeholder titulo="Reporte de Matrícula" />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <RootRedirect />,
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
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
