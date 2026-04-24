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

export function formatDate(
  date: string | Date | undefined | null,
  monthStyle: 'short' | 'long' = 'long',
): string {
  if (!date) return '---'

  const dateObj =
    typeof date === 'string' ? new Date(date.includes('T') ? date : `${date}T00:00:00`) : date

  return format(dateObj, monthStyle === 'long' ? "dd 'de' MMMM 'de' yyyy" : 'dd MMM yyyy', {
    locale: es,
  })
}

export function formatDateTime(date: string | Date | undefined | null): string {
  if (!date) return '---'
  const dateObj = typeof date === 'string' ? new Date(date) : date

  return format(dateObj, 'dd/MM/yyyy HH:mm', { locale: es })
}
