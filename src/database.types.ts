export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      clinics: {
        Row: {
          created_at: string
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      documents: {
        Row: {
          created_at: string
          path: string
          patient_id: number | null
        }
        Insert: {
          created_at?: string
          path: string
          patient_id?: number | null
        }
        Update: {
          created_at?: string
          path?: string
          patient_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_patient_id_fkey"
            columns: ["patient_id"]
            referencedRelation: "patients"
            referencedColumns: ["id"]
          }
        ]
      }
      patients: {
        Row: {
          birthday: string | null
          clinic_id: number
          created_at: string
          id: number
          name: string
          phone_number: string | null
        }
        Insert: {
          birthday?: string | null
          clinic_id: number
          created_at?: string
          id?: number
          name: string
          phone_number?: string | null
        }
        Update: {
          birthday?: string | null
          clinic_id?: number
          created_at?: string
          id?: number
          name?: string
          phone_number?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "patients_clinic_id_fkey"
            columns: ["clinic_id"]
            referencedRelation: "clinics"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
