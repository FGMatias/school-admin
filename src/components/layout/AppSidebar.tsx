import { ChevronsUpDown, Loader2, LogOut } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import { ROUTES } from '@/constants/routes'
import { useAuth } from '@/hooks/useAuth'
import { NavMain } from './NavMain'
import { empresaNav } from './sidebar-nav'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { usuario, logout } = useAuth()
  const navigate = useNavigate()
  const [loggingOut, setLoggingOut] = useState(false)

  const colegioNombre = usuario?.colegio.nombre ?? 'School Admin'
  const colegioInicial = colegioNombre.charAt(0).toUpperCase()
  const usuarioNombre = usuario ? `${usuario.nombre} ${usuario.apellido}` : 'Usuario'
  const rolLabel = usuario?.rol.nombre === 'ADMIN_EMPRESA' ? 'Administrador' : 'Admin Sucursal'

  const handleLogout = async () => {
    if (loggingOut) return
    setLoggingOut(true)
    try {
      await logout()
      navigate(ROUTES.LOGIN, { replace: true })
    } catch (err) {
      console.error('[AppSidebar] Error al cerrar sesión:', err)
      setLoggingOut(false)
    }
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent">
              <div className="bg-sa-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg text-xs font-bold">
                {colegioInicial}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{colegioNombre}</span>
                <span className="truncate text-xs text-sidebar-foreground/60">
                  Panel administrativo
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain sections={empresaNav} />
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div className="bg-sa-primary/20 text-sa-primary flex size-8 items-center justify-center rounded-lg text-xs font-semibold">
                    {usuario?.nombre.charAt(0)}
                    {usuario?.apellido.charAt(0)}
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{usuarioNombre}</span>
                    <span className="truncate text-xs">{rolLabel}</span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <div className="bg-sa-primary/20 text-sa-primary flex size-8 items-center justify-center rounded-lg text-xs font-semibold">
                      {usuario?.nombre.charAt(0)}
                      {usuario?.apellido.charAt(0)}
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{usuarioNombre}</span>
                      <span className="truncate text-xs">{rolLabel}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} disabled={loggingOut}>
                  {loggingOut ? <Loader2 className="animate-spin" /> : <LogOut />}
                  {loggingOut ? 'Cerrando...' : 'Cerrar Sesión'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
