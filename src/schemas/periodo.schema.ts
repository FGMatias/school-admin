import { z } from 'zod'

export const periodoSchema = z
  .object({
    nombre: z
      .string()
      .min(3, 'El nombre debe tener al menos 3 caracteres')
      .max(100, 'El nombre no puede exceder 100 caracteres'),
    anio: z
      .number({ invalid_type_error: 'Ingresa un año válido' })
      .int()
      .min(2026, 'El año debe ser 2026 o posterior')
      .max(2099, 'El año no puede ser mayor a 2099'),
    fecha_inicio: z.string().min(1, 'La fecha de inicio es obligatoria'),
    fecha_fin: z.string().min(1, 'La fecha de fin es obligatoria'),
  })
  .refine(
    (data) => {
      if (!data.fecha_inicio || !data.fecha_fin) return true
      return new Date(data.fecha_inicio) < new Date(data.fecha_fin)
    },
    {
      message: 'La fecha de inicio debe ser anterior a la fecha de fin',
      path: ['fecha_fin'],
    },
  )

export type PeriodoFormValues = z.infer<typeof periodoSchema>
