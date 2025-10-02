# Arkan Infinity Backend Documentation

## Overview

Complete backend implementation for Arkan Infinity - a professional social network for accessibility and sign language communities with multimodal communication features.

## Architecture

### Database (Supabase PostgreSQL)

The backend uses Supabase as the complete backend-as-a-service solution, providing:
- PostgreSQL database with Row Level Security (RLS)
- Built-in authentication
- Real-time subscriptions
- RESTful API
- File storage capabilities

### Database Schema

#### Core Tables

**User Management**
- `profiles` - Extended user profiles with accessibility preferences
- `user_settings` - User-specific settings (languages, accessibility options)
- `user_devices` - Connected Bluetooth devices for each user
- `emergency_contacts` - SOS emergency contact information

**Social Networking**
- `connections` - Mutual connections between users (similar to LinkedIn)
- `connection_requests` - Pending connection requests with status tracking
- `posts` - Main feed posts with support for various content types
- `post_attachments` - Media, videos, documents attached to posts
- `post_reactions` - Likes and reactions to posts
- `comments` - Nested comments on posts
- `shares` - Post sharing tracking

**Messaging**
- `conversations` - Chat conversations (direct and group)
- `conversation_participants` - Members of each conversation
- `messages` - Individual messages (text, sign video, avatar)

**Education & Learning**
- `courses` - Sign language courses and learning paths
- `course_enrollments` - User course enrollments with progress tracking
- `user_word_library` - Personal vocabulary/sign library
- `practice_sessions` - Practice session tracking with metrics
- `achievements` - User achievements and badges

**Accessibility Features**
- `sign_captures` - Recorded sign language videos with transcription
- `avatars` - User-created avatars for sign language translation
- `accessibility_logs` - Usage logs for accessibility features

**Professional Features**
- `companies` - Company pages
- `jobs` - Job postings with accessibility features
- `job_applications` - Job application tracking
- `communities` - Community groups
- `community_members` - Community membership tracking

### Security

All tables have Row Level Security (RLS) enabled with comprehensive policies:

- **Authentication-based access**: All queries require authenticated users
- **Ownership verification**: Users can only modify their own data
- **Connection-based visibility**: Posts and profiles visible based on connection status
- **Privacy controls**: Respect user privacy settings

## Services

### Authentication Service (`auth.service.ts`)

```typescript
// Sign up new user
await authService.signUp({
  email: 'user@example.com',
  password: 'password',
  fullName: 'John Doe'
});

// Sign in
await authService.signIn({
  email: 'user@example.com',
  password: 'password'
});

// Sign out
await authService.signOut();

// Get current user
const user = await authService.getCurrentUser();

// Complete onboarding
await authService.completeOnboarding(userId, onboardingData);

// Password reset
await authService.resetPassword('user@example.com');

// Listen to auth state changes
authService.onAuthStateChange((event, session) => {
  console.log('Auth event:', event);
});
```

### Profile Service (`profile.service.ts`)

```typescript
// Get user profile
const profile = await profileService.getProfile(userId);

// Update profile
await profileService.updateProfile(userId, {
  bio: 'Updated bio',
  occupation: 'Software Engineer',
  location: 'San Francisco, CA'
});

// Search profiles
const results = await profileService.searchProfiles('john');

// Get/update user settings
const settings = await profileService.getUserSettings(userId);
await profileService.updateUserSettings(userId, {
  dark_mode: true,
  sign_language: 'ASL'
});
```

### Posts Service (`posts.service.ts`)

```typescript
// Get feed posts
const posts = await postsService.getPosts(20, 0);

// Get user's posts
const userPosts = await postsService.getUserPosts(userId);

// Create post
await postsService.createPost(userId, {
  content: 'Hello world!',
  postType: 'text',
  isPublic: true,
  attachments: [
    { type: 'image', url: 'https://...' }
  ]
});

// Update post
await postsService.updatePost(postId, 'Updated content');

// Delete post
await postsService.deletePost(postId, userId);

// Like/unlike post
await postsService.likePost(postId, userId);
await postsService.unlikePost(postId, userId);

// Comments
const comments = await postsService.getComments(postId);
await postsService.createComment(postId, userId, 'Great post!');

// Share post
await postsService.sharePost(postId, userId, 'Check this out!');
```

### Connections Service (`connections.service.ts`)

```typescript
// Get user's connections
const connections = await connectionsService.getConnections(userId);

// Get connection requests
const requests = await connectionsService.getConnectionRequests(userId);
const sent = await connectionsService.getSentRequests(userId);

// Send connection request
await connectionsService.sendConnectionRequest(
  requesterId,
  requesteeId,
  'I would like to connect with you!'
);

// Accept/reject request
await connectionsService.acceptConnectionRequest(requestId, userId);
await connectionsService.rejectConnectionRequest(requestId, userId);

// Remove connection
await connectionsService.removeConnection(userId, otherUserId);

// Check connection status
const isConnected = await connectionsService.isConnected(userId, otherUserId);

// Get mutual connections
const mutualIds = await connectionsService.getMutualConnections(userId, otherUserId);
```

### Messages Service (`messages.service.ts`)

