import { DataTable } from '@/components/shared/DataTable'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { ConceptoPago } from '@/types/concepto_pago.types'
import type { ColumnDef } from '@tanstack/react-table'
import { MoreVertical } from 'lucide-react'
import React, { useMemo } from 'react'

interface ConceptoPagoTableProps {
  data: ConceptoPago[]
  isLoading?: boolean
  renderActions?: (concepto: ConceptoPago) => React.ReactNode
  filterSlot?: React.ReactNode
}

export function ConceptoPagoTable({
  data,
  isLoading,
  renderActions,
  filterSlot,
}: ConceptoPagoTableProps) {
  const columns = useMemo<ColumnDef<ConceptoPago>[]>(
    () => [
      {
        accessorKey: 'nombre',
        header: 'Nombre',
        cell: ({ row }) => <p className="font-medium">{row.original.nombre}</p>,
      },
      {
        accessorKey: 'descripcion',
        header: 'Descripción',
        cell: ({ row }) => <p className="text-sm">{row.original.descripcion}</p>,
      },
      {
        accessorKey: 'monto',
        header: 'Monto',
        cell: ({ row }) => <p className="font-medium">{row.original.monto}</p>,
      },
      {
        accessorKey: 'es_mensual',
        header: 'Recurrente',
        cell: ({ row }) => <p className="text-sm">{row.original.es_mensual ? 'Si' : 'No'}</p>,
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
      searchPlaceholder="Filtrar tarifas..."
      filterSlot={filterSlot}
    />
  )
}
