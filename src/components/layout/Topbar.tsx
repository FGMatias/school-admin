import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Bell, Search } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { routeTitles } from './sidebar-nav'

export function Topbar() {
  const { pathname } = useLocation()
  const title = routeTitles[pathname] ?? 'Panel de Administración'

  return (
    <header className="flex h-16 flex-shrink-0 items-center justify-between border-b border-slate-200 bg-white px-8">
      <h2 className="font-display text-xl font-bold text-slate-800">{title}</h2>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search
            size={18}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <Input
            type="text"
            placeholder="Buscar alumnos, reportes..."
            className="h-9 w-64 rounded-lg border-none bg-sa-background pl-9 text-sm shadow-none placeholder:text-slate-400 focus:ring-2 focus:ring-sa-primary"
          />
        </div>

        <div className="hidden h-6 w-px bg-slate-200 md:block" />

        <Button
          variant="ghost"
          size="icon"
          className="relative text-slate-500 hover:text-sa-primary"
        >
          <Bell size={20} />
          <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-red-500 ring-2 ring-white" />
        </Button>
      </div>
    </header>
  )
}
