import type { GradoFormValues } from '@/schemas/grado.schema'
import { gradoService } from '@/services/grado.service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useAuth } from '../useAuth'

const KEYS = {
  all: ['grados'] as const,
  list: (idColegio: number) => [...KEYS.all, 'list', idColegio] as const,
}

export function useGrados() {
  const { usuario } = useAuth()
  const idColegio = usuario?.id_colegio ?? 0

  return useQuery({
    queryKey: KEYS.list(idColegio),
    queryFn: () => gradoService.listar(idColegio),
    enabled: idColegio > 0,
  })
}

export function useCrearGrado() {
  const { usuario } = useAuth()
  const idColegio = usuario?.id_colegio ?? 0
  const qc = useQueryClient()

  return useMutation({
    mutationFn: ({ values }: { values: GradoFormValues }) => gradoService.crear(idColegio, values),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: KEYS.all })
      toast.success('Grado creado', {
        description: 'El grado fue registrado correctamente.',
      })
    },
    onError: () => {
      toast.error('Error al crear', {
        description: 'No se pudo crear el grado. Intenta nuevamente.',
      })
    },
  })
}

export function useEditarGrado() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: ({ id, values }: { id: number; values: GradoFormValues }) =>
      gradoService.editar(id, values),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: KEYS.all })
      toast.success('Grado actualizado', {
        description: 'Los cambios se guardaron correctamente.',
      })
    },
    onError: () => {
      toast.error('Error al actualizar', {
        description: 'No se pudo actualizar el grado. Intenta nuevamente.',
      })
    },
  })
}

export function useCambiarEstadoGrado() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: ({ id, estado }: { id: number; estado: boolean }) =>
      gradoService.cambiarEstado(id, estado),
    onSuccess: (_, variables) => {
      qc.invalidateQueries({ queryKey: KEYS.all })
      toast.success(variables.estado ? 'Grado habilitado' : 'Grado inhabilitado', {
        description: 'El estado se actualizó correctamente.',
      })
    },
  })
}
