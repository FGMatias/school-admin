import { z } from 'zod'

export const seccionSchema = z.object({
  id_sucursal: z.number({
    required_error: 'Por favor seleccione una sucursal',
    invalid_type_error: 'La sucursal no es válida',
  }),
  nombre: z
    .string()
    .min(1, 'El nombre es obligatorio')
    .max(50, 'El nombre no puede exceder 50 caracteres'),
  capacidad: z
    .number({
      required_error: 'La capacidad es obligatoria',
      invalid_type_error: 'Ingresa un número válido',
    })
    .int('La capacidad debe ser un número entero')
    .min(1, 'La capacidad mínima es 1')
    .max(200, 'La capacidad máxima es 200'),
})

export type SeccionFormValues = z.infer<typeof seccionSchema>
