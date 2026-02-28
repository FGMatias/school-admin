import { ROUTES } from '@/constants/routes'
import type { LucideIcon } from 'lucide-react'
import {
  BarChart3,
  Building2,
  CalendarDays,
  ClipboardCheck,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Receipt,
  UserRound,
  Wallet,
} from 'lucide-react'

export interface NavChild {
  label: string
  path: string
}

export interface NavItem {
  label: string
  icon: LucideIcon
  path?: string
  children?: NavChild[]
}

export interface NavSection {
  title: string
  items: NavItem[]
}

export const empresaNav: NavSection[] = [
  {
    title: 'MENÚ PRINCIPAL',
    items: [
      { label: 'Dashboard', icon: LayoutDashboard, path: ROUTES.EMPRESA.DASHBOARD },
      { label: 'Sucursal', icon: Building2, path: ROUTES.EMPRESA.SUCURSAL },
      { label: 'Periodo Académico', icon: CalendarDays, path: ROUTES.EMPRESA.PERIODO },
      { label: 'Grado', icon: GraduationCap, path: ROUTES.EMPRESA.GRADO },
      { label: 'Profesor', icon: UserRound, path: ROUTES.EMPRESA.PROFESOR },
      { label: 'Pago', icon: Wallet, path: ROUTES.EMPRESA.PAGO },
      { label: 'Tarifas', icon: Receipt, path: ROUTES.EMPRESA.TARIFA },
    ],
  },
  {
    title: 'REPORTES',
    items: [
      { label: 'Reporte de Alumnos', icon: FileText, path: ROUTES.EMPRESA.REPORTE_ALUMNO },
      {
        label: 'Reporte de Pagos',
        icon: BarChart3,
        children: [
          { label: 'Alumnos', path: ROUTES.EMPRESA.REPORTE_PAGO_ALUMNO },
          { label: 'Profesores', path: ROUTES.EMPRESA.REPORTE_PAGO_PROFESOR },
        ],
      },
      {
        label: 'Reporte de Matrícula',
        icon: ClipboardCheck,
        path: ROUTES.EMPRESA.REPORTE_MATRICULA,
      },
    ],
  },
]

export const routeTitles: Record<string, string> = {
  [ROUTES.EMPRESA.DASHBOARD]: 'Resumen del Tablero',
  [ROUTES.EMPRESA.SUCURSAL]: 'Sucursales',
  [ROUTES.EMPRESA.PERIODO]: 'Periodos Académicos',
  [ROUTES.EMPRESA.GRADO]: 'Grados',
  [ROUTES.EMPRESA.PROFESOR]: 'Profesores',
  [ROUTES.EMPRESA.PAGO]: 'Pagos',
  [ROUTES.EMPRESA.TARIFA]: 'Tarifas',
  [ROUTES.EMPRESA.REPORTE_ALUMNO]: 'Reporte de Al',
  [ROUTES.EMPRESA.REPORTE_PAGO_ALUMNO]: 'Reporte de Pagos - Alumnos',
  [ROUTES.EMPRESA.REPORTE_PAGO_PROFESOR]: 'Reporte de Pagos - Profesores',
  [ROUTES.EMPRESA.REPORTE_MATRICULA]: 'Reporte de Matrículas',
  [ROUTES.EMPRESA.LICENCIA]: 'Licencia',
}
