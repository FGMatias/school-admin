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
import { type PeriodoAcademico } from '@/types/periodo.types'
import { CalendarDays, CalendarRange } from 'lucide-react'

function formatDate(dateStr: string) {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('es-PE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

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
  if (!periodo) return null

  const duracion = getDuracionMeses(periodo.fecha_inicio, periodo.fecha_fin)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Detalles del Periodo</DialogTitle>
        </DialogHeader>

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
                <Badge variant={periodo.estado ? 'default' : 'secondary'}>
                  <span
                    className={`mr-1.5 inline-block size-1.5 rounded-full ${periodo.estado ? 'bg-emerald-400' : 'bg-gray-400'}`}
                  />
                  {periodo.estado ? 'Activa' : 'Inactiva'}
                </Badge>
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
              <div className="mt-2 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Creado</p>
                  <p className="font-medium">
                    {new Date(periodo.created_at).toLocaleDateString('es-PE', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Última actualización</p>
                  <p className="font-medium">
                    {new Date(periodo.updated_at).toLocaleDateString('es-PE', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
