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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      app_settings: {
        Row: {
          data: Json
          id: number
          updated_at: string
        }
        Insert: {
          data?: Json
          id?: number
          updated_at?: string
        }
        Update: {
          data?: Json
          id?: number
          updated_at?: string
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string
          icon_key: string | null
          id: string
          name: string
          position: number
        }
        Insert: {
          created_at?: string
          icon_key?: string | null
          id: string
          name: string
          position?: number
        }
        Update: {
          created_at?: string
          icon_key?: string | null
          id?: string
          name?: string
          position?: number
        }
        Relationships: []
      }
      facebook_posts: {
        Row: {
          caption: string
          id: string
          posted_at: string
          product_id: string
          product_image: string | null
          product_name: string
          status: string
        }
        Insert: {
          caption?: string
          id: string
          posted_at?: string
          product_id: string
          product_image?: string | null
          product_name: string
          status?: string
        }
        Update: {
          caption?: string
          id?: string
          posted_at?: string
          product_id?: string
          product_image?: string | null
          product_name?: string
          status?: string
        }
        Relationships: []
      }
      hero_slides: {
        Row: {
          active: boolean
          badge: string | null
          created_at: string
          cta: string
          hue: number | null
          id: string
          image: string | null
          link: string | null
          position: number
          subtitle: string
          title: string
        }
        Insert: {
          active?: boolean
          badge?: string | null
          created_at?: string
          cta?: string
          hue?: number | null
          id: string
          image?: string | null
          link?: string | null
          position?: number
          subtitle?: string
          title?: string
        }
        Update: {
          active?: boolean
          badge?: string | null
          created_at?: string
          cta?: string
          hue?: number | null
          id?: string
          image?: string | null
          link?: string | null
          position?: number
          subtitle?: string
          title?: string
        }
        Relationships: []
      }
      orders: {
        Row: {
          created_at: string
          delivery: Json
          id: string
          items: Json
          payment: Json
          status: string
          subtotal: number
          total: number
          tva: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          delivery?: Json
          id: string
          items?: Json
          payment?: Json
          status?: string
          subtotal?: number
          total?: number
          tva?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          delivery?: Json
          id?: string
          items?: Json
          payment?: Json
          status?: string
          subtotal?: number
          total?: number
          tva?: number
          updated_at?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          active: boolean
          badge: string | null
          brand: string
          category: string
          created_at: string
          description: string
          facebook_posted_at: string | null
          facebook_status: string | null
          featured: boolean
          id: string
          images: Json
          is_new: boolean
          name: string
          old_price: number | null
          popularity: number
          price: number
          publish_facebook: boolean
          sku: string
          specs: Json
          stock: number
          subcategory: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          badge?: string | null
          brand?: string
          category: string
          created_at?: string
          description?: string
          facebook_posted_at?: string | null
          facebook_status?: string | null
          featured?: boolean
          id: string
          images?: Json
          is_new?: boolean
          name: string
          old_price?: number | null
          popularity?: number
          price?: number
          publish_facebook?: boolean
          sku?: string
          specs?: Json
          stock?: number
          subcategory: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          badge?: string | null
          brand?: string
          category?: string
          created_at?: string
          description?: string
          facebook_posted_at?: string | null
          facebook_status?: string | null
          featured?: boolean
          id?: string
          images?: Json
          is_new?: boolean
          name?: string
          old_price?: number | null
          popularity?: number
          price?: number
          publish_facebook?: boolean
          sku?: string
          specs?: Json
          stock?: number
          subcategory?: string
          updated_at?: string
        }
        Relationships: []
      }
      subcategories: {
        Row: {
          category_id: string
          created_at: string
          id: string
          name: string
          position: number
        }
        Insert: {
          category_id: string
          created_at?: string
          id: string
          name: string
          position?: number
        }
        Update: {
          category_id?: string
          created_at?: string
          id?: string
          name?: string
          position?: number
        }
        Relationships: [
          {
            foreignKeyName: "subcategories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
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
      app_role: ["admin", "user"],
    },
  },
} as const
