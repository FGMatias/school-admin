import {
  ConceptoPagoForm,
  ConceptoPagoTable,
  VerDetalleConceptoPagoModal,
} from '@/components/features/concepto_pago'
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
  useCambiarEstadoConceptoPago,
  useConceptosPago,
  useCrearConceptoPago,
  useEditarConceptoPago,
} from '@/hooks/queries/useConceptoPago'
import type { ConceptoPagoFormValues } from '@/schemas/concepto_pago.schema'
import type { ConceptoPago } from '@/types/concepto_pago.types'
import { Eye, Loader2, Pencil, Plus, Receipt, ShieldCheck, ShieldOff } from 'lucide-react'
import { useState } from 'react'

export function ConceptoPagoPage() {
  const { data: conceptos = [], isLoading, isError } = useConceptosPago()
  const crearConcepto = useCrearConceptoPago()
  const editarConcepto = useEditarConceptoPago()
  const cambiarEstado = useCambiarEstadoConceptoPago()
  const [formOpen, setFormOpen] = useState(false)
  const [conceptoSeleccionado, setConceptoSeleccionado] = useState<ConceptoPago | null>(null)
  const [abrirDetalle, setAbrirDetalle] = useState(false)
  const [conceptoDetalle, setConceptoDetalle] = useState<ConceptoPago | null>(null)
  const [confirmToggle, setConfirmToggle] = useState<ConceptoPago | null>(null)
  const [estadoFiltro, setEstadoFiltro] = useState<string>('todos')

  const conceptosFiltrados =
    estadoFiltro === 'todos'
      ? conceptos
      : conceptos.filter((c) => (estadoFiltro === 'activo' ? c.estado : !c.estado))

  const handleCrear = () => {
    setConceptoSeleccionado(null)
    setFormOpen(true)
  }

  const handleEditar = (concepto: ConceptoPago) => {
    setConceptoSeleccionado(concepto)
    setFormOpen(true)
  }

  const handleDetalle = (concepto: ConceptoPago) => {
    setConceptoDetalle(concepto)
    setAbrirDetalle(true)
  }

  const handleFormSubmit = (values: ConceptoPagoFormValues) => {
    if (conceptoSeleccionado) {
      editarConcepto.mutate(
        { id: conceptoSeleccionado.id, values },
        { onSuccess: () => setFormOpen(false) },
      )
      return
    }

    crearConcepto.mutate({ values }, { onSuccess: () => setFormOpen(false) })
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
        <Receipt className="size-10 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          Error al cargar los periodos. Intenta recargar la página.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Gestión de Tarifas"
        description="Administra los precios, matrículas y conceptos de cobro del colegio."
        action={
          <Button onClick={handleCrear}>
            <Plus className="mr-2 size-4" />
            Nueva Tarifa
          </Button>
        }
      />

      <ConceptoPagoTable
        data={conceptosFiltrados}
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
        renderActions={(concepto) => (
          <>
            <DropdownMenuItem onClick={() => handleDetalle(concepto)}>
              <Eye className="mr-2 size-4" /> Ver Detalles
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleEditar(concepto)}>
              <Pencil className="mr-2 size-4" /> Editar
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setConfirmToggle(concepto)}>
              {concepto.estado ? (
                <>
                  <ShieldOff className="mr-2 size-4 text-destructive" /> Inhabilitar
                </>
              ) : (
                <>
                  <ShieldCheck className="mr-2 size-4" /> Habilitar
                </>
              )}
            </DropdownMenuItem>
          </>
        )}
      />

      <ConceptoPagoForm
        open={formOpen}
        onOpenChange={setFormOpen}
        concepto={conceptoSeleccionado}
        onSubmit={handleFormSubmit}
        isPending={crearConcepto.isPending || editarConcepto.isPending}
      />

      <VerDetalleConceptoPagoModal
        open={abrirDetalle}
        onOpenChange={setAbrirDetalle}
        concepto={conceptoDetalle}
      />

      <ConfirmDialog
        open={!!confirmToggle}
        onOpenChange={(open) => !open && setConfirmToggle(null)}
        title={confirmToggle?.estado ? 'Inhabilitar Tarifa' : 'Habilitar Tarifa'}
        description={
          confirmToggle?.estado
            ? `¿Estás seguro de inhabilitar "${confirmToggle?.nombre}"?`
            : `¿Deseas habilitar "${confirmToggle?.nombre}"?`
        }
        confirmText={confirmToggle?.estado ? 'Inhabilitar' : 'Habilitar'}
        onConfirm={confirmarToggle}
        variant={confirmToggle?.estado ? 'destructive' : 'default'}
      />
    </div>
  )
}
