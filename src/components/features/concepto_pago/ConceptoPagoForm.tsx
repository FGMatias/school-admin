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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { conceptoPagoSchema, type ConceptoPagoFormValues } from '@/schemas/concepto_pago.schema'
import type { ConceptoPago } from '@/types/concepto_pago.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { CircleHelp, Loader2 } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

interface ConceptoPagoFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  concepto: ConceptoPago | null
  onSubmit: (values: ConceptoPagoFormValues) => void
  isPending: boolean
}

export function ConceptoPagoForm({
  open,
  onOpenChange,
  concepto,
  onSubmit,
  isPending,
}: ConceptoPagoFormProps) {
  const isEditing = !!concepto

  const form = useForm<ConceptoPagoFormValues>({
    resolver: zodResolver(conceptoPagoSchema),
    defaultValues: {
      nombre: '',
      descripcion: '',
      monto: 0,
      es_mensual: undefined,
    },
  })

  useEffect(() => {
    if (open) {
      form.reset({
        nombre: concepto?.nombre ?? '',
        descripcion: concepto?.descripcion ?? '',
        monto: concepto?.monto ?? 0,
        es_mensual: concepto?.es_mensual ?? undefined,
      })
    }
  }, [open, concepto, form])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Editar Tarifa' : 'Nueva Tarifa'}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? 'Modifica los datos de la tarifa.'
              : 'Ingresa los datos de la nueva tarifa.'}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 py-2">
            <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Nombre <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Ej. Matrícula" autoFocus {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="descripcion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Descripción <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Detalles de la tarifa..."
                      className="resize-none"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="monto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Monto <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground font-medium">
                        $
                      </span>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        className="pl-7"
                        {...field}
                        onChange={(e) => {
                          const val = e.target.value
                          field.onChange(val === '' ? 0 : Number(val))
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="es_mensual"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    ¿Es recurrente (mensual)? <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(val) => field.onChange(val === 'true')}
                      value={field.value !== undefined ? field.value.toString() : undefined}
                      className="flex flex-col gap-2"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0 rounded-lg border p-3 hover:bg-accent/50 transition-colors cursor-pointer">
                        <FormControl>
                          <RadioGroupItem value="true" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer flex-1">
                          Sí - Se cobra cada mes
                        </FormLabel>
                      </FormItem>

                      <FormItem className="flex items-center space-x-3 space-y-0 rounded-lg border p-3 hover:bg-accent/50 transition-colors cursor-pointer">
                        <FormControl>
                          <RadioGroupItem value="false" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer flex-1">
                          No - Se cobra una sola vez
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3 bg-blue-50/50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-100 dark:border-blue-800/50 text-blue-800 dark:text-blue-200 text-sm mt-2">
              <CircleHelp className="size-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <p className="leading-tight pt-0.5">
                Si es recurrente, al matricular se generan cobros de marzo a diciembre.
              </p>
            </div>

            <DialogFooter className="pt-4 border-t mt-6">
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
                Guardar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