```typescript
// Get all conversations
const conversations = await messagesService.getConversations(userId);

// Get conversation messages
const messages = await messagesService.getConversationMessages(conversationId);

// Create or get direct conversation
const conversationId = await messagesService.createOrGetDirectConversation(
  userId,
  otherUserId
);

// Send message
await messagesService.sendMessage(userId, {
  conversationId,
  content: 'Hello!',
  messageType: 'text'
});

// Mark messages as read
await messagesService.markAsRead(conversationId, userId);

// Get participants
const participants = await messagesService.getConversationParticipants(conversationId);
```

### Education Service (`education.service.ts`)

```typescript
// Get courses
const courses = await educationService.getCourses('ASL', 'Beginner');
const course = await educationService.getCourseById(courseId);

// Enroll in course
await educationService.enrollInCourse(userId, courseId);

// Get user enrollments
const enrollments = await educationService.getUserEnrollments(userId);

// Update progress
await educationService.updateCourseProgress(enrollmentId, 75, 15);

// Word library
const library = await educationService.getUserWordLibrary(userId);
await educationService.addWordToLibrary(userId, {
  word: 'Hello',
  category: 'Greetings',
  videoUrl: 'https://...'
});
await educationService.updateWordProgress(wordId, 95);

// Practice sessions
await educationService.createPracticeSession(userId, {
  sessionType: 'quick',
  wordsPracticed: 10,
  accuracyScore: 85,
  durationSeconds: 300
});

// Achievements
const achievements = await educationService.getUserAchievements(userId);
await educationService.awardAchievement(userId, {
  achievementType: 'streak',
  title: 'Perfect Week',
  description: 'Completed 7 days in a row'
});
```

## Usage Example

```typescript
import { authService, postsService, connectionsService } from './services';
import { supabase } from './lib/supabase';

// Sign up and onboard user
async function onboardNewUser(email: string, password: string, fullName: string) {
  // Create account
  const { user } = await authService.signUp({ email, password, fullName });

  // Complete onboarding
  await authService.completeOnboarding(user.id, {
    fullName: 'John Doe',
    age: '25-34',
    occupation: 'Software Engineer',
    location: 'San Francisco, CA',
    disabilityStatus: ['deaf'],
    assistiveTech: ['hearing-aid'],
    spokenLanguage: 'English',
    signLanguage: 'ASL',
    signLanguageProficiency: 'advanced',
    interests: ['accessibility', 'tech'],
    communicationPreferences: []
  });
}

// Create a post with sign language video
async function createSignLanguagePost(userId: string) {
  await postsService.createPost(userId, {
    content: 'Practicing my ASL skills today!',
    postType: 'asl',
    attachments: [
      {
        type: 'sign_video',
        url: 'https://storage.supabase.co/...',
        thumbnailUrl: 'https://storage.supabase.co/...'
      }
    ]
  });
}

// Connect with another user
async function connectWithUser(myUserId: string, theirUserId: string) {
  // Send connection request
  await connectionsService.sendConnectionRequest(
    myUserId,
    theirUserId,
    'I saw your work on accessibility and would love to connect!'
  );
}
```

## Real-time Features

Supabase provides real-time subscriptions out of the box:

```typescript
// Subscribe to new messages in a conversation
const subscription = supabase
  .channel('messages')
  .on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'messages',
      filter: `conversation_id=eq.${conversationId}`
    },
    (payload) => {
      console.log('New message:', payload.new);
    }
  )
  .subscribe();

// Subscribe to connection requests
const requestsSubscription = supabase
  .channel('connection-requests')
  .on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'connection_requests',
      filter: `requestee_id=eq.${userId}`
    },
    (payload) => {
      console.log('New connection request:', payload.new);
    }
  )
  .subscribe();

// Clean up
subscription.unsubscribe();
requestsSubscription.unsubscribe();
```

## Environment Variables

Required environment variables (already configured):

```env
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Database Migrations

The initial migration creates all tables with proper indexes and RLS policies. The migration file is located at:
- `supabase/migrations/create_core_schema.sql` (applied via Supabase)

## Next Steps

### Integration Tasks

1. **Replace localStorage with Supabase Auth**
   - Update App.tsx to use authService instead of localStorage
   - Implement proper auth state management
   - Handle session persistence

2. **Connect Components to Backend**
   - Update LoginScreen to use authService
   - Update SignUpScreen to use authService
   - Update HomeScreen to load posts from postsService
   - Update MessagesScreen to use messagesService
   - Update ConnectionsScreen to use connectionsService
   - Update EducationScreen to use educationService

3. **Implement Real-time Updates**
   - Add real-time message subscriptions
   - Add real-time notification subscriptions
   - Add real-time post updates

4. **File Upload**
   - Implement Supabase Storage for avatars, post media, sign videos
   - Add upload utilities in a storage service

5. **Advanced Features**
   - Implement job search and applications
   - Add community features
   - Implement notification system
   - Add analytics and activity tracking

## Performance Considerations

- All tables have appropriate indexes for common queries
- RLS policies are optimized for performance
- Use pagination for large data sets
- Consider implementing caching for frequently accessed data
- Use Supabase Edge Functions for complex operations

## Security Best Practices

- Never expose service role key in client code
- All database operations go through RLS policies
- Validate all user inputs on client and server
- Use prepared statements (Supabase handles this)
- Implement rate limiting for sensitive operations
- Regular security audits of RLS policies

## Support

For issues or questions:
- Check Supabase documentation: https://supabase.com/docs
- Review RLS policies in the database
- Test queries in Supabase Studio
