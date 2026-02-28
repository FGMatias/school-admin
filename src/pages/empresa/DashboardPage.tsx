import { Card, CardContent } from '@/components/ui/card'
import { useAuth } from '@/hooks/useAuth'
import { DollarSign, GraduationCap, TrendingUp, Users } from 'lucide-react'

export function DashboardEmpresaPage() {
  const { usuario } = useAuth()
  const nombre = usuario?.nombre ?? 'Admin'
  const colegio = usuario?.colegio.nombre ?? 'tu institución'

  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-display text-2xl font-bold text-slate-800">
          Bienvenido de nuevo, {nombre}
        </h3>
        <p className="mt-1 text-slate-500">Aquí está lo que sucede en {colegio} hoy.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <KpiCard
          label="Total de Alumnos"
          value="—"
          icon={<GraduationCap className="text-sa-primary" />}
        />
        <KpiCard
          label="Profesores Activos"
          value="—"
          icon={<Users className="text-purple-500" />}
        />
        <KpiCard
          label="Ingresos Mensuales"
          value="—"
          icon={<DollarSign className="text-amber-500" />}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent className="flex h-72 items-center justify-center">
            <p className="text-sm text-slate-400">Gráfico de pagos mensuales — próximamente</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex h-72 items-center justify-center">
            <p className="text-sm text-slate-400">Próximos pagos — próximamente</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function KpiCard({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <Card className="relative overflow-hidden">
      <CardContent className="flex h-36 flex-col justify-between p-6">
        <div className="absolute -right-4 -top-4 opacity-10">{icon}</div>
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-slate-500">{label}</p>
          <h4 className="mt-2 text-3xl font-bold text-slate-900">{value}</h4>
        </div>
        <div className="flex w-fit items-center gap-1.5 rounded-lg bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-500">
          <TrendingUp size={14} />
          <span>Sin datos aún</span>
        </div>
      </CardContent>
    </Card>
  )
}
