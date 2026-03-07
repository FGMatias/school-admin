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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { periodoSchema, type PeriodoFormValues } from '@/schemas/periodo.schema'
import type { PeriodoAcademico } from '@/types/periodo.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useEffect } from 'react'
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
                      min={2020}
                      max={2099}
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
                  <FormItem>
                    <FormLabel>Fecha Inicio *</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fecha_fin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha Fin *</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
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
