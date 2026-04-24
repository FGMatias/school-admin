import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
      refetchOnWindowFocus: false,
      networkMode: 'always',
    },
    mutations: {
      networkMode: 'always',
      retry: (failureCount, error) => {
        if (failureCount >= 1) return false

        const message = (error as Error)?.message ?? ''
        const isAuthError =
          message.includes('JWT') ||
          message.includes('401') ||
          message.includes('token') ||
          message.includes('expired')

        return isAuthError
      },
      retryDelay: 1000,
    },
  },
})

export function QueryProvider({ children }: { children: React.ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
