import { StatusBadge } from '@/components/shared/StatusBadge'
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
import { formatDateTime, formatMoney } from '@/lib/utils'
import type { ConceptoPago } from '@/types/concepto_pago.types'
import { CalendarDays, Loader2, Receipt } from 'lucide-react'

interface VerDetalleConceptoPagoModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  concepto: ConceptoPago | null
}

export function VerDetalleConceptoPagoModal({
  open,
  onOpenChange,
  concepto,
}: VerDetalleConceptoPagoModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Detalles de la Tarifa</DialogTitle>
        </DialogHeader>

        {concepto ? (
          <div className="space-y-5 py-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Receipt className="size-4" />
                Información de Cobro
              </div>

              <div className="rounded-lg border bg-card p-4 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-base font-bold text-foreground leading-none">
                      {concepto.nombre}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {concepto.descripcion || 'Sin descripción adicional'}
                    </p>
                  </div>
                  <StatusBadge isActive={concepto.estado as boolean} />
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4 border-t pt-4">
                  <div>
                    <p className="text-xs font-bold tracking-wider text-muted-foreground uppercase mb-1">
                      Monto a Cobrar
                    </p>
                    <p className="text-xl font-bold text-foreground">
                      {formatMoney(concepto.monto)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-wider text-muted-foreground uppercase mb-1">
                      Tipo de Cobro
                    </p>
                    <Badge variant="outline" className="font-medium bg-background">
                      {concepto.es_mensual ? 'Recurrente (Mensual)' : 'Pago Único'}
                    </Badge>
                  </div>
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
                      {formatDateTime(concepto.created_at)}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Última actualización</p>
                    <p className="font-medium text-foreground">
                      {formatDateTime(concepto.updated_at)}
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
