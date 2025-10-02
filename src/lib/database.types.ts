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
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string
          display_name: string | null
          bio: string | null
          avatar_url: string | null
          cover_image_url: string | null
          occupation: string | null
          company: string | null
          location: string | null
          website: string | null
          age_range: string | null
          disability_status: string[]
          assistive_tech: string[]
          interests: string[]
          connection_count: number
          post_count: number
          follower_count: number
          onboarding_completed: boolean
          is_verified: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name: string
          display_name?: string | null
          bio?: string | null
          avatar_url?: string | null
          cover_image_url?: string | null
          occupation?: string | null
          company?: string | null
          location?: string | null
          website?: string | null
          age_range?: string | null
          disability_status?: string[]
          assistive_tech?: string[]
          interests?: string[]
          connection_count?: number
          post_count?: number
          follower_count?: number
          onboarding_completed?: boolean
          is_verified?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          display_name?: string | null
          bio?: string | null
          avatar_url?: string | null
          cover_image_url?: string | null
          occupation?: string | null
          company?: string | null
          location?: string | null
          website?: string | null
          age_range?: string | null
          disability_status?: string[]
          assistive_tech?: string[]
          interests?: string[]
          connection_count?: number
          post_count?: number
          follower_count?: number
          onboarding_completed?: boolean
          is_verified?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      user_settings: {
        Row: {
          id: string
          user_id: string
          spoken_language: string
          sign_language: string
          sign_language_proficiency: string | null
          dark_mode: boolean
          high_contrast: boolean
          text_size: string
          auto_captions: boolean
          haptic_feedback: boolean
          profile_visibility: string
          show_activity: boolean
          allow_messages_from: string
          email_notifications: boolean
          push_notifications: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          spoken_language?: string
          sign_language?: string
          sign_language_proficiency?: string | null
          dark_mode?: boolean
          high_contrast?: boolean
          text_size?: string
          auto_captions?: boolean
          haptic_feedback?: boolean
          profile_visibility?: string
          show_activity?: boolean
          allow_messages_from?: string
          email_notifications?: boolean
          push_notifications?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          spoken_language?: string
          sign_language?: string
          sign_language_proficiency?: string | null
          dark_mode?: boolean
          high_contrast?: boolean
          text_size?: string
          auto_captions?: boolean
          haptic_feedback?: boolean
          profile_visibility?: string
          show_activity?: boolean
          allow_messages_from?: string
          email_notifications?: boolean
          push_notifications?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      posts: {
        Row: {
          id: string
          author_id: string
          content: string
          post_type: string
          like_count: number
          comment_count: number
          share_count: number
          view_count: number
          is_public: boolean
          is_archived: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          author_id: string
          content: string
          post_type?: string
          like_count?: number
          comment_count?: number
          share_count?: number
          view_count?: number
          is_public?: boolean
          is_archived?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          author_id?: string
          content?: string
          post_type?: string
          like_count?: number
          comment_count?: number
          share_count?: number
          view_count?: number
          is_public?: boolean
          is_archived?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      connections: {
        Row: {
          id: string
          user_id_1: string
          user_id_2: string
          connected_at: string
        }
        Insert: {
          id?: string
          user_id_1: string
          user_id_2: string
          connected_at?: string
        }
        Update: {
          id?: string
          user_id_1?: string
          user_id_2?: string
          connected_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          conversation_id: string
          sender_id: string
          content: string | null
          message_type: string
          attachment_url: string | null
          is_read: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          conversation_id: string
          sender_id: string
          content?: string | null
          message_type?: string
          attachment_url?: string | null
          is_read?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          conversation_id?: string
          sender_id?: string
          content?: string | null
          message_type?: string
          attachment_url?: string | null
          is_read?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
