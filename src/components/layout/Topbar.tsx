import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { useTheme } from '@/hooks/useTheme'
import { Bell, Moon, Search, Sun } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { routeTitles } from './sidebar-nav'

export function Topbar() {
  const { pathname } = useLocation()
  const { theme, toggleTheme } = useTheme()
  const title = routeTitles[pathname] ?? 'Panel de Administración'

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b px-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
        <h1 className="text-sm font-semibold">{title}</h1>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative hidden md:block">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar alumnos, reportes..."
            className="h-9 w-64 pl-9 text-sm"
          />
        </div>

        <Button variant="ghost" size="icon" className="md:hidden">
          <Search className="size-4" />
          <span className="sr-only">Buscar</span>
        </Button>

        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {theme === 'light' ? <Moon className="size-4" /> : <Sun className="size-4" />}
          <span className="sr-only">Cambiar tema</span>
        </Button>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="size-4" />
              <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-red-500" />
              <span className="sr-only">Notificaciones</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80">
            <div className="space-y-3">
              <h4 className="text-sm font-semibold">Notificaciones</h4>
              <Separator />
              <p className="py-4 text-center text-sm text-muted-foreground">
                No hay notificaciones nuevas
              </p>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  )
}
