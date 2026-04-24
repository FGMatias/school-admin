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
import { formatDate, formatDateTime } from '@/lib/utils'
import { type PeriodoAcademico } from '@/types/periodo.types'
import { CalendarDays, CalendarRange, Loader2 } from 'lucide-react'

function getDuracionMeses(inicio: string, fin: string): number {
  const d1 = new Date(inicio)
  const d2 = new Date(fin)
  return Math.round((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24 * 30))
}

interface VerDetallePeriodoModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  periodo: PeriodoAcademico | null
}

export function VerDetallePeriodoModal({
  open,
  onOpenChange,
  periodo,
}: VerDetallePeriodoModalProps) {
  const duracion = periodo ? getDuracionMeses(periodo.fecha_inicio, periodo.fecha_fin) : 0

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Detalles del Periodo</DialogTitle>
        </DialogHeader>

        {periodo ? (
          <div className="space-y-5">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <CalendarDays className="size-4" />
                Información General
              </div>

              <div className="rounded-lg border p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-base font-semibold">{periodo.nombre}</p>
                    <p className="text-sm text-muted-foreground">Año {periodo.anio}</p>
                  </div>
                  <StatusBadge isActive={periodo.estado as boolean} />
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Fecha Inicio</p>
                    <p className="font-medium">{formatDate(periodo.fecha_inicio)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Fecha Fin</p>
                    <p className="font-medium">{formatDate(periodo.fecha_fin)}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <CalendarRange className="size-4" />
                Duración
              </div>

              <div className="rounded-lg border p-4">
                <p className="text-sm">
                  Este periodo tiene una duración aproximada de{' '}
                  <span className="font-semibold">
                    {duracion} {duracion === 1 ? 'mes' : 'meses'}
                  </span>
                  .
                </p>
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm border-t pt-3">
                  <div>
                    <p className="text-muted-foreground">Creado</p>
                    <p className="font-medium">{formatDateTime(periodo.created_at)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Última actualización</p>
                    <p className="font-medium">{formatDateTime(periodo.updated_at)}</p>
                  </div>
                </div>
              </div>
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
