import React, { useState } from 'react';
import { ArrowLeft, Heart, MessageCircle, Share2, MoreHorizontal, ThumbsUp, Send, Video } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Textarea } from '../ui/textarea';
import { Avatar } from '../ui/avatar';
import type { Screen } from '../../App';

interface PostDetailScreenProps {
  onBack: () => void;
  onNavigate: (screen: Screen) => void;
  postId?: string;
}

export function PostDetailScreen({ onBack, onNavigate, postId }: PostDetailScreenProps) {
  const [comment, setComment] = useState('');
  const [liked, setLiked] = useState(false);

  const post = {
    author: 'John Doe',
    authorTitle: 'Software Engineer at Arkan',
    timeAgo: '3 hours ago',
    content: 'Excited to share that our team just launched the new accessibility features for Arkan Infinity! 🎉\n\nWe\'ve been working hard to make professional networking accessible to everyone, including:\n\n✅ Real-time sign language translation\n✅ AI-powered avatar signing\n✅ Advanced speech-to-text\n✅ Text-to-speech with natural voices\n\nAccessibility is not a feature, it\'s a fundamental right. Proud to be part of a team that believes in inclusive design.\n\n#Accessibility #Innovation #InclusiveDesign',
    likes: 324,
    comments: 67,
    shares: 28,
    hasVideo: true,
    hasSignLanguage: true
  };

  const comments = [
    {
      id: '1',
      author: 'Sarah Martinez',
      authorTitle: 'UX Designer',
      timeAgo: '2 hours ago',
      content: 'This is amazing! As someone who works in accessibility, I\'m thrilled to see companies taking this seriously. 👏',
      likes: 45,
      avatar: 'SM'
    },
    {
      id: '2',
      author: 'Michael Chen',
      authorTitle: 'Accessibility Consultant',
      timeAgo: '1 hour ago',
      content: 'Congratulations! The sign language feature is exactly what the community needs. Would love to learn more about the technical implementation.',
      likes: 32,
      avatar: 'MC'
    },
    {
      id: '3',
      author: 'Emily Rodriguez',
      authorTitle: 'Product Manager',
      timeAgo: '45 minutes ago',
      content: 'Incredible work! This sets a new standard for inclusive design in social platforms.',
      likes: 28,
      avatar: 'ER'
    }
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="glass-header px-4 py-3 flex items-center gap-3 flex-shrink-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="w-10 h-10 rounded-full p-0"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h2>Post</h2>
        </div>
        <Button variant="ghost" size="sm" className="w-10 h-10 rounded-full p-0">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-20 lg:pb-6">
        {/* Post */}
        <Card className="glass-card rounded-none border-x-0">
          <div className="p-4">
            {/* Author Info */}
            <div className="flex items-start gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#183543] flex items-center justify-center flex-shrink-0">
                <span className="text-white">JD</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="truncate">{post.author}</h4>
                <p className="text-sm text-muted-foreground truncate">{post.authorTitle}</p>
                <p className="text-sm text-muted-foreground">{post.timeAgo}</p>
              </div>
            </div>

            {/* Content */}
            <p className="whitespace-pre-wrap mb-4">{post.content}</p>

            {/* Video Preview */}
            {post.hasVideo && (
              <div className="relative aspect-video bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl mb-4 overflow-hidden glass">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button size="lg" className="w-16 h-16 rounded-full bg-white/90 hover:bg-white">
                    <Video className="h-8 w-8 text-[#183543]" />
                  </Button>
                </div>
                {post.hasSignLanguage && (
                  <div className="absolute top-4 right-4">
                    <div className="glass-strong px-3 py-1 rounded-full text-sm flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      ASL Available
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Stats */}
            <div className="flex items-center justify-between py-3 border-y border-border">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center -mr-1">
                    <ThumbsUp className="h-3 w-3 text-white" />
                  </div>
                  <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                    <Heart className="h-3 w-3 text-white fill-white" />
                  </div>
                </div>
                <span>{post.likes}</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{post.comments} comments</span>
                <span>{post.shares} shares</span>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-3 gap-2 pt-2">
              <Button
                variant="ghost"
                className={`flex items-center justify-center gap-2 ${liked ? 'text-blue-500' : ''}`}
                onClick={() => setLiked(!liked)}
              >
                <ThumbsUp className={`h-5 w-5 ${liked ? 'fill-current' : ''}`} />
                <span className="hidden sm:inline">Like</span>
              </Button>
              <Button variant="ghost" className="flex items-center justify-center gap-2">
                <MessageCircle className="h-5 w-5" />
                <span className="hidden sm:inline">Comment</span>
              </Button>
              <Button variant="ghost" className="flex items-center justify-center gap-2">
                <Share2 className="h-5 w-5" />
                <span className="hidden sm:inline">Share</span>
              </Button>
            </div>
          </div>
        </Card>

        {/* Comments Section */}
        <div className="px-4 py-6 space-y-6">
          <h3>{post.comments} Comments</h3>

          {/* Comment Input */}
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-[#183543] flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm">JD</span>
            </div>
            <div className="flex-1 flex gap-2">
              <Textarea
                placeholder="Add a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="min-h-[44px] resize-none glass"
              />
              <Button
                size="sm"
                className="bg-[#183543] hover:bg-[#183543]/90 text-white"
                disabled={!comment.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Comments List */}
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-[#183543] flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm">{comment.avatar}</span>
                </div>
                <div className="flex-1">
                  <div className="glass-card rounded-2xl p-4">
                    <h4 className="text-sm">{comment.author}</h4>
                    <p className="text-xs text-muted-foreground">{comment.authorTitle}</p>
                    <p className="mt-2 text-sm">{comment.content}</p>
                  </div>
                  <div className="flex items-center gap-4 mt-2 px-4">
                    <Button variant="ghost" size="sm" className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground">
                      Like ({comment.likes})
                    </Button>
                    <Button variant="ghost" size="sm" className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground">
                      Reply
                    </Button>
                    <span className="text-xs text-muted-foreground">{comment.timeAgo}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
