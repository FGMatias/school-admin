import { Building2, Loader2, Plus } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import {
  AsignarAdminModal,
  SucursalForm,
  SucursalTable,
  VerAdminModal,
  VerDetalleSucursalModal,
} from '@/components/features/sucursal'
import { ConfirmDialog } from '@/components/shared/ConfirmDialog'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/button'
import {
  useCrearAdminSucursal,
  useCrearSucursal,
  useEditarSucursal,
  useResetPasswordAdmin,
  useSucursal,
  useToggleEstadoSucursal,
} from '@/hooks/queries/useSucursal'
import type {
  AsignarAdminFormValues,
  SucursalConAdmin,
  SucursalFormValues,
} from '@/types/sucursal.types'

export default function SucursalesPage() {
  const { data: sucursales = [], isLoading, isError } = useSucursal()
  const crearSucursal = useCrearSucursal()
  const editarSucursal = useEditarSucursal()
  const toggleEstado = useToggleEstadoSucursal()
  const crearAdmin = useCrearAdminSucursal()
  const resetPassword = useResetPasswordAdmin()
  const [formOpen, setFormOpen] = useState(false)
  const [sucursalEditar, setSucursalEditar] = useState<SucursalConAdmin | null>(null)
  const [asignarAdminOpen, setAsignarAdminOpen] = useState(false)
  const [sucursalParaAdmin, setSucursalParaAdmin] = useState<SucursalConAdmin | null>(null)
  const [verAdminOpen, setVerAdminOpen] = useState(false)
  const [adminParaVer, setAdminParaVer] = useState<SucursalConAdmin | null>(null)
  const [detalleOpen, setDetalleOpen] = useState(false)
  const [sucursalDetalle, setSucursalDetalle] = useState<SucursalConAdmin | null>(null)

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
    if (sucursal.administrador) {
      setAdminParaVer(sucursal)
      setVerAdminOpen(true)
    } else {
      setSucursalParaAdmin(sucursal)
      setAsignarAdminOpen(true)
    }
  }

  const handleAsignarAdminSubmit = async (values: AsignarAdminFormValues) => {
    if (!sucursalParaAdmin) return
    try {
      await crearAdmin.mutateAsync({
        idSucursal: sucursalParaAdmin.id,
        values,
      })
      setAsignarAdminOpen(false)
      toast.success(
        `${values.nombre} ${values.apellido} asignado como administrador de "${sucursalParaAdmin.nombre}". La contraseña por defecto es: admin123!`,
      )
    } catch (err: any) {
      const msg = err?.message ?? ''
      if (msg.includes('ya está registrado')) {
        toast.error(`El correo ${values.correo} ya está registrado en el sistema`)
      } else {
        toast.error('Error al crear el administrador')
      }
    }
  }

  const handleResetPassword = async (idUsuario: string) => {
    try {
      await resetPassword.mutateAsync(idUsuario)
      toast.success('Contraseña restablecida a: admin123!')
    } catch {
      toast.error('Error al restablecer la contraseña')
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
        onToggleEstado={setConfirmToggle}
        onAsignarAdmin={handleAsignarAdmin}
        onVerDetalle={(s) => {
          setSucursalDetalle(s)
          setDetalleOpen(true)
        }}
      />

      <SucursalForm
        open={formOpen}
        onOpenChange={setFormOpen}
        sucursal={sucursalEditar}
        onSubmit={handleFormSubmit}
        isPending={crearSucursal.isPending || editarSucursal.isPending}
      />

      <AsignarAdminModal
        open={asignarAdminOpen}
        onOpenChange={setAsignarAdminOpen}
        onSubmit={handleAsignarAdminSubmit}
        isPending={crearAdmin.isPending}
      />

      <VerAdminModal
        open={verAdminOpen}
        onOpenChange={setVerAdminOpen}
        admin={adminParaVer?.administrador ?? null}
        onResetPassword={handleResetPassword}
        isResetting={resetPassword.isPending}
      />

      <VerDetalleSucursalModal
        open={detalleOpen}
        onOpenChange={setDetalleOpen}
        sucursal={sucursalDetalle}
      />

      <ConfirmDialog
        open={!!confirmToggle}
        onOpenChange={(open) => !open && setConfirmToggle(null)}
        title={confirmToggle?.estado ? 'Inhabilitar Sucursal' : 'Habilitar Sucursal'}
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
