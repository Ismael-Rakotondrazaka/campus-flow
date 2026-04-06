export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      academic_sessions: {
        Row: {
          application_close_at: string
          application_open_at: string
          created_at: string
          deleted_at: string | null
          end_at: string
          id: string
          renewal_close_at: string
          renewal_open_at: string
          start_at: string
          updated_at: string
        }
        Insert: {
          application_close_at: string
          application_open_at: string
          created_at?: string
          deleted_at?: string | null
          end_at: string
          id?: string
          renewal_close_at: string
          renewal_open_at: string
          start_at: string
          updated_at?: string
        }
        Update: {
          application_close_at?: string
          application_open_at?: string
          created_at?: string
          deleted_at?: string | null
          end_at?: string
          id?: string
          renewal_close_at?: string
          renewal_open_at?: string
          start_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      admins: {
        Row: {
          created_at: string
          deleted_at: string | null
          first_name: string
          id: string
          image_url: string
          last_name: string
          phone_number: string
          role: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          first_name: string
          id: string
          image_url: string
          last_name: string
          phone_number: string
          role: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          first_name?: string
          id?: string
          image_url?: string
          last_name?: string
          phone_number?: string
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
      announcements: {
        Row: {
          content: string
          created_at: string
          deleted_at: string | null
          end_at: string | null
          id: string
          illustration_url: string | null
          start_at: string | null
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          deleted_at?: string | null
          end_at?: string | null
          id?: string
          illustration_url?: string | null
          start_at?: string | null
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          deleted_at?: string | null
          end_at?: string | null
          id?: string
          illustration_url?: string | null
          start_at?: string | null
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      buildings: {
        Row: {
          created_at: string
          deleted_at: string | null
          floors: number
          id: string
          illustration_url: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          floors: number
          id?: string
          illustration_url: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          floors?: number
          id?: string
          illustration_url?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      faculties: {
        Row: {
          created_at: string
          deleted_at: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      housing_applications: {
        Row: {
          academic_session_id: string
          admin_id: string | null
          created_at: string
          deleted_at: string | null
          email: string
          emergency_number: string
          faculty_id: string
          first_name: string
          gender: string
          id: string
          image_url: string
          last_name: string
          lodgment_id: string | null
          nic: string
          nic_url: string
          origin: string
          phone_number: string
          refusal_reason: string | null
          school_certificate_url: string
          status: string
          updated_at: string
        }
        Insert: {
          academic_session_id: string
          admin_id?: string | null
          created_at?: string
          deleted_at?: string | null
          email: string
          emergency_number: string
          faculty_id: string
          first_name: string
          gender: string
          id?: string
          image_url: string
          last_name: string
          lodgment_id?: string | null
          nic: string
          nic_url: string
          origin: string
          phone_number: string
          refusal_reason?: string | null
          school_certificate_url: string
          status?: string
          updated_at?: string
        }
        Update: {
          academic_session_id?: string
          admin_id?: string | null
          created_at?: string
          deleted_at?: string | null
          email?: string
          emergency_number?: string
          faculty_id?: string
          first_name?: string
          gender?: string
          id?: string
          image_url?: string
          last_name?: string
          lodgment_id?: string | null
          nic?: string
          nic_url?: string
          origin?: string
          phone_number?: string
          refusal_reason?: string | null
          school_certificate_url?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "housing_applications_academic_session_id_fkey"
            columns: ["academic_session_id"]
            isOneToOne: false
            referencedRelation: "academic_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "housing_applications_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "admins"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "housing_applications_faculty_id_fkey"
            columns: ["faculty_id"]
            isOneToOne: false
            referencedRelation: "faculties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "housing_applications_lodgment_id_fkey"
            columns: ["lodgment_id"]
            isOneToOne: false
            referencedRelation: "lodgments"
            referencedColumns: ["id"]
          },
        ]
      }
      lodgments: {
        Row: {
          building_id: string
          capacity: number
          capacity_remaining: number
          created_at: string
          deleted_at: string | null
          floor: number
          id: string
          residents_count: number
          room_number: number
          status: string
          updated_at: string
        }
        Insert: {
          building_id: string
          capacity: number
          capacity_remaining?: number
          created_at?: string
          deleted_at?: string | null
          floor: number
          id?: string
          residents_count?: number
          room_number: number
          status?: string
          updated_at?: string
        }
        Update: {
          building_id?: string
          capacity?: number
          capacity_remaining?: number
          created_at?: string
          deleted_at?: string | null
          floor?: number
          id?: string
          residents_count?: number
          room_number?: number
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "lodgments_building_id_fkey"
            columns: ["building_id"]
            isOneToOne: false
            referencedRelation: "buildings"
            referencedColumns: ["id"]
          },
        ]
      }
      maintainers: {
        Row: {
          created_at: string
          deleted_at: string | null
          first_name: string
          id: string
          image_url: string
          last_name: string
          phone_number: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          first_name: string
          id?: string
          image_url: string
          last_name: string
          phone_number: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          first_name?: string
          id?: string
          image_url?: string
          last_name?: string
          phone_number?: string
          updated_at?: string
        }
        Relationships: []
      }
      maintenance_maintainers: {
        Row: {
          assigned_at: string
          maintainer_id: string
          maintenance_id: string
        }
        Insert: {
          assigned_at?: string
          maintainer_id: string
          maintenance_id: string
        }
        Update: {
          assigned_at?: string
          maintainer_id?: string
          maintenance_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "maintenance_maintainers_maintainer_id_fkey"
            columns: ["maintainer_id"]
            isOneToOne: false
            referencedRelation: "maintainers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "maintenance_maintainers_maintenance_id_fkey"
            columns: ["maintenance_id"]
            isOneToOne: false
            referencedRelation: "maintenances"
            referencedColumns: ["id"]
          },
        ]
      }
      maintenances: {
        Row: {
          admin_id: string | null
          created_at: string
          deleted_at: string | null
          description: string | null
          end_at: string | null
          id: string
          lodgment_id: string
          resident_id: string
          start_at: string | null
          status: string
          type: string
          updated_at: string
        }
        Insert: {
          admin_id?: string | null
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          end_at?: string | null
          id?: string
          lodgment_id: string
          resident_id: string
          start_at?: string | null
          status?: string
          type: string
          updated_at?: string
        }
        Update: {
          admin_id?: string | null
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          end_at?: string | null
          id?: string
          lodgment_id?: string
          resident_id?: string
          start_at?: string | null
          status?: string
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "maintenances_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "admins"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "maintenances_lodgment_id_fkey"
            columns: ["lodgment_id"]
            isOneToOne: false
            referencedRelation: "lodgments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "maintenances_resident_id_fkey"
            columns: ["resident_id"]
            isOneToOne: false
            referencedRelation: "residents"
            referencedColumns: ["id"]
          },
        ]
      }
      renewals: {
        Row: {
          academic_session_id: string
          admin_id: string | null
          created_at: string
          deleted_at: string | null
          emergency_number: string
          faculty_id: string
          id: string
          image_url: string
          nic_url: string
          phone_number: string
          refusal_reason: string | null
          resident_id: string
          school_certificate_url: string
          status: string
          updated_at: string
        }
        Insert: {
          academic_session_id: string
          admin_id?: string | null
          created_at?: string
          deleted_at?: string | null
          emergency_number: string
          faculty_id: string
          id?: string
          image_url: string
          nic_url: string
          phone_number: string
          refusal_reason?: string | null
          resident_id: string
          school_certificate_url: string
          status?: string
          updated_at?: string
        }
        Update: {
          academic_session_id?: string
          admin_id?: string | null
          created_at?: string
          deleted_at?: string | null
          emergency_number?: string
          faculty_id?: string
          id?: string
          image_url?: string
          nic_url?: string
          phone_number?: string
          refusal_reason?: string | null
          resident_id?: string
          school_certificate_url?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "renewals_academic_session_id_fkey"
            columns: ["academic_session_id"]
            isOneToOne: false
            referencedRelation: "academic_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "renewals_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "admins"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "renewals_faculty_id_fkey"
            columns: ["faculty_id"]
            isOneToOne: false
            referencedRelation: "faculties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "renewals_resident_id_fkey"
            columns: ["resident_id"]
            isOneToOne: false
            referencedRelation: "residents"
            referencedColumns: ["id"]
          },
        ]
      }
      residents: {
        Row: {
          academic_session_id: string
          created_at: string
          deleted_at: string | null
          emergency_number: string
          faculty_id: string
          first_name: string
          gender: string
          id: string
          image_url: string
          last_name: string
          lodgment_id: string | null
          nic: string
          origin: string
          phone_number: string
          updated_at: string
        }
        Insert: {
          academic_session_id: string
          created_at?: string
          deleted_at?: string | null
          emergency_number: string
          faculty_id: string
          first_name: string
          gender: string
          id: string
          image_url: string
          last_name: string
          lodgment_id?: string | null
          nic: string
          origin: string
          phone_number: string
          updated_at?: string
        }
        Update: {
          academic_session_id?: string
          created_at?: string
          deleted_at?: string | null
          emergency_number?: string
          faculty_id?: string
          first_name?: string
          gender?: string
          id?: string
          image_url?: string
          last_name?: string
          lodgment_id?: string | null
          nic?: string
          origin?: string
          phone_number?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "residents_academic_session_id_fkey"
            columns: ["academic_session_id"]
            isOneToOne: false
            referencedRelation: "academic_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "residents_faculty_id_fkey"
            columns: ["faculty_id"]
            isOneToOne: false
            referencedRelation: "faculties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "residents_lodgment_id_fkey"
            columns: ["lodgment_id"]
            isOneToOne: false
            referencedRelation: "lodgments"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_admin_role: { Args: { p_role: string }; Returns: boolean }
      is_admin: { Args: never; Returns: boolean }
      is_resident: { Args: never; Returns: boolean }
      update_lodgment_occupancy: {
        Args: { lodgment_id_param: string }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
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
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const

