import React from 'react';
import { PostCard } from '../PostCard';
import { ScrollArea } from '../ui/scroll-area';
import type { FABMode, Screen } from '../../App';

interface HomeScreenProps {
  activeFABMode: FABMode;
  onNavigate?: (screen: Screen) => void;
}

const mockPosts = [
  {
    id: '1',
    author: {
      name: 'Sarah Chen',
      role: 'UX Designer at Meta',
      avatar: 'SC',
    },
    timeAgo: '2h',
    content: 'Hello everyone! I\'m excited to share that our accessibility features are now live. Thank you for your support.',
    hasVideo: true,
    hasAvatar: true,
    avatarVideoUrl: 'https://sample-videos.com/zip/10/mp4/480/mp4-15.mp4',
    likes: 127,
    comments: 34,
    shares: 12,
  },
  {
    id: '2',
    author: {
      name: 'Dr. Maya Patel',
      role: 'ASL Linguist at Stanford',
      avatar: 'MP',
    },
    timeAgo: '4h',
    content: 'Good morning! My research shows that combining sign language with captions helps communication. This is very important for our community.',
    hasVideo: false,
    hasAvatar: true,
    avatarVideoUrl: 'https://sample-videos.com/zip/10/mp4/480/mp4-10.mp4',
    likes: 89,
    comments: 16,
    shares: 23,
  },
  {
    id: '3',
    author: {
      name: 'Alex Thompson',
      role: 'Deaf Community Advocate',
      avatar: 'AT',
    },
    timeAgo: '6h',
    content: 'Thank you all for coming to the workshop today. Inclusive design is important for everyone. Let\'s work together.',
    hasVideo: true,
    hasAvatar: true,
    avatarVideoUrl: 'https://sample-videos.com/zip/10/mp4/480/mp4-5.mp4',
    likes: 203,
    comments: 45,
    shares: 31,
  },
  {
    id: '4',
    author: {
      name: 'Jamie Rivera',
      role: 'ASL Instructor & Content Creator',
      avatar: 'JR',
    },
    timeAgo: '1d',
    content: 'Welcome to my ASL lesson! Today we will learn basic greetings. Practice with me: Hello, nice to meet you, goodbye.',
    hasVideo: false,
    hasAvatar: true,
    avatarVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    likes: 156,
    comments: 28,
    shares: 67,
  },
  {
    id: '5',
    author: {
      name: 'TechCorp',
      role: 'Company',
      avatar: 'TC',
    },
    timeAgo: '2d',
    content: 'We\'re hiring! Looking for talented engineers to join our accessibility team. Experience with sign language technology is a plus.',
    hasVideo: false,
    hasAvatar: false,
    likes: 89,
    comments: 12,
    shares: 24,
  },
];

export function HomeScreen({ activeFABMode, onNavigate }: HomeScreenProps) {
  return (
    <div className="h-full">
      <ScrollArea className="h-full">
        <div className="max-w-2xl mx-auto px-4 py-4 space-y-4">
          {activeFABMode && (
            <div className="glass-card p-3 mb-4 liquid-border">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#183543] rounded-full animate-pulse"></div>
                <span className="text-sm text-[#183543]">
                  {activeFABMode === 'sign-capture' && 'Sign Capture mode active'}
                  {activeFABMode === 'avatar' && 'Avatar mode active - posts will show avatar translations'}
                  {activeFABMode === 'speech-to-text' && 'Speech-to-Text mode active - audio will be transcribed'}
                  {activeFABMode === 'text-to-speech' && 'Text-to-Speech mode active - posts will be read aloud'}
                </span>
              </div>
            </div>
          )}
          
          {mockPosts.map((post) => (
            <PostCard 
              key={post.id} 
              post={post} 
              activeFABMode={activeFABMode}
              onPostClick={() => onNavigate?.('post-detail')}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}