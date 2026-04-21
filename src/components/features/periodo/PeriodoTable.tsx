import { DataTable } from '@/components/shared/DataTable'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { type PeriodoAcademico } from '@/types/periodo.types'
import type { ColumnDef } from '@tanstack/react-table'
import { MoreVertical } from 'lucide-react'
import React, { useMemo } from 'react'

interface PeriodoTableProps {
  data: PeriodoAcademico[]
  isLoading?: boolean
  renderActions?: (periodo: PeriodoAcademico) => React.ReactNode
  filterSlot?: React.ReactNode
}

export function PeriodoTable({ data, isLoading, renderActions, filterSlot }: PeriodoTableProps) {
  const columns = useMemo<ColumnDef<PeriodoAcademico>[]>(
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
        accessorKey: 'estado',
        header: 'Estado',
        cell: ({ getValue }) => <StatusBadge isActive={getValue() as boolean} />,
      },
      {
        id: 'actions',
        header: 'Acciones',
        cell: ({ row }) => {
          if (!renderActions) return null

          return (
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
          )
        },
      },
    ],
    [renderActions],
  )

  return (
    <DataTable
      columns={columns}
      data={data}
      isLoading={isLoading}
      searchPlaceholder="Filtrar periodos..."
      filterSlot={filterSlot}
    />
  )
}
