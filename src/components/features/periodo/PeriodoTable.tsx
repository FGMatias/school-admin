import { DataTable } from '@/components/shared/DataTable'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import { type PeriodoAcademico, type PeriodoFiltros } from '@/types/periodo.types'
import type { ColumnDef } from '@tanstack/react-table'
import { Download, Eye, Filter, MoreVertical, Pencil, Power, Search, X } from 'lucide-react'
import { useMemo, useState } from 'react'

interface PeriodoTableProps {
  data: PeriodoAcademico[]
  onEditar: (periodo: PeriodoAcademico) => void
  onToggleEstado: (periodo: PeriodoAcademico) => void
  onVerDetalle: (periodo: PeriodoAcademico) => void
}

export function PeriodoTable({ data, onEditar, onToggleEstado, onVerDetalle }: PeriodoTableProps) {
  const [filtros, setFiltros] = useState<PeriodoFiltros>({
    busqueda: '',
    estado: 'todos',
  })
  const [filtrosAplicados, setFiltrosAplicados] = useState<PeriodoFiltros>({
    busqueda: '',
    estado: 'todos',
  })

  const datosFiltrados = useMemo(() => {
    return data.filter((p) => {
      if (filtrosAplicados.busqueda) {
        const termino = filtrosAplicados.busqueda.toLowerCase()
        const coincide =
          p.nombre.toLowerCase().includes(termino) || p.anio.toString().includes(termino)
        if (!coincide) return false
      }

      if (filtrosAplicados.estado !== 'activo' && !p.estado) return false
      if (filtrosAplicados.estado === 'inactivo' && p.estado) return false

      return true
    })
  }, [data, filtrosAplicados])

  const columns = useMemo<ColumnDef<PeriodoAcademico, unknown>[]>(
    () => [
      {
        accessorKey: 'nombre',
        header: 'Nombre',
        cell: ({ row }) => <p className="font-medium">{row.original.nombre}</p>,
      },
      {
        accessorKey: 'anio',
        header: 'Año',
        cell: ({ row }) => <span className="text-sm">{row.original.anio}</span>,
      },
      {
        accessorKey: 'fecha_inicio',
        header: 'Fecha Inicio',
        cell: ({ row }) => (
          <span className="text-sm text-muted-foreground">{row.original.fecha_inicio}</span>
        ),
      },
      {
        accessorKey: 'fecha_fin',
        header: 'Fecha Fin',
        cell: ({ row }) => (
          <span className="text-sm text-muted-foreground">{row.original.fecha_fin}</span>
        ),
      },
      {
        id: 'estado',
        header: 'Estado',
        cell: ({ row }) => (
          <Badge variant={row.original.estado ? 'default' : 'secondary'}>
            <span
              className={`mr-1.5 inline-block size-1.5 rounded-full ${row.original.estado ? 'bg-emerald-400' : 'bg-gray-400'}`}
            />
            {row.original.estado ? 'Activa' : 'Inactiva'}
          </Badge>
        ),
      },
      {
        id: 'acciones',
        header: 'Acciones',
        cell: ({ row }) => {
          const periodo = row.original
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="size-8">
                  <MoreVertical className="size-4" />
                  <span className="sr-only">Acciones</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuItem onClick={() => onVerDetalle(periodo)}>
                  <Eye className="mr-2 size-4" />
                  Ver Detalles
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onEditar(periodo)}>
                  <Pencil className="mr-2 size-4" />
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onToggleEstado(periodo)}>
                  <Power className="mr-2 size-4" />
                  {periodo.estado ? 'Inhabilitar' : 'Habilitar'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
    ],
    [onEditar, onToggleEstado, onVerDetalle],
  )

  const aplicarFiltros = () => setFiltrosAplicados({ ...filtros })

  const limpiarFiltros = () => {
    const limpio: PeriodoFiltros = { busqueda: '', estado: 'todos' }
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
                placeholder="Buscar periodo..."
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
                    estado: v as PeriodoFiltros['estado'],
                  }))
                }
              >
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Seleccionar Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="activo">Activo</SelectItem>
                  <SelectItem value="inactivo">Inactivo</SelectItem>
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
          <CardTitle className="text-lg">Lista de Periodos</CardTitle>
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
            pageSize={4}
            entityName="periodos"
            emptyMessage={
              hayFiltrosActivos
                ? 'No se encontraron resultados con los filtros aplicados.'
                : 'No hay periodos académicos registrados.'
            }
          />
        </CardContent>
      </Card>
    </div>
  )
}
