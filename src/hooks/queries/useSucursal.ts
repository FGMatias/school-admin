import { useAuth } from '@/hooks/useAuth'
import { sucursalService } from '@/services/sucursal.service'
import type { AsignarAdminFormValues, SucursalFormValues } from '@/types/sucursal.types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const KEYS = {
  all: ['sucursales'] as const,
  list: (idColegio: number) => [...KEYS.all, 'list', idColegio] as const,
}

export function useSucursal() {
  const { usuario } = useAuth()
  const idColegio = usuario?.id_colegio ?? 0

  return useQuery({
    queryKey: KEYS.list(idColegio),
    queryFn: () => sucursalService.listar(idColegio),
    enabled: idColegio > 0,
  })
}

export function useCrearSucursal() {
  const { usuario } = useAuth()
  const qc = useQueryClient()

  return useMutation({
    mutationFn: ({ values }: { values: SucursalFormValues }) =>
      sucursalService.crear(usuario!.id_colegio, values),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEYS.all }),
  })
}

export function useEditarSucursal() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: ({ id, values }: { id: number; values: SucursalFormValues }) =>
      sucursalService.editar(id, values),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEYS.all }),
  })
}

export function useToggleEstadoSucursal() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: ({ id, estado }: { id: number; estado: boolean }) =>
      sucursalService.cambiarEstado(id, estado),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEYS.all }),
  })
}

export function useCrearAdminSucursal() {
  const { usuario } = useAuth()
  const qc = useQueryClient()

  return useMutation({
    mutationFn: ({ idSucursal, values }: { idSucursal: number; values: AsignarAdminFormValues }) =>
      sucursalService.crearAdmin(idSucursal, usuario!.id_colegio, values),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEYS.all }),
  })
}

export function useResetPasswordAdmin() {
  return useMutation({
    mutationFn: ({ idUsuario }: { idUsuario: string }) =>
      sucursalService.resetContrasena(idUsuario),
  })
}

export function useQuitarAdmin() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: ({ idSucursal }: { idSucursal: number }) => sucursalService.quitarAdmin(idSucursal),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEYS.all }),
  })
}
