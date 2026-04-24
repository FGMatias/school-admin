import type { SeccionFormValues } from '@/schemas/seccion.schema'
import { seccionService } from '@/services/seccion.service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

const KEYS = {
  all: ['secciones'] as const,
  porGrado: (idGrado: number) => [...KEYS.all, 'grado', idGrado] as const,
}

export function useSeccionesPorGrado(idGrado: number | null) {
  return useQuery({
    queryKey: KEYS.porGrado(idGrado!),
    queryFn: () => seccionService.listarPorGrado(idGrado!),
    enabled: !!idGrado,
  })
}

export function useCrearSeccion(idGrado: number) {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: (values: SeccionFormValues) => seccionService.crear(idGrado, values),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: KEYS.porGrado(idGrado) })
      toast.success('Sección creada correctamente')
    },
    onError: () => {
      toast.error('Error al crear la sección')
    },
  })
}

export function useEditarSeccion(idGrado: number) {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: ({ id, values }: { id: number; values: SeccionFormValues }) =>
      seccionService.editar(id, values),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: KEYS.porGrado(idGrado) })
      toast.success('Sección actualizada correctamente')
    },
    onError: () => {
      toast.error('Error al actualizar la sección')
    },
  })
}

export function useCambiarEstadoSeccion(idGrado: number) {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: ({ id, estado }: { id: number; estado: boolean }) =>
      seccionService.cambiarEstado(id, estado),
    onSuccess: (_, variables) => {
      qc.invalidateQueries({ queryKey: KEYS.porGrado(idGrado) })
      toast.success(variables.estado ? 'Sección habilitada' : 'Sección deshabilitada')
    },
  })
}
