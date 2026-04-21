import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import type { SucursalConAdmin } from '@/types/sucursal.types'
import { Building2, Loader2, Mail, MapPin, UserCircle } from 'lucide-react'

interface VerDetalleSucursalModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  sucursal: SucursalConAdmin | null
}

export function VerDetalleSucursalModal({
  open,
  onOpenChange,
  sucursal,
}: VerDetalleSucursalModalProps) {
  const admin = sucursal?.administrador

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Detalles de la Sucursal</DialogTitle>
        </DialogHeader>

        {sucursal ? (
          <div className="space-y-5">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Building2 className="size-4" />
                Información General
              </div>

              <div className="rounded-lg border p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-base font-semibold">{sucursal.nombre}</p>
                    {sucursal.direccion && (
                      <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                        <MapPin className="size-3.5 shrink-0" />
                        <span>{sucursal.direccion}</span>
                      </div>
                    )}
                  </div>
                  <Badge variant={sucursal.estado ? 'default' : 'secondary'}>
                    <span
                      className={`mr-1.5 inline-block size-1.5 rounded-full ${
                        sucursal.estado ? 'bg-emerald-400' : 'bg-gray-400'
                      }`}
                    />
                    {sucursal.estado ? 'Activa' : 'Inactiva'}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Creada</p>
                    <p className="font-medium">
                      {new Date(sucursal.created_at).toLocaleDateString('es-PE', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Última actualización</p>
                    <p className="font-medium">
                      {new Date(sucursal.updated_at).toLocaleDateString('es-PE', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <UserCircle className="size-4" />
                Administrador Asignado
              </div>

              {admin ? (
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-base font-semibold text-primary ring-2 ring-primary/20">
                      {admin.nombre?.charAt(0) || ''}
                      {admin.apellido?.charAt(0) || ''}
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
              ) : (
                <div className="rounded-lg border border-dashed p-6 text-center">
                  <UserCircle className="mx-auto size-8 text-muted-foreground/50" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    No hay administrador asignado a esta sucursal.
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex justify-center p-8">
            <Loader2 className="size-8 animate-spin text-muted-foreground" />
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
