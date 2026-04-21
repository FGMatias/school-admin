export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      alumno: {
        Row: {
          apellido: string
          apoderado: string | null
          correo: string | null
          created_at: string | null
          dni: string | null
          estado: boolean | null
          id: number
          id_sucursal: number
          nombre: string
          numero_contacto: string | null
          updated_at: string | null
        }
        Insert: {
          apellido: string
          apoderado?: string | null
          correo?: string | null
          created_at?: string | null
          dni?: string | null
          estado?: boolean | null
          id?: never
          id_sucursal: number
          nombre: string
          numero_contacto?: string | null
          updated_at?: string | null
        }
        Update: {
          apellido?: string
          apoderado?: string | null
          correo?: string | null
          created_at?: string | null
          dni?: string | null
          estado?: boolean | null
          id?: never
          id_sucursal?: number
          nombre?: string
          numero_contacto?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_sucursal_id_alumno"
            columns: ["id_sucursal"]
            isOneToOne: false
            referencedRelation: "sucursal"
            referencedColumns: ["id"]
          },
        ]
      }
      colegio: {
        Row: {
          created_at: string | null
          direccion: string | null
          estado: boolean | null
          id: number
          nombre: string
          ruc: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          direccion?: string | null
          estado?: boolean | null
          id?: never
          nombre: string
          ruc: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          direccion?: string | null
          estado?: boolean | null
          id?: never
          nombre?: string
          ruc?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      concepto_pago: {
        Row: {
          created_at: string | null
          descripcion: string | null
          es_mensual: boolean | null
          estado: boolean | null
          id: number
          id_colegio: number
          monto: number | null
          nombre: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          descripcion?: string | null
          es_mensual?: boolean | null
          estado?: boolean | null
          id?: never
          id_colegio: number
          monto?: number | null
          nombre: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          descripcion?: string | null
          es_mensual?: boolean | null
          estado?: boolean | null
          id?: never
          id_colegio?: number
          monto?: number | null
          nombre?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_colegio_id_concepto_pago"
            columns: ["id_colegio"]
            isOneToOne: false
            referencedRelation: "colegio"
            referencedColumns: ["id"]
          },
        ]
      }
      detalle_pago_alumno: {
        Row: {
          comprobante: string | null
          created_at: string | null
          fecha_pago: string
          id: number
          id_pago_alumno: number
          metodo_pago: Database["public"]["Enums"]["metodo_pago"]
          monto: number
          registrado_por: string
        }
        Insert: {
          comprobante?: string | null
          created_at?: string | null
          fecha_pago: string
          id?: never
          id_pago_alumno: number
          metodo_pago: Database["public"]["Enums"]["metodo_pago"]
          monto: number
          registrado_por: string
        }
        Update: {
          comprobante?: string | null
          created_at?: string | null
          fecha_pago?: string
          id?: never
          id_pago_alumno?: number
          metodo_pago?: Database["public"]["Enums"]["metodo_pago"]
          monto?: number
          registrado_por?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_pago_alumno_id_detalle_pago_alumno"
            columns: ["id_pago_alumno"]
            isOneToOne: false
            referencedRelation: "pago_alumno"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_usuario_id_detalle_pago_alumno"
            columns: ["registrado_por"]
            isOneToOne: false
            referencedRelation: "usuario"
            referencedColumns: ["id"]
          },
        ]
      }
      grado: {
        Row: {
          created_at: string | null
          estado: boolean | null
          id: number
          id_colegio: number
          nivel: Database["public"]["Enums"]["nivel"]
          nombre: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          estado?: boolean | null
          id?: never
          id_colegio: number
          nivel: Database["public"]["Enums"]["nivel"]
          nombre: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          estado?: boolean | null
          id?: never
          id_colegio?: number
          nivel?: Database["public"]["Enums"]["nivel"]
          nombre?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_colegio_id_grado"
            columns: ["id_colegio"]
            isOneToOne: false
            referencedRelation: "colegio"
            referencedColumns: ["id"]
          },
        ]
      }
      historial_licencia: {
        Row: {
          created_at: string | null
          estado_anterior: Database["public"]["Enums"]["estado_licencia"] | null
          estado_nuevo: Database["public"]["Enums"]["estado_licencia"]
          fecha_cambio: string
          id: number
          id_licencia: number
          id_plan_anterior: number | null
          id_plan_nuevo: number
          motivo: string | null
        }
        Insert: {
          created_at?: string | null
          estado_anterior?:
            | Database["public"]["Enums"]["estado_licencia"]
            | null
          estado_nuevo: Database["public"]["Enums"]["estado_licencia"]
          fecha_cambio: string
          id?: never
          id_licencia: number
          id_plan_anterior?: number | null
          id_plan_nuevo: number
          motivo?: string | null
        }
        Update: {
          created_at?: string | null
          estado_anterior?:
            | Database["public"]["Enums"]["estado_licencia"]
            | null
          estado_nuevo?: Database["public"]["Enums"]["estado_licencia"]
          fecha_cambio?: string
          id?: never
          id_licencia?: number
          id_plan_anterior?: number | null
          id_plan_nuevo?: number
          motivo?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_licencia_id_historial_licencia"
            columns: ["id_licencia"]
            isOneToOne: false
            referencedRelation: "licencia"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_plan_anterior_id_historial_licencia"
            columns: ["id_plan_anterior"]
            isOneToOne: false
            referencedRelation: "plan"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_plan_nuevo_id_historial_licencia"
            columns: ["id_plan_nuevo"]
            isOneToOne: false
            referencedRelation: "plan"
            referencedColumns: ["id"]
          },
        ]
      }
      licencia: {
        Row: {
          auto_renovar: boolean | null
          created_at: string | null
          dias_prueba: number | null
          estado: Database["public"]["Enums"]["estado_licencia"]
          fecha_fin: string
          fecha_inicio: string
          id: number
          id_colegio: number
          id_plan: number
          updated_at: string | null
        }
        Insert: {
          auto_renovar?: boolean | null
          created_at?: string | null
          dias_prueba?: number | null
          estado?: Database["public"]["Enums"]["estado_licencia"]
          fecha_fin: string
          fecha_inicio: string
          id?: never
          id_colegio: number
          id_plan: number
          updated_at?: string | null
        }
        Update: {
          auto_renovar?: boolean | null
          created_at?: string | null
          dias_prueba?: number | null
          estado?: Database["public"]["Enums"]["estado_licencia"]
          fecha_fin?: string
          fecha_inicio?: string
          id?: never
          id_colegio?: number
          id_plan?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_colegio_id_licencia"
            columns: ["id_colegio"]
            isOneToOne: true
            referencedRelation: "colegio"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_plan_id_licencia"
            columns: ["id_plan"]
            isOneToOne: false
            referencedRelation: "plan"
            referencedColumns: ["id"]
          },
        ]
      }
      matricula: {
        Row: {
          created_at: string | null
          estado: Database["public"]["Enums"]["estado_matricula"]
          fecha_matricula: string
          id: number
          id_alumno: number
          id_periodo: number
          id_seccion: number
          id_sucursal: number
          observacion: string | null
          registrado_por: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          estado?: Database["public"]["Enums"]["estado_matricula"]
          fecha_matricula: string
          id?: never
          id_alumno: number
          id_periodo: number
          id_seccion: number
          id_sucursal: number
          observacion?: string | null
          registrado_por: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          estado?: Database["public"]["Enums"]["estado_matricula"]
          fecha_matricula?: string
          id?: never
          id_alumno?: number
          id_periodo?: number
          id_seccion?: number
          id_sucursal?: number
          observacion?: string | null
          registrado_por?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_alumno_id_matricula"
            columns: ["id_alumno"]
            isOneToOne: false
            referencedRelation: "alumno"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_periodo_academico_id_matricula"
            columns: ["id_periodo"]
            isOneToOne: false
            referencedRelation: "periodo_academico"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_seccion_id_matricula"
            columns: ["id_seccion"]
            isOneToOne: false
            referencedRelation: "seccion"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_sucursal_id_matricula"
            columns: ["id_sucursal"]
            isOneToOne: false
            referencedRelation: "sucursal"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_usuario_id_matricula"
            columns: ["registrado_por"]
            isOneToOne: false
            referencedRelation: "usuario"
            referencedColumns: ["id"]
          },
        ]
      }
      modulo: {
        Row: {
          codigo: string
          created_at: string | null
          descripcion: string | null
          estado: boolean | null
          id: number
          nombre: string
          updated_at: string | null
        }
        Insert: {
          codigo: string
          created_at?: string | null
          descripcion?: string | null
          estado?: boolean | null
          id?: never
          nombre: string
          updated_at?: string | null
        }
        Update: {
          codigo?: string
          created_at?: string | null
          descripcion?: string | null
          estado?: boolean | null
          id?: never
          nombre?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      pago_alumno: {
        Row: {
          created_at: string | null
          estado: Database["public"]["Enums"]["estado_pago"]
          fecha_vencimiento: string
          id: number
          id_alumno: number
          id_concepto: number
          id_periodo: number
          id_sucursal: number
          mes: Database["public"]["Enums"]["mes"] | null
          monto_pagado: number | null
          monto_total: number
          observacion: string | null
          registrado_por: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          estado?: Database["public"]["Enums"]["estado_pago"]
          fecha_vencimiento: string
          id?: never
          id_alumno: number
          id_concepto: number
          id_periodo: number
          id_sucursal: number
          mes?: Database["public"]["Enums"]["mes"] | null
          monto_pagado?: number | null
          monto_total: number
          observacion?: string | null
          registrado_por: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          estado?: Database["public"]["Enums"]["estado_pago"]
          fecha_vencimiento?: string
          id?: never
          id_alumno?: number
          id_concepto?: number
          id_periodo?: number
          id_sucursal?: number
          mes?: Database["public"]["Enums"]["mes"] | null
          monto_pagado?: number | null
          monto_total?: number
          observacion?: string | null
          registrado_por?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_alumno_id_pago_alumno"
            columns: ["id_alumno"]
            isOneToOne: false
            referencedRelation: "alumno"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_concepto_pago_id_pago_alumno"
            columns: ["id_concepto"]
            isOneToOne: false
            referencedRelation: "concepto_pago"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_periodo_academico_id_pago_alumno"
            columns: ["id_periodo"]
            isOneToOne: false
            referencedRelation: "periodo_academico"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_sucursal_id_pago_alumno"
            columns: ["id_sucursal"]
            isOneToOne: false
            referencedRelation: "sucursal"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_usuario_id_pago_alumno"
            columns: ["registrado_por"]
            isOneToOne: false
            referencedRelation: "usuario"
            referencedColumns: ["id"]
          },
        ]
      }
      pago_profesor: {
        Row: {
          comprobante: string | null
          created_at: string | null
          estado: Database["public"]["Enums"]["estado_pago"]
          fecha_pago: string | null
          id: number
          id_periodo: number
          id_profesor: number
          id_sucursal: number
          mes: Database["public"]["Enums"]["mes"]
          metodo_pago: Database["public"]["Enums"]["metodo_pago"] | null
          monto: number
          observacion: string | null
          registrado_por: string
          updated_at: string | null
        }
        Insert: {
          comprobante?: string | null
          created_at?: string | null
          estado?: Database["public"]["Enums"]["estado_pago"]
          fecha_pago?: string | null
          id?: never
          id_periodo: number
          id_profesor: number
          id_sucursal: number
          mes: Database["public"]["Enums"]["mes"]
          metodo_pago?: Database["public"]["Enums"]["metodo_pago"] | null
          monto: number
          observacion?: string | null
          registrado_por: string
          updated_at?: string | null
        }
        Update: {
          comprobante?: string | null
          created_at?: string | null
          estado?: Database["public"]["Enums"]["estado_pago"]
          fecha_pago?: string | null
          id?: never
          id_periodo?: number
          id_profesor?: number
          id_sucursal?: number
          mes?: Database["public"]["Enums"]["mes"]
          metodo_pago?: Database["public"]["Enums"]["metodo_pago"] | null
          monto?: number
          observacion?: string | null
          registrado_por?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_periodo_academico_id_pago_profesor"
            columns: ["id_periodo"]
            isOneToOne: false
            referencedRelation: "periodo_academico"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_profesor_id_pago_profesor"
            columns: ["id_profesor"]
            isOneToOne: false
            referencedRelation: "profesor"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_sucursal_id_pago_profesor"
            columns: ["id_sucursal"]
            isOneToOne: false
            referencedRelation: "sucursal"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_usuario_id_pago_profesor"
            columns: ["registrado_por"]
            isOneToOne: false
            referencedRelation: "usuario"
            referencedColumns: ["id"]
          },
        ]
      }
      periodo_academico: {
        Row: {
          anio: number
          created_at: string | null
          estado: boolean | null
          fecha_fin: string
          fecha_inicio: string
          id: number
          id_colegio: number
          nombre: string
          updated_at: string | null
        }
        Insert: {
          anio: number
          created_at?: string | null
          estado?: boolean | null
          fecha_fin: string
          fecha_inicio: string
          id?: never
          id_colegio: number
          nombre: string
          updated_at?: string | null
        }
        Update: {
          anio?: number
          created_at?: string | null
          estado?: boolean | null
          fecha_fin?: string
          fecha_inicio?: string
          id?: never
          id_colegio?: number
          nombre?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_colegio_id_periodo_academico"
            columns: ["id_colegio"]
            isOneToOne: false
            referencedRelation: "colegio"
            referencedColumns: ["id"]
          },
        ]
      }
      plan: {
        Row: {
          ciclo: Database["public"]["Enums"]["ciclo_facturacion"]
          created_at: string | null
          descripcion: string | null
          estado: boolean | null
          id: number
          max_alumnos: number
          max_profesores: number
          max_sucursales: number
          max_usuarios: number
          nombre: string
          precio: number
          updated_at: string | null
        }
        Insert: {
          ciclo: Database["public"]["Enums"]["ciclo_facturacion"]
          created_at?: string | null
          descripcion?: string | null
          estado?: boolean | null
          id?: never
          max_alumnos: number
          max_profesores: number
          max_sucursales: number
          max_usuarios: number
          nombre: string
          precio: number
          updated_at?: string | null
        }
        Update: {
          ciclo?: Database["public"]["Enums"]["ciclo_facturacion"]
          created_at?: string | null
          descripcion?: string | null
          estado?: boolean | null
          id?: never
          max_alumnos?: number
          max_profesores?: number
          max_sucursales?: number
          max_usuarios?: number
          nombre?: string
          precio?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      plan_modulo: {
        Row: {
          created_at: string | null
          id: number
          id_modulo: number
          id_plan: number
        }
        Insert: {
          created_at?: string | null
          id?: never
          id_modulo: number
          id_plan: number
        }
        Update: {
          created_at?: string | null
          id?: never
          id_modulo?: number
          id_plan?: number
        }
        Relationships: [
          {
            foreignKeyName: "fk_modulo_id_plan_modulo"
            columns: ["id_modulo"]
            isOneToOne: false
            referencedRelation: "modulo"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_plan_id_plan_modulo"
            columns: ["id_plan"]
            isOneToOne: false
            referencedRelation: "plan"
            referencedColumns: ["id"]
          },
        ]
      }
      profesor: {
        Row: {
          apellido: string
          correo: string | null
          created_at: string | null
          dni: string
          especialidad: string | null
          estado: boolean | null
          id: number
          id_colegio: number
          nombre: string
          sueldo: number | null
          telefono: string | null
          updated_at: string | null
        }
        Insert: {
          apellido: string
          correo?: string | null
          created_at?: string | null
          dni: string
          especialidad?: string | null
          estado?: boolean | null
          id?: never
          id_colegio: number
          nombre: string
          sueldo?: number | null
          telefono?: string | null
          updated_at?: string | null
        }
        Update: {
          apellido?: string
          correo?: string | null
          created_at?: string | null
          dni?: string
          especialidad?: string | null
          estado?: boolean | null
          id?: never
          id_colegio?: number
          nombre?: string
          sueldo?: number | null
          telefono?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_colegio_id_profesor"
            columns: ["id_colegio"]
            isOneToOne: false
            referencedRelation: "colegio"
            referencedColumns: ["id"]
          },
        ]
      }
      profesor_sucursal: {
        Row: {
          created_at: string | null
          estado: boolean | null
          fecha_fin: string | null
          fecha_inicio: string
          id: number
          id_profesor: number
          id_sucursal: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          estado?: boolean | null
          fecha_fin?: string | null
          fecha_inicio: string
          id?: never
          id_profesor: number
          id_sucursal: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          estado?: boolean | null
          fecha_fin?: string | null
          fecha_inicio?: string
          id?: never
          id_profesor?: number
          id_sucursal?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_profesor_id_profesor_sucursal"
            columns: ["id_profesor"]
            isOneToOne: false
            referencedRelation: "profesor"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_sucursal_id_profesor_sucursal"
            columns: ["id_sucursal"]
            isOneToOne: false
            referencedRelation: "sucursal"
            referencedColumns: ["id"]
          },
        ]
      }
      rol: {
        Row: {
          created_at: string | null
          descripcion: string | null
          estado: boolean | null
          id: number
          nivel_alcance: string
          nombre: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          descripcion?: string | null
          estado?: boolean | null
          id?: never
          nivel_alcance?: string
          nombre: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          descripcion?: string | null
          estado?: boolean | null
          id?: never
          nivel_alcance?: string
          nombre?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      seccion: {
        Row: {
          capacidad: number | null
          created_at: string | null
          estado: boolean | null
          id: number
          id_grado: number
          id_sucursal: number
          nombre: string
          updated_at: string | null
        }
        Insert: {
          capacidad?: number | null
          created_at?: string | null
          estado?: boolean | null
          id?: never
          id_grado: number
          id_sucursal: number
          nombre: string
          updated_at?: string | null
        }
        Update: {
          capacidad?: number | null
          created_at?: string | null
          estado?: boolean | null
          id?: never
          id_grado?: number
          id_sucursal?: number
          nombre?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_grado_id_seccion"
            columns: ["id_grado"]
            isOneToOne: false
            referencedRelation: "grado"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_sucursal_id_seccion"
            columns: ["id_sucursal"]
            isOneToOne: false
            referencedRelation: "sucursal"
            referencedColumns: ["id"]
          },
        ]
      }
      sucursal: {
        Row: {
          created_at: string | null
          direccion: string | null
          estado: boolean | null
          id: number
          id_colegio: number
          nombre: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          direccion?: string | null
          estado?: boolean | null
          id?: never
          id_colegio: number
          nombre: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          direccion?: string | null
          estado?: boolean | null
          id?: never
          id_colegio?: number
          nombre?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_colegio_id_sucursal"
            columns: ["id_colegio"]
            isOneToOne: false
            referencedRelation: "colegio"
            referencedColumns: ["id"]
          },
        ]
      }
      usuario: {
        Row: {
          apellido: string
          created_at: string | null
          estado: boolean | null
          id: string
          id_auth: string
          id_colegio: number
          id_rol: number
          nombre: string
          updated_at: string | null
        }
        Insert: {
          apellido: string
          created_at?: string | null
          estado?: boolean | null
          id?: string
          id_auth: string
          id_colegio: number
          id_rol: number
          nombre: string
          updated_at?: string | null
        }
        Update: {
          apellido?: string
          created_at?: string | null
          estado?: boolean | null
          id?: string
          id_auth?: string
          id_colegio?: number
          id_rol?: number
          nombre?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_colegio_id_usuario"
            columns: ["id_colegio"]
            isOneToOne: false
            referencedRelation: "colegio"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_rol_id_usuario"
            columns: ["id_rol"]
            isOneToOne: false
            referencedRelation: "rol"
            referencedColumns: ["id"]
          },
        ]
      }
      usuario_sucursal: {
        Row: {
          created_at: string | null
          estado: boolean | null
          id: number
          id_sucursal: number
          id_usuario: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          estado?: boolean | null
          id?: never
          id_sucursal: number
          id_usuario: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          estado?: boolean | null
          id?: never
          id_sucursal?: number
          id_usuario?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_sucursal_id_usuario_sucursal"
            columns: ["id_sucursal"]
            isOneToOne: false
            referencedRelation: "sucursal"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_usuario_id_usuario_sucursal"
            columns: ["id_usuario"]
            isOneToOne: false
            referencedRelation: "usuario"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      asignar_admin_sucursal: {
        Args: { p_id_sucursal: number; p_id_usuario: string }
        Returns: undefined
      }
      crear_admin_sucursal: {
        Args: {
          p_apellido: string
          p_correo: string
          p_id_colegio: number
          p_id_sucursal: number
          p_nombre: string
        }
        Returns: undefined
      }
      listar_grados_con_secciones: {
        Args: never
        Returns: {
          created_at: string
          estado: boolean
          id: number
          nivel: string
          nombre: string
          secciones: Json
        }[]
      }
      listar_sucursales: {
        Args: { p_id_colegio: number }
        Returns: {
          admin_apellido: string
          admin_estado: boolean
          admin_id: string
          admin_nombre: string
          created_at: string
          direccion: string
          estado: boolean
          id: number
          id_colegio: number
          nombre: string
          updated_at: string
        }[]
      }
      reset_password_admin: {
        Args: { p_id_usuario: string }
        Returns: undefined
      }
    }
    Enums: {
      ciclo_facturacion: "MENSUAL" | "TRIMESTRAL" | "SEMESTRAL" | "ANUAL"
      estado_licencia:
        | "ACTIVA"
        | "VENCIDA"
        | "SUSPENDIDA"
        | "CANCELADA"
        | "PRUEBA"
      estado_matricula: "ACTIVA" | "RETIRADA"
      estado_pago: "PENDIENTE" | "PAGADO" | "PARCIAL" | "VENCIDO" | "ANULADO"
      mes:
        | "ENERO"
        | "FEBRERO"
        | "MARZO"
        | "ABRIL"
        | "MAYO"
        | "JUNIO"
        | "JULIO"
        | "AGOSTO"
        | "SETIEMBRE"
        | "OCTUBRE"
        | "NOVIEMBRE"
        | "DICIEMBRE"
      metodo_pago: "EFECTIVO" | "TRANSFERENCIA" | "TARJETA"
      nivel: "INICIAL" | "PRIMARIA" | "SECUNDARIA"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      ciclo_facturacion: ["MENSUAL", "TRIMESTRAL", "SEMESTRAL", "ANUAL"],
      estado_licencia: [
        "ACTIVA",
        "VENCIDA",
        "SUSPENDIDA",
        "CANCELADA",
        "PRUEBA",
      ],
      estado_matricula: ["ACTIVA", "RETIRADA"],
      estado_pago: ["PENDIENTE", "PAGADO", "PARCIAL", "VENCIDO", "ANULADO"],
      mes: [
        "ENERO",
        "FEBRERO",
        "MARZO",
        "ABRIL",
        "MAYO",
        "JUNIO",
        "JULIO",
        "AGOSTO",
        "SETIEMBRE",
        "OCTUBRE",
        "NOVIEMBRE",
        "DICIEMBRE",
      ],
      metodo_pago: ["EFECTIVO", "TRANSFERENCIA", "TARJETA"],
      nivel: ["INICIAL", "PRIMARIA", "SECUNDARIA"],
    },
  },
} as const
