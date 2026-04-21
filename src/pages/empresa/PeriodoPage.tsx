import { PeriodoForm, PeriodoTable, VerDetallePeriodoModal } from '@/components/features/periodo'
import { ConfirmDialog } from '@/components/shared/ConfirmDialog'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/button'
import { DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  useCrearPeriodo,
  useEditarPeriodo,
  usePeriodos,
  useToggleEstadoPeriodo,
} from '@/hooks/queries/usePeriodo'
import type { PeriodoFormValues } from '@/schemas/periodo.schema'
import type { PeriodoAcademico } from '@/types/periodo.types'
import { CalendarDays, Eye, Loader2, Pencil, Plus, Power } from 'lucide-react'
import { useState } from 'react'

export function PeriodosPage() {
  const { data: periodos = [], isLoading, isError } = usePeriodos()
  const crearPeriodo = useCrearPeriodo()
  const editarPeriodo = useEditarPeriodo()
  const cambiarEstado = useToggleEstadoPeriodo()
  const [formOpen, setFormOpen] = useState(false)
  const [periodoEditar, setPeriodoEditar] = useState<PeriodoAcademico | null>(null)
  const [detalleOpen, setDetalleOpen] = useState(false)
  const [periodoDetalle, setPeriodoDetalle] = useState<PeriodoAcademico | null>(null)
  const [confirmToggle, setConfirmToggle] = useState<PeriodoAcademico | null>(null)

  const [estadoFiltro, setEstadoFiltro] = useState<string>('todos')

  const periodosFiltrados =
    estadoFiltro === 'todos'
      ? periodos
      : periodos.filter((p) => (estadoFiltro === 'activo' ? p.estado : !p.estado))

  const handleCrear = () => {
    setPeriodoEditar(null)
    setFormOpen(true)
  }

  const handleEditar = (periodo: PeriodoAcademico) => {
    setPeriodoEditar(periodo)
    setFormOpen(true)
  }

  const handleDetalle = (periodo: PeriodoAcademico) => {
    setPeriodoDetalle(periodo)
    setDetalleOpen(true)
  }

  const handleFormSubmit = (values: PeriodoFormValues) => {
    if (periodoEditar) {
      editarPeriodo.mutate(
        { id: periodoEditar.id, values },
        { onSuccess: () => setFormOpen(false) },
      )
    } else {
      crearPeriodo.mutate({ values }, { onSuccess: () => setFormOpen(false) })
    }
  }

  const confirmarToggle = () => {
    if (!confirmToggle) return

    cambiarEstado.mutate(
      { id: confirmToggle.id, estado: !confirmToggle.estado },
      { onSuccess: () => setConfirmToggle(null) },
    )
  }

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-2 text-center">
        <CalendarDays className="size-10 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          Error al cargar los periodos. Intenta recargar la página.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Gestión de Periodos Académicos"
        description="Configura y administra los ciclos escolares y sus fechas."
        action={
          <Button onClick={handleCrear}>
            <Plus className="mr-2 size-4" />
            Nuevo Periodo
          </Button>
        }
      />

      <PeriodoTable
        data={periodosFiltrados}
        isLoading={isLoading}
        filterSlot={
          <Select value={estadoFiltro} onValueChange={setEstadoFiltro}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="activo">Activo</SelectItem>
              <SelectItem value="inactivo">Inactivo</SelectItem>
            </SelectContent>
          </Select>
        }
        renderActions={(periodo) => (
          <>
            <DropdownMenuItem onClick={() => handleDetalle(periodo)}>
              <Eye className="mr-2 size-4" /> Ver Detalles
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleEditar(periodo)}>
              <Pencil className="mr-2 size-4" /> Editar
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setConfirmToggle(periodo)}>
              <Power className="mr-2 size-4" /> {periodo.estado ? 'Inhabilitar' : 'Habilitar'}
            </DropdownMenuItem>
          </>
        )}
      />

      <PeriodoForm
        open={formOpen}
        onOpenChange={setFormOpen}
        periodo={periodoEditar}
        onSubmit={handleFormSubmit}
        isPending={crearPeriodo.isPending || editarPeriodo.isPending}
      />

      <VerDetallePeriodoModal
        open={detalleOpen}
        onOpenChange={setDetalleOpen}
        periodo={periodoDetalle}
      />

      <ConfirmDialog
        open={!!confirmToggle}
        onOpenChange={(open) => !open && setConfirmToggle(null)}
        title={confirmToggle?.estado ? 'Inhabilitar Periodo' : 'Habilitar Periodo'}
        description={
          confirmToggle?.estado
            ? `¿Estás seguro de inhabilitar "${confirmToggle?.nombre}"?`
            : `¿Deseas habilitar nuevamente "${confirmToggle?.nombre}"?`
        }
        confirmText={confirmToggle?.estado ? 'Inhabilitar' : 'Habilitar'}
        onConfirm={confirmarToggle}
        variant={confirmToggle?.estado ? 'destructive' : 'default'}
      />
    </div>
  )
}
