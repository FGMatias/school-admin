import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { periodoSchema, type PeriodoFormValues } from '@/schemas/periodo.schema'
import type { PeriodoAcademico } from '@/types/periodo.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { format, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'
import { CalendarIcon, Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

interface PeriodoFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  periodo: PeriodoAcademico | null
  onSubmit: (values: PeriodoFormValues) => void
  isPending: boolean
}

export function PeriodoForm({
  open,
  onOpenChange,
  periodo,
  onSubmit,
  isPending,
}: PeriodoFormProps) {
  const isEditing = !!periodo

  const [openInicio, setOpenInicio] = useState(false)
  const [openFin, setOpenFin] = useState(false)

  const form = useForm<PeriodoFormValues>({
    resolver: zodResolver(periodoSchema),
    defaultValues: {
      nombre: '',
      anio: new Date().getFullYear(),
      fecha_inicio: '',
      fecha_fin: '',
    },
  })

  useEffect(() => {
    if (open) {
      form.reset({
        nombre: periodo?.nombre ?? '',
        anio: periodo?.anio ?? new Date().getFullYear(),
        fecha_inicio: periodo?.fecha_inicio ?? '',
        fecha_fin: periodo?.fecha_fin ?? '',
      })
    }
  }, [open, periodo, form])

  const currentYear = new Date().getFullYear()
  const fromYear = currentYear - 5
  const toYear = currentYear + 10

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Editar Periodo' : 'Nuevo Periodo'}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? 'Modifica los datos del periodo académico.'
              : 'Ingresa los datos del nuevo periodo académico.'}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre *</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej. Primer Semestre 2024" autoFocus {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="anio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Año *</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Ej. 2024"
                      min={fromYear}
                      max={toYear}
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="fecha_inicio"
                render={({ field }) => (
                  <FormItem className="flex flex-col justify-end">
                    <FormLabel>Fecha Inicio *</FormLabel>
                    <Popover open={openInicio} onOpenChange={setOpenInicio}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              'w-full pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground',
                            )}
                          >
                            {field.value ? (
                              format(parseISO(field.value), 'PPP', { locale: es })
                            ) : (
                              <span>Selecciona una fecha</span>
                            )}
                            <CalendarIcon className="ml-auto size-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          locale={es}
                          selected={field.value ? parseISO(field.value) : undefined}
                          defaultMonth={field.value ? parseISO(field.value) : undefined}
                          onSelect={(date) => {
                            field.onChange(date ? format(date, 'yyyy-MM-dd') : '')
                            setOpenInicio(false)
                          }}
                          captionLayout="dropdown"
                          fromYear={fromYear}
                          toYear={toYear}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fecha_fin"
                render={({ field }) => (
                  <FormItem className="flex flex-col justify-end">
                    <FormLabel>Fecha Fin *</FormLabel>
                    <Popover open={openFin} onOpenChange={setOpenFin}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              'w-full pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground',
                            )}
                          >
                            {field.value ? (
                              format(parseISO(field.value), 'PPP', { locale: es })
                            ) : (
                              <span>Selecciona una fecha</span>
                            )}
                            <CalendarIcon className="ml-auto size-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          locale={es}
                          selected={field.value ? parseISO(field.value) : undefined}
                          defaultMonth={field.value ? parseISO(field.value) : undefined}
                          onSelect={(date) => {
                            field.onChange(date ? format(date, 'yyyy-MM-dd') : '')
                            setOpenFin(false)
                          }}
                          captionLayout="dropdown"
                          fromYear={fromYear}
                          toYear={toYear}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isPending}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
                {isEditing ? 'Guardar Cambios' : 'Crear Periodo'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
