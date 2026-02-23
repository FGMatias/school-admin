export const ESTADO_PAGO = {
  PENDIENTE: 'PENDIENTE',
  PARCIAL: 'PARCIAL',
  PAGADO: 'PAGADO',
  VENCIDO: 'VENCIDO',
  ANULADO: 'ANULADO',
} as const

export const ESTADO_MATRICULA = {
  ACTIVA: 'ACTIVA',
  RETIRADA: 'RETIRADA',
} as const

export const ESTADO_LICENCIA = {
    ACTIVA: 'ACTIVA',
    VENCIDA: 'VENCIDA',
    SUSPENDIDA: 'SUSPENDIDA',
} as const

export const METODO_PAGO = {
    EFECTIVO: 'EFECTIVO',
    TRANSFERENCIA: 'TRANSFERENCIA',
    DEPOSITO: 'DEPOSITO',
    OTRO: 'OTRO',
} as const

export const MESES = {
    ENERO: 'ENERO',
    FEBRERO: 'FEBRERO',
    MARZO: 'MARZO',
    ABRIL: 'ABRIL',
    MAYO: 'MAYO',
    JUNIO: 'JUNIO',
    JULIO: 'JULIO',
    AGOSTO: 'AGOSTO',
    SEPTIEMBRE: 'SEPTIEMBRE',
    OCTUBRE: 'OCTUBRE',
    NOVIEMBRE: 'NOVIEMBRE',
    DICIEMBRE: 'DICIEMBRE', 
} as const

export type EstadoPago = (typeof ESTADO_PAGO)[keyof typeof ESTADO_PAGO]
export type EstadoMatricula = (typeof ESTADO_MATRICULA)[keyof typeof ESTADO_MATRICULA]
export type EstadoLicencia = (typeof ESTADO_LICENCIA)[keyof typeof ESTADO_LICENCIA]
export type MetodoPago = (typeof METODO_PAGO)[keyof typeof METODO_PAGO]
export type Mes = (typeof MESES)[keyof typeof MESES]