import { Button } from '@/components/ui/button'
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
  SidebarSeparator,
  useSidebar,
} from '@/components/ui/sidebar'
import { ROUTES } from '@/constants/routes'
import { useAuth } from '@/hooks/useAuth'
import { ChevronsUpDown, Loader2, LogOut } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { NavMain } from './NavMain'
import { empresaNav } from './sidebar-nav'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { usuario, logout } = useAuth()
  const navigate = useNavigate()
  const [loggingOut, setLoggingOut] = useState(false)
  const colegioNombre = usuario?.colegio.nombre ?? 'School Admin'
  const colegioInicial = colegioNombre.charAt(0).toUpperCase()
  const usuarioNombre = usuario ? `${usuario.nombre} ${usuario.apellido}` : 'Usuario'
  const rolLabel = usuario?.rol.nombre ?? 'Administrador'

  console.log({ usuario })

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
            <SidebarMenuButton size="lg" className="pointer-events-none">
              <div className="flex aspect-square size-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground text-xs font-bold">
                {colegioInicial}
              </div>
              <span className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                <span className="truncate font-semibold text-white">{colegioNombre}</span>
                <span className="truncate text-xs text-sidebar-foreground/60">
                  Panel administrativo
                </span>
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <SidebarSeparator />

        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-sidebar-primary/30 text-xs font-semibold text-white">
                    {usuario?.nombre.charAt(0)}
                    {usuario?.apellido.charAt(0)}
                  </div>
                  <span className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                    <span className="truncate font-semibold text-white">{usuarioNombre}</span>
                    <span className="truncate text-xs text-sidebar-foreground/60">{rolLabel}</span>
                  </span>
                  <ChevronsUpDown className="ml-auto size-4 shrink-0 text-sidebar-foreground/40 group-data-[collapsible=icon]:hidden" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="start"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <div className="flex size-8 items-center justify-center rounded-full bg-sa-primary/20 text-xs font-semibold text-sa-primary">
                      {usuario?.nombre.charAt(0)}
                      {usuario?.apellido.charAt(0)}
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{usuarioNombre}</span>
                      <span className="truncate text-xs text-muted-foreground">{rolLabel}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Mi Perfil</DropdownMenuItem>
                <DropdownMenuItem>Configuración</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        <NavMain sections={empresaNav} />
      </SidebarContent>

      <SidebarFooter>
        <LogoutButton loading={loggingOut} onClick={handleLogout} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}

function LogoutButton({ loading, onClick }: { loading: boolean; onClick: () => void }) {
  const { state } = useSidebar()
  const isCollapsed = state === 'collapsed'

  return (
    <Button
      variant="outline"
      onClick={onClick}
      disabled={loading}
      className={
        isCollapsed
          ? 'size-8 border-sidebar-border bg-transparent p-0 text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-white'
          : 'w-full justify-start gap-2 border-sidebar-border bg-transparent text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-white'
      }
    >
      {loading ? <Loader2 className="size-4 animate-spin" /> : <LogOut className="size-4" />}
      {!isCollapsed && <span>{loading ? 'Cerrando...' : 'Cerrar Sesión'}</span>}
    </Button>
  )
}
