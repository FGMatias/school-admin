import { AsignarAdminModal, SucursalForm, SucursalTable } from '@/components/features/sucursal'
import { ConfirmDialog } from '@/components/shared/ConfirmDialog'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/button'
import {
  useCrearSucursal,
  useEditarSucursal,
  useSucursal,
  useToggleEstadoSucursal,
} from '@/hooks/queries/useSucursal'
import type { SucursalConAdmin, SucursalFormValues } from '@/types/sucursal.types'
import { Building2, Loader2, Plus } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export default function SucursalPage() {
  const { data: sucursales = [], isLoading, isError } = useSucursal()
  const crearSucursal = useCrearSucursal()
  const editarSucursal = useEditarSucursal()
  const toggleEstado = useToggleEstadoSucursal()
  const [formOpen, setFormOpen] = useState(false)
  const [sucursalEditar, setSucursalEditar] = useState<SucursalConAdmin | null>(null)
  const [adminModalOpen, setAdminModalOpen] = useState(false)
  const [sucursalAdmin, setSucursalAdmin] = useState<SucursalConAdmin | null>(null)
  const [confirmToggle, setConfirmToggle] = useState<SucursalConAdmin | null>(null)

  const handleCrear = () => {
    setSucursalEditar(null)
    setFormOpen(true)
  }

  const handleEditar = (sucursal: SucursalConAdmin) => {
    setSucursalEditar(sucursal)
    setFormOpen(true)
  }

  const handleFormSubmit = async (values: SucursalFormValues) => {
    try {
      if (sucursalEditar) {
        await editarSucursal.mutateAsync({ id: sucursalEditar.id, values })
        toast.success('Sucursal actualizada correctamente')
      } else {
        await crearSucursal.mutateAsync(values)
        toast.success('Sucursal creada correctamente')
      }
      setFormOpen(false)
    } catch {
      toast.error('Ocurrió un error. Intenta nuevamente.')
    }
  }

  const handleToggleEstado = (sucursal: SucursalConAdmin) => {
    setConfirmToggle(sucursal)
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
          ? `"${confirmToggle.nombre}" inhabilitada`
          : `"${confirmToggle.nombre}" habilitada`,
      )
    } catch {
      toast.error('Error al cambiar el estado')
    } finally {
      setConfirmToggle(null)
    }
  }

  const handleAsignarAdmin = (sucursal: SucursalConAdmin) => {
    setSucursalAdmin(sucursal)
    setAdminModalOpen(true)
  }

  const handleVerDetalle = (sucursal: SucursalConAdmin) => {
    setSucursalAdmin(sucursal)
    setAdminModalOpen(true)
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
        <Building2 className="size-10 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          Error al cargar las sucursales. Intenta recargar la página.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Gestión de Sucursales"
        description="Administra las ubicaciones y sedes del colegio."
        action={
          <Button onClick={handleCrear}>
            <Plus className="mr-2 size-4" />
            Crear Sucursal
          </Button>
        }
      />

      <SucursalTable
        data={sucursales}
        onEditar={handleEditar}
        onToggleEstado={handleToggleEstado}
        onAsignarAdmin={handleAsignarAdmin}
        onVerDetalle={handleVerDetalle}
      />

      <SucursalForm
        open={formOpen}
        onOpenChange={setFormOpen}
        sucursal={sucursalEditar}
        onSubmit={handleFormSubmit}
        isPending={crearSucursal.isPending || editarSucursal.isPending}
      />

      <AsignarAdminModal
        open={adminModalOpen}
        onOpenChange={setAdminModalOpen}
        sucursal={sucursalAdmin}
      />

      <ConfirmDialog
        open={!!confirmToggle}
        onOpenChange={(open) => !open && setConfirmToggle(null)}
        title={confirmToggle?.estado ? 'Inhabilitar Sucursal' : 'Habilitar Sucursal'}
        description={
          confirmToggle?.estado
            ? `¿Estás seguro de inhabilitar "${confirmToggle?.nombre}"? Los administradores de esta sucursal no podrán acceder al sistema.`
            : `¿Deseas habilitar nuevamente "${confirmToggle?.nombre}"?`
        }
        confirmText={confirmToggle?.estado ? 'Inhabilitar' : 'Habilitar'}
        onConfirm={confirmarToggle}
        variant={confirmToggle?.estado ? 'destructive' : 'default'}
      />
    </div>
  )
}
