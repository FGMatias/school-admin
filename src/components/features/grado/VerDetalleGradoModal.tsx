import { StatusBadge } from '@/components/shared/StatusBadge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { formatDateTime } from '@/lib/utils'
import type { Grado } from '@/types/grado.types'
import { CalendarDays, GraduationCap, Loader2 } from 'lucide-react'

interface VerDetalleGradoModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  grado: Grado | null
}

export function VerDetalleGradoModal({ open, onOpenChange, grado }: VerDetalleGradoModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Detalles del Grado</DialogTitle>
        </DialogHeader>

        {grado ? (
          <div className="space-y-5 py-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <GraduationCap className="size-4" />
                Información General
              </div>

              <div className="rounded-lg border bg-card p-4 space-y-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-base font-bold text-foreground">{grado.nombre}</p>
                    <p className="text-sm font-medium text-muted-foreground capitalize">
                      Nivel {grado.nivel.toLowerCase()}
                    </p>
                  </div>
                  <StatusBadge isActive={grado.estado as boolean} />
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <CalendarDays className="size-4" />
                Registro en el Sistema
              </div>

              <div className="rounded-lg border bg-card p-4 shadow-sm">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Fecha de creación</p>
                    <p className="font-medium text-foreground">
                      {formatDateTime(grado.created_at)}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Última actualización</p>
                    <p className="font-medium text-foreground">
                      {formatDateTime(grado.updated_at)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center py-8">
            <Loader2 className="size-8 animate-spin text-muted-foreground" />
          </div>
        )}

        <DialogFooter className="pt-2 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
