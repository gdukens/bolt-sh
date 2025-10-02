/*
  # Arkan Infinity Core Database Schema

  ## Overview
  Complete database schema for Arkan Infinity - a professional social network for accessibility 
  and sign language communities with multimodal communication features.

  ## New Tables Created

  ### User Profile & Settings
  - `profiles` - Extended user profiles with accessibility preferences
  - `user_settings` - User-specific settings (languages, accessibility options)
  - `user_devices` - Connected Bluetooth devices for each user
  - `emergency_contacts` - SOS emergency contact information

  ### Social Networking
  - `connections` - User connections (similar to LinkedIn connections)
  - `connection_requests` - Pending connection requests
  - `posts` - Main feed posts with support for various content types
  - `post_attachments` - Media, videos, documents attached to posts
  - `post_reactions` - Likes, reactions to posts
  - `comments` - Comments on posts
  - `shares` - Post sharing tracking

  ### Messaging
  - `conversations` - Chat conversations between users
  - `conversation_participants` - Members of each conversation
  - `messages` - Individual messages (text, sign video, avatar)

  ### Education & Learning
  - `courses` - Sign language courses and learning paths
  - `course_enrollments` - User course enrollments and progress
  - `user_word_library` - Personal vocabulary/sign library
  - `practice_sessions` - Practice session tracking
  - `achievements` - User achievements and badges

  ### Accessibility Features
  - `sign_captures` - Recorded sign language videos
  - `avatars` - User-created avatars for sign language translation
  - `accessibility_logs` - Usage logs for accessibility features

  ### Professional Features
  - `companies` - Company pages
  - `jobs` - Job postings
  - `job_applications` - Job application tracking
  - `communities` - Community groups

  ## Security
  All tables have Row Level Security (RLS) enabled with appropriate policies for:
  - Authenticated user access
  - Ownership verification
  - Privacy controls
  - Connection-based visibility
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- USER PROFILES & SETTINGS
-- ============================================================================

-- Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  display_name text,
  bio text,
  avatar_url text,
  cover_image_url text,
  occupation text,
  company text,
  location text,
  website text,
  
  -- Onboarding data
  age_range text,
  disability_status text[] DEFAULT '{}',
  assistive_tech text[] DEFAULT '{}',
  interests text[] DEFAULT '{}',
  
  -- Stats
  connection_count integer DEFAULT 0,
  post_count integer DEFAULT 0,
  follower_count integer DEFAULT 0,
  
  -- Metadata
  onboarding_completed boolean DEFAULT false,
  is_verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- User settings
CREATE TABLE IF NOT EXISTS user_settings (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  
  -- Language preferences
  spoken_language text DEFAULT 'English',
  sign_language text DEFAULT 'ASL',
  sign_language_proficiency text,
  
  -- Accessibility settings
  dark_mode boolean DEFAULT false,
  high_contrast boolean DEFAULT false,
  text_size text DEFAULT 'medium',
  auto_captions boolean DEFAULT true,
  haptic_feedback boolean DEFAULT true,
  
  -- Privacy settings
  profile_visibility text DEFAULT 'public',
  show_activity boolean DEFAULT true,
  allow_messages_from text DEFAULT 'connections',
  
  -- Notification preferences
  email_notifications boolean DEFAULT true,
  push_notifications boolean DEFAULT true,
  
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  UNIQUE(user_id)
);

-- Connected devices
CREATE TABLE IF NOT EXISTS user_devices (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  device_name text NOT NULL,
  device_type text NOT NULL,
  battery_level integer,
  last_sync timestamptz DEFAULT now(),
  is_connected boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Emergency contacts
CREATE TABLE IF NOT EXISTS emergency_contacts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  contact_name text NOT NULL,
  contact_phone text NOT NULL,
  contact_email text,
  relationship text,
  priority_order integer DEFAULT 1,
  created_at timestamptz DEFAULT now()
);

-- ============================================================================
-- SOCIAL NETWORKING
-- ============================================================================

-- Connections (mutual connections between users)
CREATE TABLE IF NOT EXISTS connections (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id_1 uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  user_id_2 uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  connected_at timestamptz DEFAULT now(),
  
  UNIQUE(user_id_1, user_id_2),
  CHECK (user_id_1 < user_id_2)
);

-- Connection requests
CREATE TABLE IF NOT EXISTS connection_requests (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  requester_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  requestee_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  message text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'cancelled')),
  created_at timestamptz DEFAULT now(),
  responded_at timestamptz,
  
  UNIQUE(requester_id, requestee_id)
);

-- Posts
CREATE TABLE IF NOT EXISTS posts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  content text NOT NULL,
  post_type text DEFAULT 'text' CHECK (post_type IN ('text', 'media', 'asl', 'job', 'event', 'document', 'poll', 'celebrate')),
  
  -- Engagement metrics
  like_count integer DEFAULT 0,
  comment_count integer DEFAULT 0,
  share_count integer DEFAULT 0,
  view_count integer DEFAULT 0,
  
  -- Metadata
  is_public boolean DEFAULT true,
  is_archived boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Post attachments
CREATE TABLE IF NOT EXISTS post_attachments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id uuid REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
  attachment_type text NOT NULL CHECK (attachment_type IN ('image', 'video', 'document', 'sign_video', 'avatar_video')),
  url text NOT NULL,
  thumbnail_url text,
  duration integer,
  file_size integer,
  mime_type text,
  created_at timestamptz DEFAULT now()
);

-- Post reactions
CREATE TABLE IF NOT EXISTS post_reactions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id uuid REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  reaction_type text DEFAULT 'like' CHECK (reaction_type IN ('like', 'love', 'celebrate', 'support', 'insightful')),
  created_at timestamptz DEFAULT now(),
  
  UNIQUE(post_id, user_id)
);

-- Comments
CREATE TABLE IF NOT EXISTS comments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id uuid REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
  author_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  parent_comment_id uuid REFERENCES comments(id) ON DELETE CASCADE,
  content text NOT NULL,
  like_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Shares
CREATE TABLE IF NOT EXISTS shares (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id uuid REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  comment text,
  created_at timestamptz DEFAULT now(),
  
  UNIQUE(post_id, user_id, created_at)
);

-- ============================================================================
-- MESSAGING
-- ============================================================================

-- Conversations
CREATE TABLE IF NOT EXISTS conversations (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_type text DEFAULT 'direct' CHECK (conversation_type IN ('direct', 'group')),
  name text,
  created_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Conversation participants
CREATE TABLE IF NOT EXISTS conversation_participants (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id uuid REFERENCES conversations(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  joined_at timestamptz DEFAULT now(),
  last_read_at timestamptz DEFAULT now(),
  is_active boolean DEFAULT true,
  
  UNIQUE(conversation_id, user_id)
);

-- Messages
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id uuid REFERENCES conversations(id) ON DELETE CASCADE NOT NULL,
  sender_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  content text,
  message_type text DEFAULT 'text' CHECK (message_type IN ('text', 'sign_video', 'avatar', 'image', 'file')),
  attachment_url text,
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ============================================================================
-- EDUCATION & LEARNING
-- ============================================================================

-- Courses
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  description text,
  language text NOT NULL,
  level text NOT NULL CHECK (level IN ('Beginner', 'Intermediate', 'Advanced')),
  instructor_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  total_lessons integer DEFAULT 0,
  duration_hours integer,
  thumbnail_url text,
  is_published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Course enrollments
CREATE TABLE IF NOT EXISTS course_enrollments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  progress integer DEFAULT 0,
  completed_lessons integer DEFAULT 0,
  started_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  last_activity_at timestamptz DEFAULT now(),
  
  UNIQUE(course_id, user_id)
);

-- User word library
CREATE TABLE IF NOT EXISTS user_word_library (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  word text NOT NULL,
  category text NOT NULL,
  video_url text,
  accuracy_score integer DEFAULT 0,
  practice_count integer DEFAULT 0,
  streak_days integer DEFAULT 0,
  last_practiced_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Practice sessions
CREATE TABLE IF NOT EXISTS practice_sessions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  session_type text CHECK (session_type IN ('quick', 'focus', 'category', 'course')),
  words_practiced integer DEFAULT 0,
  accuracy_score integer DEFAULT 0,
  duration_seconds integer,
  created_at timestamptz DEFAULT now()
);

-- Achievements
CREATE TABLE IF NOT EXISTS achievements (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  achievement_type text NOT NULL,
  title text NOT NULL,
  description text,
  icon text,
  earned_at timestamptz DEFAULT now()
);

-- ============================================================================
-- ACCESSIBILITY FEATURES
-- ============================================================================

-- Sign captures
CREATE TABLE IF NOT EXISTS sign_captures (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  video_url text NOT NULL,
  transcription text,
  detected_signs text[] DEFAULT '{}',
  confidence_score integer,
  duration_seconds integer,
  created_at timestamptz DEFAULT now()
);

-- Avatars
CREATE TABLE IF NOT EXISTS avatars (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  avatar_type text DEFAULT 'professional',
  avatar_data jsonb,
  thumbnail_url text,
  is_default boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Accessibility logs
CREATE TABLE IF NOT EXISTS accessibility_logs (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  feature_type text NOT NULL CHECK (feature_type IN ('sign_capture', 'avatar', 'speech_to_text', 'text_to_speech')),
  action text NOT NULL,
  metadata jsonb,
  created_at timestamptz DEFAULT now()
);

-- ============================================================================
-- PROFESSIONAL FEATURES
-- ============================================================================

-- Companies
CREATE TABLE IF NOT EXISTS companies (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  description text,
  industry text,
  size_range text,
  website text,
  logo_url text,
  cover_image_url text,
  location text,
  created_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  follower_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Jobs
CREATE TABLE IF NOT EXISTS jobs (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id uuid REFERENCES companies(id) ON DELETE CASCADE NOT NULL,
  posted_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  title text NOT NULL,
  description text NOT NULL,
  job_type text CHECK (job_type IN ('full_time', 'part_time', 'contract', 'internship')),
  location text,
  remote_option text CHECK (remote_option IN ('on_site', 'remote', 'hybrid')),
  salary_range text,
  required_skills text[] DEFAULT '{}',
  accessibility_features text[] DEFAULT '{}',
  application_count integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  expires_at timestamptz
);

-- Job applications
CREATE TABLE IF NOT EXISTS job_applications (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id uuid REFERENCES jobs(id) ON DELETE CASCADE NOT NULL,
  applicant_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  cover_letter text,
  resume_url text,
  status text DEFAULT 'submitted' CHECK (status IN ('submitted', 'reviewed', 'interviewing', 'offered', 'rejected', 'withdrawn')),
  applied_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  UNIQUE(job_id, applicant_id)
);

-- Communities
CREATE TABLE IF NOT EXISTS communities (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  description text,
  category text,
  icon_url text,
  cover_image_url text,
  member_count integer DEFAULT 0,
  created_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  is_public boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Community members
CREATE TABLE IF NOT EXISTS community_members (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  community_id uuid REFERENCES communities(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  role text DEFAULT 'member' CHECK (role IN ('member', 'moderator', 'admin')),
  joined_at timestamptz DEFAULT now(),
  
  UNIQUE(community_id, user_id)
);

-- ============================================================================
-- ENABLE ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE emergency_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE connection_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE shares ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversation_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_word_library ENABLE ROW LEVEL SECURITY;
ALTER TABLE practice_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE sign_captures ENABLE ROW LEVEL SECURITY;
ALTER TABLE avatars ENABLE ROW LEVEL SECURITY;
ALTER TABLE accessibility_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE communities ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_members ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================================================

-- Profiles: Public read, own profile edit
CREATE POLICY "Profiles are viewable by everyone"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- User Settings: Own settings only
CREATE POLICY "Users can view own settings"
  ON user_settings FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own settings"
  ON user_settings FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can insert own settings"
  ON user_settings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- User Devices: Own devices only
CREATE POLICY "Users can view own devices"
  ON user_devices FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own devices"
  ON user_devices FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Emergency Contacts: Own contacts only
CREATE POLICY "Users can view own emergency contacts"
  ON emergency_contacts FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own emergency contacts"
  ON emergency_contacts FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Connections: View if involved
CREATE POLICY "Users can view their connections"
  ON connections FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id_1 OR auth.uid() = user_id_2);

CREATE POLICY "Users can create connections"
  ON connections FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id_1 OR auth.uid() = user_id_2);

CREATE POLICY "Users can delete their connections"
  ON connections FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id_1 OR auth.uid() = user_id_2);

-- Connection Requests
CREATE POLICY "Users can view connection requests involving them"
  ON connection_requests FOR SELECT
  TO authenticated
  USING (auth.uid() = requester_id OR auth.uid() = requestee_id);

CREATE POLICY "Users can create connection requests"
  ON connection_requests FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = requester_id);

CREATE POLICY "Users can update requests they're involved in"
  ON connection_requests FOR UPDATE
  TO authenticated
  USING (auth.uid() = requester_id OR auth.uid() = requestee_id)
  WITH CHECK (auth.uid() = requester_id OR auth.uid() = requestee_id);

-- Posts: Public or connection-based visibility
CREATE POLICY "Users can view public posts"
  ON posts FOR SELECT
  TO authenticated
  USING (is_public = true OR auth.uid() = author_id);

CREATE POLICY "Users can create own posts"
  ON posts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update own posts"
  ON posts FOR UPDATE
  TO authenticated
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can delete own posts"
  ON posts FOR DELETE
  TO authenticated
  USING (auth.uid() = author_id);

-- Post Attachments
CREATE POLICY "Users can view attachments of visible posts"
  ON post_attachments FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM posts
      WHERE posts.id = post_attachments.post_id
      AND (posts.is_public = true OR posts.author_id = auth.uid())
    )
  );

CREATE POLICY "Users can manage attachments for own posts"
  ON post_attachments FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM posts
      WHERE posts.id = post_attachments.post_id
      AND posts.author_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM posts
      WHERE posts.id = post_attachments.post_id
      AND posts.author_id = auth.uid()
    )
  );

-- Post Reactions
CREATE POLICY "Users can view reactions on visible posts"
  ON post_reactions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage own reactions"
  ON post_reactions FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Comments
CREATE POLICY "Users can view comments on visible posts"
  ON comments FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create comments"
  ON comments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update own comments"
  ON comments FOR UPDATE
  TO authenticated
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can delete own comments"
  ON comments FOR DELETE
  TO authenticated
  USING (auth.uid() = author_id);

-- Shares
CREATE POLICY "Users can view shares"
  ON shares FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create shares"
  ON shares FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Messages & Conversations
CREATE POLICY "Users can view conversations they're part of"
  ON conversations FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM conversation_participants
      WHERE conversation_participants.conversation_id = conversations.id
      AND conversation_participants.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create conversations"
  ON conversations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Participants can view their participation"
  ON conversation_participants FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can add participants to conversations they created"
  ON conversation_participants FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM conversations
      WHERE conversations.id = conversation_participants.conversation_id
      AND conversations.created_by = auth.uid()
    )
  );

CREATE POLICY "Users can view messages in their conversations"
  ON messages FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM conversation_participants
      WHERE conversation_participants.conversation_id = messages.conversation_id
      AND conversation_participants.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can send messages in their conversations"
  ON messages FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = sender_id
    AND EXISTS (
      SELECT 1 FROM conversation_participants
      WHERE conversation_participants.conversation_id = messages.conversation_id
      AND conversation_participants.user_id = auth.uid()
    )
  );

-- Courses
CREATE POLICY "Users can view published courses"
  ON courses FOR SELECT
  TO authenticated
  USING (is_published = true OR auth.uid() = instructor_id);

CREATE POLICY "Instructors can manage their courses"
  ON courses FOR ALL
  TO authenticated
  USING (auth.uid() = instructor_id)
  WITH CHECK (auth.uid() = instructor_id);

-- Course Enrollments
CREATE POLICY "Users can view own enrollments"
  ON course_enrollments FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own enrollments"
  ON course_enrollments FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- User Word Library
CREATE POLICY "Users can manage own word library"
  ON user_word_library FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Practice Sessions
CREATE POLICY "Users can view own practice sessions"
  ON practice_sessions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create practice sessions"
  ON practice_sessions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Achievements
CREATE POLICY "Users can view own achievements"
  ON achievements FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "System can create achievements"
  ON achievements FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Sign Captures
CREATE POLICY "Users can manage own sign captures"
  ON sign_captures FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Avatars
CREATE POLICY "Users can manage own avatars"
  ON avatars FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Accessibility Logs
CREATE POLICY "Users can view own accessibility logs"
  ON accessibility_logs FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "System can create accessibility logs"
  ON accessibility_logs FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Companies
CREATE POLICY "Users can view companies"
  ON companies FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Company creators can manage their companies"
  ON companies FOR ALL
  TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

-- Jobs
CREATE POLICY "Users can view active jobs"
  ON jobs FOR SELECT
  TO authenticated
  USING (is_active = true);

CREATE POLICY "Job posters can manage their jobs"
  ON jobs FOR ALL
  TO authenticated
  USING (auth.uid() = posted_by)
  WITH CHECK (auth.uid() = posted_by);

-- Job Applications
CREATE POLICY "Users can view own applications"
  ON job_applications FOR SELECT
  TO authenticated
  USING (auth.uid() = applicant_id);

CREATE POLICY "Users can create applications"
  ON job_applications FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = applicant_id);

CREATE POLICY "Users can update own applications"
  ON job_applications FOR UPDATE
  TO authenticated
  USING (auth.uid() = applicant_id)
  WITH CHECK (auth.uid() = applicant_id);

-- Communities
CREATE POLICY "Users can view public communities"
  ON communities FOR SELECT
  TO authenticated
  USING (is_public = true);

CREATE POLICY "Community creators can manage communities"
  ON communities FOR ALL
  TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

-- Community Members
CREATE POLICY "Users can view community members"
  ON community_members FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage own memberships"
  ON community_members FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_posts_author ON posts(author_id);
CREATE INDEX IF NOT EXISTS idx_posts_created ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_connections_users ON connections(user_id_1, user_id_2);
CREATE INDEX IF NOT EXISTS idx_messages_conversation ON messages(conversation_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_word_library_user ON user_word_library(user_id);
CREATE INDEX IF NOT EXISTS idx_course_enrollments_user ON course_enrollments(user_id);
