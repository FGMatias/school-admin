import type { ConceptoPagoFormValues } from '@/schemas/concepto_pago.schema'
import type { ConceptoPago } from '@/types/concepto_pago.types'
import { Database } from '@/types/supabase'

type FilaConceptoPago = Database['public']['Tables']['concepto_pago']['Row']
type InsertConceptoPago = Database['public']['Tables']['concepto_pago']['Insert']
type UpdateConceptoPago = Database['public']['Tables']['concepto_pago']['Update']

export const conceptoPagoAdapter = {
  toApp: (row: FilaConceptoPago): ConceptoPago => ({
    id: row.id,
    id_colegio: row.id_colegio,
    nombre: row.nombre,
    descripcion: row.descripcion ?? '',
    es_mensual: row.es_mensual ?? true,
    monto: row.monto ?? 0,
    estado: row.estado ?? true,
    created_at: row.created_at ?? '',
    updated_at: row.updated_at ?? '',
  }),

  toInsert: (idColegio: number, values: ConceptoPagoFormValues): InsertConceptoPago => ({
    id_colegio: idColegio,
    nombre: values.nombre.trim(),
    descripcion: values.descripcion?.trim(),
    es_mensual: values.es_mensual,
    monto: values.monto,
  }),

  toUpdate: (values: ConceptoPagoFormValues): UpdateConceptoPago => ({
    nombre: values.nombre.trim(),
    descripcion: values.descripcion?.trim(),
    es_mensual: values.es_mensual,
    monto: values.monto,
    updated_at: new Date().toISOString(),
  }),
}
