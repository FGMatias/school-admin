import { Badge } from '@/components/ui/badge'

interface StatusBadgeProps {
  status: string
}

const statusConfig: Record<
  string,
  { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }
> = {
  ACTIVO: { label: 'Activo', variant: 'default' },
  ACTIVA: { label: 'Activa', variant: 'default' },
  PENDIENTE: { label: 'Pendiente', variant: 'secondary' },
  PARCIAL: { label: 'Parcial', variant: 'outline' },
  PAGADO: { label: 'Pagado', variant: 'default' },
  VENCIDO: { label: 'Vencido', variant: 'destructive' },
  ANULADO: { label: 'Anulado', variant: 'destructive' },
  RETIRADA: { label: 'Retirada', variant: 'destructive' },
  RETIRADO: { label: 'Retirado', variant: 'destructive' },
  INACTIVO: { label: 'Inactivo', variant: 'secondary' },
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status] ?? { label: status, variant: 'secondary' as const }

  return <Badge variant={config.variant}>{config.label}</Badge>
}
