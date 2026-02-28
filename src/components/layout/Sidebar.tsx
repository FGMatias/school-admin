import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/utils'
import { ChevronDown, LogOut } from 'lucide-react'
import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { empresaNav, type NavItem } from './sidebar-nav'

export function Sidebar() {
  const { usuario, logout } = useAuth()
  const location = useLocation()

  const colegioNombre = usuario?.colegio.nombre ?? 'School Admin'
  const colegioInicial = colegioNombre.charAt(0).toUpperCase()
  const usuarioNombre = usuario ? `${usuario.nombre} ${usuario.apellido}` : 'Usuario'
  const rolLabel = usuario?.rol.nombre === 'ADMIN_EMPRESA' ? 'Administrador' : 'Admin Sucursal'

  return (
    <aside className="fixed left-0 top-0 z-30 flex h-screen w-64 flex-shrink-0 flex-col bg-slate-800 text-white">
      <div className="flex items-center gap-3 border-b border-slate-700 px-6 py-5">
        <div className="flex size-8 flex-shrink-0 items-center justify-center rounded bg-sa-primary text-sm font-bold text-white">
          {colegioInicial}
        </div>
        <h1 className="font-display truncate text-base font-bold leading-tight tracking-tight">
          {colegioNombre}
        </h1>
      </div>

      <div className="px-4 py-4">
        <div className="flex items-center gap-3 rounded-lg border border-slate-700 bg-slate-800/50 p-3">
          <div className="flex size-10 flex-shrink-0 items-center justify-center rounded-full bg-sa-primary/20 text-sm font-semibold text-sa-primary">
            {usuario?.nombre.charAt(0)}
            {usuario?.apellido.charAt(0)}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-slate-200">{usuarioNombre}</p>
            <p className="truncate text-xs text-slate-400">{rolLabel}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 pb-4">
        {empresaNav.map((section) => (
          <div key={section.title}>
            <p className="mb-1 mt-4 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
              {section.title}
            </p>
            {section.items.map((item) => (
              <SidebarItem key={item.label} item={item} currentPath={location.pathname} />
            ))}
          </div>
        ))}
      </nav>

      <div className="border-t border-slate-700 p-4">
        <Button
          variant="ghost"
          onClick={logout}
          className="h-11 w-full justify-center gap-2 rounded-lg border border-red-600/20 bg-red-600/10 text-sm font-semibold text-red-400 hover:border-red-600 hover:bg-red-600 hover:text-white"
        >
          <LogOut size={18} />
          Cerrar Sesión
        </Button>
      </div>
    </aside>
  )
}

function SidebarItem({ item, currentPath }: { item: NavItem; currentPath: string }) {
  const hasChildren = !!item.children?.length
  const isChildActive = hasChildren && item.children!.some((c) => currentPath === c.path)
  const [open, setOpen] = useState(isChildActive)

  const linkClasses = (isActive: boolean) =>
    cn(
      'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
      isActive
        ? 'bg-sa-primary/15 text-white'
        : 'text-slate-300 hover:bg-slate-700 hover:text-white',
    )

  const iconClasses = (isActive: boolean) =>
    cn('size-5 flex-shrink-0 transition-colors', isActive ? 'text-sa-primary' : 'text-slate-400')

  if (hasChildren) {
    return (
      <div>
        <button onClick={() => setOpen(!open)} className={linkClasses(isChildActive)}>
          <item.icon className={iconClasses(isChildActive)} />
          <span className="flex-1 text-left">{item.label}</span>
          <ChevronDown
            size={16}
            className={cn('text-slate-500 transition-transform duration-200', open && 'rotate-180')}
          />
        </button>
        {open && (
          <div className="mt-1 flex flex-col gap-0.5 pl-11">
            {item.children!.map((child) => (
              <NavLink
                key={child.path}
                to={child.path}
                className={({ isActive }) =>
                  cn(
                    'rounded-lg px-3 py-2 text-sm transition-colors',
                    isActive
                      ? 'bg-slate-700/50 font-medium text-sa-primary'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-sa-primary',
                  )
                }
              >
                {child.label}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <NavLink
      to={item.path!}
      end={item.path === '/empresa'}
      className={({ isActive }) => linkClasses(isActive)}
    >
      <item.icon className={iconClasses(currentPath === item.path!)} />
      <span>{item.label}</span>
    </NavLink>
  )
}
