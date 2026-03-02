import { DataTable } from '@/components/shared/DataTable'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { SucursalConAdmin, SucursalFiltros } from '@/types/sucursal.types'
import type { ColumnDef } from '@tanstack/react-table'
import {
  Download,
  Eye,
  Filter,
  MapPin,
  MoreVertical,
  Pencil,
  Power,
  Search,
  UserPlus,
  Users,
  X,
} from 'lucide-react'
import { useMemo, useState } from 'react'

interface SucursalTableProps {
  data: SucursalConAdmin[]
  onEditar: (sucursal: SucursalConAdmin) => void
  onToggleEstado: (sucursal: SucursalConAdmin) => void
  onAsignarAdmin: (sucursal: SucursalConAdmin) => void
  onVerDetalle: (sucursal: SucursalConAdmin) => void
}

export function SucursalTable({
  data,
  onEditar,
  onToggleEstado,
  onAsignarAdmin,
  onVerDetalle,
}: SucursalTableProps) {
  const [filtros, setFiltros] = useState<SucursalFiltros>({
    busqueda: '',
    estado: 'todos',
  })
  const [filtrosAplicados, setFiltrosAplicados] = useState<SucursalFiltros>({
    busqueda: '',
    estado: 'todos',
  })

  const datosFiltrados = useMemo(() => {
    return data.filter((s) => {
      if (filtrosAplicados.busqueda) {
        const termino = filtrosAplicados.busqueda.toLowerCase()
        const coincide =
          s.nombre.toLowerCase().includes(termino) ||
          (s.direccion?.toLowerCase().includes(termino) ?? false) ||
          (s.administrador &&
            `${s.administrador.nombre} ${s.administrador.apellido}`.toLowerCase().includes(termino))
        if (!coincide) return false
      }

      if (filtrosAplicados.estado === 'activo' && !s.estado) return false
      if (filtrosAplicados.estado === 'inactivo' && s.estado) return false

      return true
    })
  }, [data, filtrosAplicados])

  const columns = useMemo<ColumnDef<SucursalConAdmin, unknown>[]>(
    () => [
      {
        accessorKey: 'nombre',
        header: 'Nombre',
        cell: ({ row }) => (
          <div>
            <p className="font-medium">{row.original.nombre}</p>
            {row.original.direccion && (
              <p className="text-xs text-muted-foreground line-clamp-1">{row.original.direccion}</p>
            )}
          </div>
        ),
      },
      {
        accessorKey: 'direccion',
        header: 'Dirección',
        cell: ({ row }) =>
          row.original.direccion ? (
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="size-3.5 shrink-0" />
              <span className="line-clamp-1">{row.original.direccion}</span>
            </div>
          ) : (
            <span className="text-sm text-muted-foreground">—</span>
          ),
      },
      {
        id: 'administrador',
        header: 'Administrador',
        cell: ({ row }) => {
          const admin = row.original.administrador
          if (!admin) {
            return <span className="text-sm text-muted-foreground italic">Sin asignar</span>
          }
          return (
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                {admin.nombre.charAt(0)}
                {admin.apellido.charAt(0)}
              </div>
              <span className="text-sm">
                {admin.nombre} {admin.apellido}
              </span>
            </div>
          )
        },
      },
      {
        accessorKey: 'estado',
        header: 'Estado',
        cell: ({ row }) => (
          <Badge variant={row.original.estado ? 'default' : 'secondary'}>
            <span
              className={`mr-1.5 inline-block size-1.5 rounded-full ${
                row.original.estado ? 'bg-emerald-400' : 'bg-gray-400'
              }`}
            />
            {row.original.estado ? 'Activa' : 'Inactiva'}
          </Badge>
        ),
      },
      {
        id: 'acciones',
        header: 'Acciones',
        cell: ({ row }) => {
          const sucursal = row.original
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="size-8">
                  <MoreVertical className="size-4" />
                  <span className="sr-only">Acciones</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuItem onClick={() => onVerDetalle(sucursal)}>
                  <Eye className="mr-2 size-4" />
                  Ver Detalles
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onEditar(sucursal)}>
                  <Pencil className="mr-2 size-4" />
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onToggleEstado(sucursal)}>
                  <Power className="mr-2 size-4" />
                  {sucursal.estado ? 'Inhabilitar' : 'Habilitar'}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onAsignarAdmin(sucursal)}>
                  {sucursal.administrador ? (
                    <>
                      <Users className="mr-2 size-4" />
                      Ver Administrador
                    </>
                  ) : (
                    <>
                      <UserPlus className="mr-2 size-4" />
                      Asignar Administrador
                    </>
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
    ],
    [onEditar, onToggleEstado, onAsignarAdmin, onVerDetalle],
  )

  const aplicarFiltros = () => setFiltrosAplicados({ ...filtros })

  const limpiarFiltros = () => {
    const limpio: SucursalFiltros = { busqueda: '', estado: 'todos' }
    setFiltros(limpio)
    setFiltrosAplicados(limpio)
  }

  const hayFiltrosActivos = filtrosAplicados.busqueda !== '' || filtrosAplicados.estado !== 'todos'

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-3">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Ej. Sede Central"
                value={filtros.busqueda}
                onChange={(e) => setFiltros((prev) => ({ ...prev, busqueda: e.target.value }))}
                onKeyDown={(e) => e.key === 'Enter' && aplicarFiltros()}
                className="pl-9"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Select
                value={filtros.estado}
                onValueChange={(v) =>
                  setFiltros((prev) => ({
                    ...prev,
                    estado: v as SucursalFiltros['estado'],
                  }))
                }
              >
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Seleccionar Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="activo">Activa</SelectItem>
                  <SelectItem value="inactivo">Inactiva</SelectItem>
                </SelectContent>
              </Select>

              {hayFiltrosActivos && (
                <Button variant="ghost" size="sm" onClick={limpiarFiltros}>
                  <X className="mr-1 size-4" />
                  Limpiar Filtros
                </Button>
              )}

              <Button size="sm" onClick={aplicarFiltros}>
                <Filter className="mr-1 size-4" />
                Aplicar Filtros
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Lista de Sedes</CardTitle>
          <CardAction>
            <Button variant="outline" size="icon" className="size-8">
              <Download className="size-4" />
              <span className="sr-only">Exportar</span>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <DataTable
            columns={columns}
            data={datosFiltrados}
            pageSize={5}
            entityName="sucursales"
            emptyMessage={
              hayFiltrosActivos
                ? 'No se encontraron resultados con los filtros aplicados.'
                : 'No hay sucursales registradas.'
            }
          />
        </CardContent>
      </Card>
    </div>
  )
}
