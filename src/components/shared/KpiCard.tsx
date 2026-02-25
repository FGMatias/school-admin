import { Card, CardContent } from '@/components/ui/card'

interface KpiCardProps {
  title: string
  value: string | number
  icon?: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'danger'
}

const variantStyles = {
  default: 'text-gray-900',
  success: 'text-green-600',
  warning: 'text-yellow-600',
  danger: 'text-red-600',
}

export function KpiCard({ title, value, icon, variant = 'default' }: KpiCardProps) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-6">
        {icon && <div className="text-muted-foreground">{icon}</div>}
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className={`text-2xl font-bold ${variantStyles[variant]}`}>{value}</p>
        </div>
      </CardContent>
    </Card>
  )
}
