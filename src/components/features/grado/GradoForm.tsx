import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { NIVEL } from '@/constants/nivel'
import { gradoSchema, type GradoFormValues } from '@/schemas/grado.schema'
import type { Grado } from '@/types/grado.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

interface GradoFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  grado: Grado | null
  onSubmit: (values: GradoFormValues) => void
  isPending: boolean
}

export function GradoForm({ open, onOpenChange, grado, onSubmit, isPending }: GradoFormProps) {
  const isEditing = !!grado

  const form = useForm<GradoFormValues>({
    resolver: zodResolver(gradoSchema),
    defaultValues: {
      nombre: '',
      nivel: undefined,
    },
  })

  useEffect(() => {
    if (open) {
      form.reset({
        nombre: grado?.nombre ?? '',
        nivel: grado?.nivel ?? undefined,
      })
    }
  }, [open, grado, form])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Editar Grado' : 'Crear Grado'}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? 'Modifica los datos del grado académico.'
              : 'Ingresa los datos del nuevo grado académico.'}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Nombre <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Ej. Primer Grado" autoFocus {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nivel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Nivel Académico <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un nivel" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(NIVEL).map((nivelValor) => (
                        <SelectItem key={nivelValor} value={nivelValor}>
                          {nivelValor.charAt(0) + nivelValor.slice(1).toLowerCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

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
                {isEditing ? 'Guardar Cambios' : 'Crear Grado'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
