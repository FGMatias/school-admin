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
import { sucursalSchema, type SucursalFormValues } from '@/schemas/sucursal.schema'
import type { SucursalConAdmin } from '@/types/sucursal.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

interface SucursalFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  sucursal: SucursalConAdmin | null
  onSubmit: (values: SucursalFormValues) => void
  isPending: boolean
}

export function SucursalForm({
  open,
  onOpenChange,
  sucursal,
  onSubmit,
  isPending,
}: SucursalFormProps) {
  const isEditing = !!sucursal

  const form = useForm<SucursalFormValues>({
    resolver: zodResolver(sucursalSchema),
    defaultValues: {
      nombre: '',
      direccion: '',
    },
  })

  useEffect(() => {
    if (open) {
      form.reset({
        nombre: sucursal?.nombre ?? '',
        direccion: sucursal?.direccion ?? '',
      })
    }
  }, [open, sucursal, form])

  const handleSubmit = (values: SucursalFormValues) => {
    onSubmit(values)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Editar Sucursal' : 'Crear Sucursal'}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? 'Modifica los datos de la sucursal.'
              : 'Ingresa los datos de la nueva sucursal.'}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre *</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej. Sede Central" autoFocus {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="direccion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dirección</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej. Av Brasil 123, Lima" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter className="pt-4">
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
                {isEditing ? 'Guardar' : 'Crear Sucursal'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
