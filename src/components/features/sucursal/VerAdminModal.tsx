import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { AdminSucursal } from '@/types/sucursal.types'
import { KeyRound, Loader2, Mail } from 'lucide-react'

interface VerAdminModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  admin: AdminSucursal | null
  onResetPassword: (idUsuario: string) => void
  isResetting: boolean
}

export function VerAdminModal({
  open,
  onOpenChange,
  admin,
  onResetPassword,
  isResetting,
}: VerAdminModalProps) {
  if (!admin) return null

  const iniciales = `${admin.nombre.charAt(0)}${admin.apellido.charAt(0)}`

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Detalles del Administrador</DialogTitle>
        </DialogHeader>

        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-base font-semibold text-primary ring-2 ring-primary/20">
              {iniciales}
            </div>
            <div className="min-w-0 space-y-0.5">
              <p className="text-base font-semibold leading-tight">
                {admin.nombre} {admin.apellido}
              </p>
              <p className="text-sm text-muted-foreground">Administrador de Sede</p>
              {admin.correo && (
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Mail className="size-3.5 shrink-0" />
                  <span className="truncate">{admin.correo}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={() => onResetPassword(admin.id)}
            disabled={isResetting}
          >
            {isResetting ? (
              <Loader2 className="mr-2 size-4 animate-spin" />
            ) : (
              <KeyRound className="mr-2 size-4" />
            )}
            Restablecer Contraseña
          </Button>
          <Button onClick={() => onOpenChange(false)}>Cerrar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
