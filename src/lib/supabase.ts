import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Faltan variables de entorno de Supabase')
}

const localLocks: Record<string, Promise<void>> = {}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
    lock: async (name, _acquireTimeout, fn) => {
      if (!localLocks[name]) {
        localLocks[name] = Promise.resolve()
      }

      const previousLock = localLocks[name]
      let resolveNext: () => void

      localLocks[name] = new Promise((resolve) => {
        resolveNext = resolve
      })

      await previousLock

      try {
        return await fn()
      } finally {
        resolveNext!()
      }
    },
  },
})
