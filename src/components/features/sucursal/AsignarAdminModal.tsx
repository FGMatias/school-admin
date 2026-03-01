import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useAdminsDisponibles, useAsignarAdmin, useQuitarAdmin } from '@/hooks/queries/useSucursal'
import type { SucursalConAdmin } from '@/types/sucursal.types'
import { Loader2, UserPlus, UserX } from 'lucide-react'
import { useState } from 'react'

interface AsignarAdminModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  sucursal: SucursalConAdmin | null
}

export function AsignarAdminModal({ open, onOpenChange, sucursal }: AsignarAdminModalProps) {
  const [selectedUserId, setSelectedUserId] = useState<string>('')
  const { data: adminsDisponibles = [], isLoading: loadingAdmins } = useAdminsDisponibles()
  const asignarAdmin = useAsignarAdmin()
  const quitadAdmin = useQuitarAdmin()
  const adminActual = sucursal?.administrador
  const isPending = asignarAdmin.isPending || quitadAdmin.isPending

  const handleAsignar = async () => {
    if (!sucursal || !selectedUserId) return

    await asignarAdmin.mutateAsync({
      idSucursal: sucursal.id,
      idUsuario: selectedUserId,
    })

    setSelectedUserId('')
    onOpenChange(false)
  }

  const handleQuitar = async () => {
    if (!sucursal) return

    await quitadAdmin.mutateAsync(sucursal.id)
    onOpenChange(false)
  }

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) setSelectedUserId('')
    onOpenChange(isOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Administrador de Sucursal</DialogTitle>
          <DialogDescription>
            {sucursal
              ? `Gestion el administrador de "${sucursal.nombre}",`
              : 'Seleccione una sucursal.'}
          </DialogDescription>
        </DialogHeader>

        {sucursal && (
          <div className="space-y-4">
            {adminActual ? (
              <div className="rounded-lg border p-4">
                <p className="text-sm font-medium text-muted-foreground">Administrador actual</p>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                      {adminActual.nombre.charAt(0)}
                      {adminActual.apellido.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {adminActual.nombre} {adminActual.apellido}
                      </p>
                      <p className="text-xs text-muted-foreground">Administrador Sucursal</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={handleQuitar}
                    disabled={isPending}
                  >
                    {quitadAdmin.isPending ? (
                      <Loader2 className="mr-1 size-4 animate-spin" />
                    ) : (
                      <UserX className="mr-1 size-4" />
                    )}
                    Quitar
                  </Button>
                </div>
              </div>
            ) : (
              <div className="rounded-lg border border-dashed p-4 text-center text-sm text-muted-foreground">
                No hay administrador asignado
              </div>
            )}

            <div className="space-y-2">
              <p className="text-sm font-medium">
                {adminActual ? 'Reemplazar con' : 'Asignar Administrador'}
              </p>
              <Select
                value={selectedUserId}
                onValueChange={setSelectedUserId}
                disabled={loadingAdmins}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      loadingAdmins ? 'Cargando usuarios...' : 'Seleccionar administrador'
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {adminsDisponibles
                    .filter((u) => u.id !== adminActual?.id)
                    .map((u) => (
                      <SelectItem key={u.id} value={u.id}>
                        {u.nombre} {u.apellido}
                      </SelectItem>
                    ))}

                  {adminsDisponibles.filter((u) => u.id !== adminActual?.id).length === 0 && (
                    <div className="px-2 py-4 text-center text-sm text-muted-foreground">
                      No hay administradores disponibles
                    </div>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        <DialogFooter className="pt-2">
          <Button variant="outline" onClick={() => handleOpenChange(false)} disabled={isPending}>
            Cancelar
          </Button>
          <Button onClick={handleAsignar} disabled={!selectedUserId || isPending}>
            {asignarAdmin.isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
            <UserPlus className="mr-2 size-4" />
            Asignar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
