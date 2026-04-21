import { z } from 'zod'

export const authSchema = z.object({
  email: z.string().min(1, 'Ingresa el correo electrónico').email('Correo inválido'),
  password: z.string().min(1, 'La contraseña es obligatoria'),
})

export type AuthFormData = z.infer<typeof authSchema>
