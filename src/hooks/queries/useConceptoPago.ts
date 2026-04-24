import type { ConceptoPagoFormValues } from '@/schemas/concepto_pago.schema'
import { conceptoPagoService } from '@/services/concepto_pago.service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useAuth } from '../useAuth'

const KEYS = {
  all: ['conceptos_pagos'] as const,
  list: (idColegio: number) => [...KEYS.all, 'list', idColegio] as const,
}

export function useConceptosPago() {
  const { usuario } = useAuth()
  const idColegio = usuario?.id_colegio ?? 0

  return useQuery({
    queryKey: KEYS.list(idColegio),
    queryFn: () => conceptoPagoService.listar(idColegio),
    enabled: idColegio > 0,
  })
}

export function useCrearConceptoPago() {
  const { usuario } = useAuth()
  const idColegio = usuario?.id_colegio ?? 0
  const qc = useQueryClient()

  return useMutation({
    mutationFn: ({ values }: { values: ConceptoPagoFormValues }) =>
      conceptoPagoService.crear(idColegio, values),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: KEYS.all })
      toast.success('Tarifa creada', {
        description: 'La tarifa fue registrada correctamente.',
      })
    },
    onError: () => {
      toast.error('Error al crear', {
        description: 'No se pudo crear la tarifa. Intenta nuevamente.',
      })
    },
  })
}

export function useEditarConceptoPago() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: ({ id, values }: { id: number; values: ConceptoPagoFormValues }) =>
      conceptoPagoService.editar(id, values),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: KEYS.all })
      toast.success('Tarifa actualizada', {
        description: 'Los cambios se guardaron correctamente.',
      })
    },
    onError: () => {
      toast.error('Error al actualizar', {
        description: 'Hubo un problema al guardar los cambios.',
      })
    },
  })
}

export function useCambiarEstadoConceptoPago() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: ({ id, estado }: { id: number; estado: boolean }) =>
      conceptoPagoService.cambiarEstado(id, estado),
    onSuccess: (_, variables) => {
      qc.invalidateQueries({ queryKey: KEYS.all })
      toast.success(variables.estado ? 'Tarifa habilitada' : 'Tarifa deshabilitada', {
        description: 'El estado se actualizó correctamente.',
      })
    },
    onError: () => {
      toast.error('Error de actualización', {
        description: 'No se pudo cambiar el estado de la tarifa.',
      })
    },
  })
}
