import { conceptoPagoAdapter } from '@/adapters/concepto_pago.adapter'
import { supabase } from '@/lib/supabase'
import type { ConceptoPagoFormValues } from '@/schemas/concepto_pago.schema'
import type { ConceptoPago } from '@/types/concepto_pago.types'

export const conceptoPagoService = {
  listar: async (idColegio: number): Promise<ConceptoPago[]> => {
    const { data, error } = await supabase
      .from('concepto_pago')
      .select('*')
      .eq('id_colegio', idColegio)
      .order('created_at', { ascending: false })

    if (error) throw error
    if (!data) return []

    return data.map(conceptoPagoAdapter.toApp)
  },

  crear: async (idColegio: number, values: ConceptoPagoFormValues): Promise<ConceptoPago> => {
    const payload = conceptoPagoAdapter.toInsert(idColegio, values)
    const { data, error } = await supabase.from('concepto_pago').insert(payload).select().single()

    if (error) throw error
    return conceptoPagoAdapter.toApp(data)
  },

  editar: async (id: number, values: ConceptoPagoFormValues): Promise<ConceptoPago> => {
    const payload = conceptoPagoAdapter.toUpdate(values)
    const { data, error } = await supabase
      .from('concepto_pago')
      .update(payload)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return conceptoPagoAdapter.toApp(data)
  },

  cambiarEstado: async (id: number, estado: boolean): Promise<void> => {
    const { error } = await supabase
      .from('concepto_pago')
      .update({ estado, updated_at: new Date().toISOString() })
      .eq('id', id)

    if (error) throw error
  },
}
