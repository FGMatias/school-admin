import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import React from 'react'
import { AuthProvider } from './AuthProvider'
import { QueryProvider } from './QueryProvider'

interface AppProvidersProps {
  children: React.ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryProvider>
      <TooltipProvider>
        <AuthProvider>{children}</AuthProvider>
      </TooltipProvider>
      <Toaster richColors position="top-right" />
    </QueryProvider>
  )
}
