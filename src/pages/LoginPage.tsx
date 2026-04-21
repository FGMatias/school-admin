import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/hooks/useAuth'
import { AuthFormData, authSchema } from '@/schemas/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Loader2, Lock, Mail, ShieldCheck } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [authError, setAuthError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login, usuario } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  useEffect(() => {
    if (usuario) {
      navigate('/', { replace: true })
    }
  }, [usuario, navigate])

  const onSubmit = async (data: AuthFormData) => {
    setAuthError('')
    setLoading(true)

    try {
      await login(data.email, data.password)
      navigate('/', { replace: true })
    } catch (err) {
      console.error(err)
      setAuthError('Correo o contraseña incorrectos')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container relative hidden min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[380px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-3xl font-semibold tracking-tight">Bienvenido de nuevo</h1>
            <p className="text-sm text-muted-foreground">
              Ingresa tus credenciales para acceder al panel.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {authError && (
              <div className="rounded-md bg-destructive/15 p-3 text-sm font-medium text-destructive">
                {authError}
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@schooladmin.edu"
                    className="pl-9"
                    {...register('email')}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm font-medium text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="pl-9 pr-10"
                    {...register('password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm font-medium text-destructive">{errors.password.message}</p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <a href="#" className="text-sm font-medium text-primary hover:underline">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? 'Ingresando...' : 'Iniciar Sesión'}
            </Button>
          </form>

          <p className="px-8 text-center text-sm text-muted-foreground">
            ¿Problemas para acceder?{' '}
            <a href="#" className="underline underline-offset-4 hover:text-primary">
              Contactar a Soporte TI
            </a>
          </p>
        </div>
      </div>

      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-l">
        <div className="absolute inset-0 bg-slate-900" />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop')",
          }}
        />

        <div className="relative z-20 flex items-center text-lg font-medium">
          <ShieldCheck className="mr-2 h-6 w-6" />
          School Admin
        </div>

        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-4">
            <p className="text-2xl font-medium leading-relaxed">
              &ldquo;Gestión institucional inteligente. Plataforma integral para la administración
              académica, financiera y operativa.&rdquo;
            </p>
            <footer className="text-sm text-slate-300">
              Centralice sus datos y tome decisiones informadas de manera segura.
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  )
}
