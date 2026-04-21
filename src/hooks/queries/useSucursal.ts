import { useAuth } from '@/hooks/useAuth'
import type { AsignarAdminFormValues, SucursalFormValues } from '@/schemas/sucursal.schema'
import { sucursalService } from '@/services/sucursal.service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

const KEYS = {
  all: ['sucursales'] as const,
  list: (idColegio: number) => [...KEYS.all, 'list', idColegio] as const,
}

export function useSucursales() {
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
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: KEYS.all })
      toast.success('Sucursal creada', {
        description: 'La sede fue registrada exitosamente',
      })
    },
    onError: () => {
      toast.error('Error', {
        description: 'No se pudo crear la sucursal, Intenta nuevamente',
      })
    },
  })
}

export function useEditarSucursal() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: ({ id, values }: { id: number; values: SucursalFormValues }) =>
      sucursalService.editar(id, values),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: KEYS.all })
      toast.success('Sucursal actualizada', {
        description: 'Los cambios se guardaron correctamente',
      })
    },
    onError: () => {
      toast.error('Error', {
        description: 'Hubo un problema al actualizar los datos',
      })
    },
  })
}

export function useToggleEstadoSucursal() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: ({ id, estado }: { id: number; estado: boolean }) =>
      sucursalService.cambiarEstado(id, estado),
    onSuccess: (_, variables) => {
      qc.invalidateQueries({ queryKey: KEYS.all })
      toast.success(variables.estado ? 'Sucursal habilitada' : 'Sucursal inhabilitada')
    },
    onError: () => toast.error('Error al cambiar el estado de la sucursal'),
  })
}

export function useCrearAdminSucursal() {
  const { usuario } = useAuth()
  const qc = useQueryClient()

  return useMutation({
    mutationFn: ({ idSucursal, values }: { idSucursal: number; values: AsignarAdminFormValues }) =>
      sucursalService.crearAdmin(idSucursal, usuario!.id_colegio, values),
    onSuccess: (_, variables) => {
      qc.invalidateQueries({ queryKey: KEYS.all })
      toast.success('Administrador asignado', {
        description: `${variables.values.nombre} fue asignado`,
      })
    },
    onError: (err: any) => {
      const msg = err?.message ?? ''
      if (msg.includes('ya está registrado')) {
        toast.error('El correo ya está registrado')
      } else {
        toast.error('Error al asignar el administrador')
      }
    },
  })
}

export function useResetPasswordAdmin() {
  return useMutation({
    mutationFn: ({ idUsuario }: { idUsuario: string }) =>
      sucursalService.resetContrasena(idUsuario),
    onSuccess: () => {
      toast.success('Contraseña restablecida', {
        description: 'La nueva contraseña es: admin123!',
      })
    },
    onError: () => toast.error('Error al restablecer la contraseña'),
  })
}

export function useQuitarAdmin() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: ({ idSucursal }: { idSucursal: number }) => sucursalService.quitarAdmin(idSucursal),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: KEYS.all })
      toast.success('Administrador removido correctamente')
    },
    onError: () => toast.error('Error al remover el administrador'),
  })
}
