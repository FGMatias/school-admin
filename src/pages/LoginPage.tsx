import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ROLES } from '@/constants/roles'
import { ROUTES } from '@/constants/routes'
import { useAuth } from '@/hooks/useAuth'
import { BarChart3, Eye, EyeOff, Loader2, Lock, Mail, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login, usuario } = useAuth()

  if (usuario) {
    console.log({ usuario })
    const to =
      usuario.rol.nombre === ROLES.ADMIN_EMPRESA
        ? ROUTES.EMPRESA.DASHBOARD
        : ROUTES.SUCURSAL.DASHBOARD
    return <Navigate to={to} replace />
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(email, password)
    } catch {
      setError('Correo o contraseña incorrectos')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-sa-background">
      <div className="relative z-20 flex h-full w-full flex-col bg-white shadow-xl lg:w-1/2 lg:shadow-none">
        <div className="flex min-h-0 flex-1 items-center justify-center px-8 lg:px-12 xl:px-16">
          <Card className="w-full max-w-md border-none bg-transparent shadow-none">
            <CardContent className="space-y-7 p-0">
              <div>
                <h2 className="font-display mb-3 text-3xl font-bold tracking-tight text-slate-900">
                  Bienvenido de nuevo
                </h2>
                <p className="leading-relaxed text-muted-foreground">
                  Ingresa tus credenciales para acceder al panel de administración.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold text-slate-700">
                    Correo Electrónico
                  </Label>
                  <div className="group relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 transition-colors group-focus-within:text-sa-primary">
                      <Mail size={18} />
                    </div>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 rounded-xl border-slate-200 bg-slate-50 pl-10 text-sm shadow-sm placeholder:text-slate-400 focus:border-sa-primary focus:bg-white focus:ring-sa-primary/10"
                      placeholder="admin@schooladmin.edu"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-semibold text-slate-700">
                    Contraseña
                  </Label>
                  <div className="group relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 transition-colors group-focus-within:text-sa-primary">
                      <Lock size={18} />
                    </div>
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 rounded-xl border-slate-200 bg-slate-50 pl-10 pr-11 text-sm shadow-sm placeholder:text-slate-400 focus:border-sa-primary focus:bg-white focus:ring-sa-primary/10"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 transition-colors hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input
                      id="remember-me"
                      type="checkbox"
                      className="h-4 w-4 cursor-pointer rounded border-slate-300 text-sa-primary focus:ring-sa-primary/20"
                    />
                    <Label
                      htmlFor="remember-me"
                      className="cursor-pointer text-sm font-normal text-slate-600"
                    >
                      Recordarme
                    </Label>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium text-sa-primary transition-colors hover:text-sa-primary-dark"
                  >
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="h-12 w-full rounded-xl bg-gradient-to-r from-sa-primary to-sa-primary-dark text-sm font-bold tracking-wide shadow-lg shadow-sa-primary/25 transition-all duration-300 hover:-translate-y-0.5 hover:from-sa-primary-dark hover:to-sa-primary-dark disabled:hover:translate-y-0"
                >
                  {loading ? <Loader2 size={20} className="animate-spin" /> : 'INICIAR SESIÓN'}
                </Button>
              </form>

              <p className="text-center text-sm text-muted-foreground">
                ¿No tienes una cuenta administrativa?{' '}
                <a
                  href="#"
                  className="font-medium text-slate-800 transition-colors hover:text-sa-primary"
                >
                  Contactar a Soporte TI
                </a>
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex-none px-8 pb-6 lg:px-12 lg:pb-8 xl:px-16 xl:pb-10">
          <div className="flex items-center justify-between border-t border-slate-100 pt-5 text-xs text-slate-400">
            <span>© {new Date().getFullYear()} School Admin</span>
            <div className="flex gap-4">
              <a href="#" className="transition-colors hover:text-slate-600">
                Soporte
              </a>
              <a href="#" className="transition-colors hover:text-slate-600">
                Privacidad
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="relative hidden w-1/2 overflow-hidden bg-slate-900 lg:block">
        <div
          className="absolute inset-0 scale-105 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop')",
            filter: 'grayscale(30%)',
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-sa-primary-dark/90 to-slate-900/80 mix-blend-multiply" />

        <div className="absolute inset-0 bg-sa-pattern opacity-20" />

        <div className="absolute right-0 top-0 p-20 opacity-10">
          <svg width="400" height="400" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="2" fill="white" />
            <circle cx="40" cy="60" r="2" fill="white" />
            <circle cx="160" cy="80" r="2" fill="white" />
            <circle cx="80" cy="150" r="2" fill="white" />
            <line x1="100" y1="100" x2="40" y2="60" stroke="white" strokeWidth="0.5" />
            <line x1="100" y1="100" x2="160" y2="80" stroke="white" strokeWidth="0.5" />
            <line x1="100" y1="100" x2="80" y2="150" stroke="white" strokeWidth="0.5" />
            <line x1="40" y1="60" x2="80" y2="150" stroke="white" strokeWidth="0.5" />
          </svg>
        </div>

        <div className="absolute inset-0 z-10 flex flex-col justify-center px-20 text-white">
          <div className="border-l-4 border-sa-primary py-2 pl-8">
            <h2 className="font-display mb-6 text-5xl font-bold leading-tight tracking-tight">
              Gestión Institucional <br />
              <span className="bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
                Inteligente
              </span>
            </h2>
            <p className="max-w-lg text-lg font-light leading-relaxed text-slate-300">
              Plataforma integral para la administración académica, financiera y operativa.
              Centralice sus datos y tome decisiones informadas con School Admin.
            </p>
          </div>

          <div className="mt-12 flex items-center gap-8 text-sm font-medium text-slate-300/80">
            <div className="flex items-center gap-2">
              <ShieldCheck size={20} className="text-blue-300" />
              <span>Seguridad Avanzada</span>
            </div>
            <div className="flex items-center gap-2">
              <BarChart3 size={20} className="text-blue-300" />
              <span>Reportes en Tiempo Real</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
