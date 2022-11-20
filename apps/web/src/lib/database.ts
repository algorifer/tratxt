export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export enum ProfileRole {
  Everyone,
  Member,
  Owner,
}

export enum ProjectRole {
  Everyone,
  Member,
  Maintain,
  Admin,
}

export interface Database {
  public: {
    Tables: {
      current_times: {
        Row: {
          id: string
          start: string
          author: string
          note: string
        }
        Insert: {
          id?: string
          start?: string
          author: string
          note: string
        }
        Update: {
          id?: string
          start?: string
          author?: string
          note?: string
        }
      }
      profiles: {
        Row: {
          id: string
          name: string
          url: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          url: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          url?: string
          created_at?: string
          updated_at?: string
        }
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
  }
}
