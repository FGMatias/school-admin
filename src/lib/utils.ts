import { clsx, type ClassValue } from 'clsx'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatMoney(amount: number): string {
  return `S/ ${amount.toLocaleString('es-PE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

export function formatDate(date: string | Date): string {
  return format(new Date(date), 'dd/MM/yyyy', { locale: es })
}

export function formatDateTime(date: string | Date): string {
  return format(new Date(date), 'dd/MM/yyyy HH:mm', { locale: es })
}
