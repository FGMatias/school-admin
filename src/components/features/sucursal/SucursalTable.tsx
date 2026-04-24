import { DataTable } from '@/components/shared/DataTable'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { SucursalConAdmin } from '@/types/sucursal.types'
import type { ColumnDef } from '@tanstack/react-table'
import { MapPin, MoreVertical } from 'lucide-react'
import React, { useMemo } from 'react'

interface SucursalTableProps {
  data: SucursalConAdmin[]
  isLoading: boolean
  renderActions?: (sucursal: SucursalConAdmin) => React.ReactNode
  filterSlot?: React.ReactNode
}

export function SucursalTable({ data, isLoading, renderActions, filterSlot }: SucursalTableProps) {
  const columns = useMemo<ColumnDef<SucursalConAdmin>[]>(() => {
    const cols: ColumnDef<SucursalConAdmin>[] = [
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
          if (!admin)
            return <span className="text-sm text-muted-foreground italic">Sin asignar</span>

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
        cell: ({ getValue }) => <StatusBadge isActive={getValue() as boolean} />,
      },
    ]

    if (renderActions) {
      cols.push({
        id: 'actions',
        header: 'Acciones',
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8">
                <MoreVertical className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-auto">
              {renderActions(row.original)}
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      })
    }
    return cols
  }, [renderActions])

  return (
    <DataTable
      columns={columns}
      data={data}
      isLoading={isLoading}
      searchPlaceholder="Filtrar sucursales..."
      filterSlot={filterSlot}
    />
  )
}
