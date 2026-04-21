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
import { DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  useCrearAdminSucursal,
  useCrearSucursal,
  useEditarSucursal,
  useResetPasswordAdmin,
  useSucursales,
  useToggleEstadoSucursal,
} from '@/hooks/queries/useSucursal'
import type { AsignarAdminFormValues, SucursalFormValues } from '@/schemas/sucursal.schema'
import type { SucursalConAdmin } from '@/types/sucursal.types'
import { Building2, Eye, Loader2, Pencil, Plus, Power, UserPlus, Users } from 'lucide-react'
import { useState } from 'react'

export function SucursalPage() {
  const { data: sucursales = [], isLoading, isError } = useSucursales()
  const crearSucursal = useCrearSucursal()
  const editarSucursal = useEditarSucursal()
  const cambiarEstado = useToggleEstadoSucursal()
  const crearAdminSucursal = useCrearAdminSucursal()
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
  const [estadoFiltro, setEstadoFiltro] = useState<string>('todos')

  const sucursalesFiltradas =
    estadoFiltro === 'todos'
      ? sucursales
      : sucursales.filter((s) => (estadoFiltro === 'activo' ? s.estado : !s.estado))

  const handleCrear = () => {
    setSucursalEditar(null)
    setFormOpen(true)
  }

  const handleEditar = (sucursal: SucursalConAdmin) => {
    setSucursalEditar(sucursal)
    setFormOpen(true)
  }

  const handleVerDetalle = (sucursal: SucursalConAdmin) => {
    setSucursalDetalle(sucursal)
    setDetalleOpen(true)
  }

  const handleFormSubmit = (values: SucursalFormValues) => {
    if (sucursalEditar) {
      editarSucursal.mutate(
        { id: sucursalEditar.id, values },
        { onSuccess: () => setFormOpen(false) },
      )
    } else {
      crearSucursal.mutate({ values }, { onSuccess: () => setFormOpen(false) })
    }
  }

  const confirmarToggle = () => {
    if (!confirmToggle) return
    cambiarEstado.mutate(
      { id: confirmToggle.id, estado: !confirmToggle.estado },
      { onSuccess: () => setConfirmToggle(null) },
    )
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

  const handleAsignarAdminSubmit = (values: AsignarAdminFormValues) => {
    if (!sucursalParaAdmin) return
    crearAdminSucursal.mutate(
      { idSucursal: sucursalParaAdmin.id, values },
      { onSuccess: () => setAsignarAdminOpen(false) },
    )
  }

  const handleResetPassword = (idUsuario: string) => {
    resetPassword.mutate({ idUsuario })
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
        data={sucursalesFiltradas}
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
        renderActions={(sucursal) => (
          <>
            <DropdownMenuItem onClick={() => handleVerDetalle(sucursal)}>
              <Eye className="mr-2 size-4" /> Ver Detalles
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleEditar(sucursal)}>
              <Pencil className="mr-2 size-4" /> Editar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setConfirmToggle(sucursal)}>
              <Power className="mr-2 size-4" /> {sucursal.estado ? 'Inhabilitar' : 'Habilitar'}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleAsignarAdmin(sucursal)}>
              {sucursal.administrador ? (
                <>
                  <Users className="mr-2 size-4" /> Ver Administrador
                </>
              ) : (
                <>
                  <UserPlus className="mr-2 size-4" /> Asignar Administrador
                </>
              )}
            </DropdownMenuItem>
          </>
        )}
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
        isPending={crearAdminSucursal.isPending}
      />

      <VerAdminModal
        open={!!verAdminOpen}
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
