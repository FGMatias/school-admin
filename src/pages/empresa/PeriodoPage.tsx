import { PeriodoForm, PeriodoTable, VerDetallePeriodoModal } from '@/components/features/periodo'
import { ConfirmDialog } from '@/components/shared/ConfirmDialog'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/button'
import {
  useCrearPeriodo,
  useEditarPeriodo,
  usePeriodo,
  useToggleEstadoPeriodo,
} from '@/hooks/queries/usePeriodo'
import type { PeriodoAcademico, PeriodoFormValues } from '@/types/periodo.types'
import { CalendarDays, Loader2, Plus } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export default function PeriodosPage() {
  const { data: periodos = [], isLoading, isError } = usePeriodo()
  const crearPeriodo = useCrearPeriodo()
  const editarPeriodo = useEditarPeriodo()
  const toggleEstado = useToggleEstadoPeriodo()
  const [formOpen, setFormOpen] = useState(false)
  const [periodoEditar, setPeriodoEditar] = useState<PeriodoAcademico | null>(null)
  const [detalleOpen, setDetalleOpen] = useState(false)
  const [periodoDetalle, setPeriodoDetalle] = useState<PeriodoAcademico | null>(null)
  const [confirmToggle, setConfirmToggle] = useState<PeriodoAcademico | null>(null)

  const handleCrear = () => {
    setPeriodoEditar(null)
    setFormOpen(true)
  }

  const handleEditar = (periodo: PeriodoAcademico) => {
    setPeriodoEditar(periodo)
    setFormOpen(true)
  }

  const handleFormSubmit = async (values: PeriodoFormValues) => {
    try {
      if (periodoEditar) {
        await editarPeriodo.mutateAsync({ id: periodoEditar.id, values })
        toast.success('Periodo actualizado correctamente')
      } else {
        await crearPeriodo.mutateAsync(values)
        toast.success('Periodo creado correctamente')
      }
      setFormOpen(false)
    } catch {
      toast.error('Ocurrió un error. Intenta nuevamente.')
    }
  }

  const confirmarToggle = async () => {
    if (!confirmToggle) return
    try {
      await toggleEstado.mutateAsync({
        id: confirmToggle.id,
        estado: !confirmToggle.estado,
      })
      toast.success(
        confirmToggle.estado
          ? `"${confirmToggle.nombre}" inhabilitado`
          : `"${confirmToggle.nombre}" habilitado`,
      )
    } catch {
      toast.error('Error al cambiar el estado')
    } finally {
      setConfirmToggle(null)
    }
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
        data={periodos}
        onEditar={handleEditar}
        onToggleEstado={setConfirmToggle}
        onVerDetalle={(p) => {
          setPeriodoDetalle(p)
          setDetalleOpen(true)
        }}
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
