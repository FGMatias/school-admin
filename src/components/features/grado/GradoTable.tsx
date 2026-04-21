import { DataTable } from '@/components/shared/DataTable'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { Grado } from '@/types/grado.types'
import type { ColumnDef } from '@tanstack/react-table'
import { MoreVertical } from 'lucide-react'
import React, { useMemo } from 'react'

interface GradoTableProps {
  data: Grado[]
  isLoading?: boolean
  renderActions?: (grado: Grado) => React.ReactNode
  filterSlot?: React.ReactNode
}

export function GradoTable({ data, isLoading, renderActions, filterSlot }: GradoTableProps) {
  const columns = useMemo<ColumnDef<Grado>[]>(
    () => [
      {
        accessorKey: 'nombre',
        header: 'Nombre',
        cell: ({ row }) => <p className="font-medium">{row.original.nombre}</p>,
      },
      {
        accessorKey: 'nivel',
        header: 'Nivel',
        cell: ({ row }) => <span className="text-sm">{row.original.nivel}</span>,
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
      searchPlaceholder="Filtrar grados..."
      filterSlot={filterSlot}
    />
  )
}
