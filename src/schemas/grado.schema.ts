import { NIVEL } from '@/constants/nivel'
import { z } from 'zod'

export const gradoSchema = z.object({
  nombre: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede exceder 50 caracteres'),
  nivel: z.enum([NIVEL.INICIAL, NIVEL.PRIMARIA, NIVEL.SECUNDARIA], {
    required_error: 'Por facor selecciona un nivel académico',
    invalid_type_error: 'El nivel académico seleccionado no es válido',
  }),
})

export type GradoFormValues = z.infer<typeof gradoSchema>
