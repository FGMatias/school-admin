import { z } from 'zod'

export const sucursalSchema = z.object({
  nombre: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres'),
  direccion: z
    .string()
    .max(200, 'La dirección no puede exceder 200 caracteres')
    .optional()
    .default(''),
})

export type SucursalFormValues = z.infer<typeof sucursalSchema>

export const asignarAdminSchema = z.object({
  nombre: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede exceder 50 caracteres'),
  apellido: z
    .string()
    .min(2, 'El apellido debe tener al menos 2 caracteres')
    .max(50, 'El apellido no puede exceder 50 caracteres'),
  correo: z
    .string()
    .email('Ingresa un correo electrónico válido')
    .max(100, 'El correo no puede exceder 100 caracteres'),
})

export type AsignarAdminFormValues = z.infer<typeof asignarAdminSchema>
