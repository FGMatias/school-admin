import { z } from 'zod'

export const conceptoPagoSchema = z.object({
  nombre: z
    .string()
    .min(1, 'El nombre es obligatorio')
    .max(100, 'El nombre no puede exceder 100 caracteres'),
  descripcion: z.string().max(255, 'La descripción no puede exceder 255 caracteres').optional(),
  monto: z.number().min(0, 'El monto debe ser un número positivo'),
  es_mensual: z.boolean({
    required_error: 'Debes indicar si es recurrente',
  }),
})

export type ConceptoPagoFormValues = z.infer<typeof conceptoPagoSchema>
