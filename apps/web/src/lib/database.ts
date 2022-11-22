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
        }
        Insert: {
          id?: string
          start?: string
          author: string
        }
        Update: {
          id?: string
          start?: string
          author?: string
        }
      }
      profiles: {
        Row: {
          id: string
          name: string
          url: string
          description: string | null
          site: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          url: string
          description?: string
          site?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          url?: string
          description?: string
          site?: string
          created_at?: string
          updated_at?: string
        }
      }
      records: {
        Row: {
          hash: string
          author: string
          date: string
          body: string
          time: number
          team: string | null
          project: string | null
          channel: string | null
          tags: string[]
          mood: string | null
          private: boolean
        }
        Insert: {
          hash: string
          author: string
          body: string
          date?: string
          time?: number
          team?: string
          project?: string
          channel?: string
          tags?: string[]
          mood?: string
          private?: boolean
        }
        Update: {
          hash?: string
          author?: string
          date?: string
          body?: string
          time?: number
          team?: string
          project?: string
          channel?: string
          tags?: string[]
          mood?: string
          private?: boolean
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
