import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share, Bookmark, MoreHorizontal, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import type { FABMode } from '../App';

interface Post {
  id: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  timeAgo: string;
  content: string;
  hasVideo: boolean;
  hasAvatar: boolean;
  avatarVideoUrl?: string;
  likes: number;
  comments: number;
  shares: number;
}

interface PostCardProps {
  post: Post;
  activeFABMode: FABMode;
  onPostClick?: () => void;
}

export function PostCard({ post, activeFABMode, onPostClick }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [showAvatarPlayer, setShowAvatarPlayer] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive design
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLike = () => setIsLiked(!isLiked);
  const handleSave = () => setIsSaved(!isSaved);
  const handlePlay = () => setIsPlaying(!isPlaying);
  const handleShowAvatar = () => setShowAvatarPlayer(!showAvatarPlayer);

  return (
    <Card className="w-full glass-card liquid-hover border-white/10">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#183543] to-[#2a4a5a] rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white text-sm font-medium">{post.author.avatar}</span>
            </div>
            <div>
              <h4 className="font-medium">{post.author.name}</h4>
              <p className="text-sm text-muted-foreground">{post.author.role}</p>
              <p className="text-xs text-muted-foreground">{post.timeAgo}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Post Content */}
        <div 
          className="relative cursor-pointer" 
          onClick={onPostClick}
        >
          <p>{post.content}</p>
          {post.hasAvatar && (
            <div className="absolute -top-1 -right-1">
              <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                <span>🤟</span>
                <span>ASL</span>
              </div>
            </div>
          )}
        </div>

        {/* Media Content */}
        {post.hasVideo && (
          <div className="relative bg-gray-100 rounded-lg aspect-video flex items-center justify-center">
            <Button
              variant="secondary"
              size="lg"
              onClick={handlePlay}
              className="rounded-full w-16 h-16"
            >
              {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            </Button>
            <div className="absolute bottom-3 right-3 flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsAudioEnabled(!isAudioEnabled)}
              >
                {isAudioEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </Button>
            </div>
            {(activeFABMode === 'speech-to-text' || activeFABMode === 'avatar') && (
              <div className="absolute bottom-3 left-3 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                Live captions enabled
              </div>
            )}
          </div>
        )}

        {/* Avatar Player */}
        {(post.hasAvatar || activeFABMode === 'avatar') && (
          <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-lg p-3 sm:p-4 border border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#183543] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs">👤</span>
                </div>
                <span className="text-sm font-medium">Avatar Translation</span>
                {activeFABMode === 'avatar' && (
                  <Badge variant="secondary" className="text-xs">FAB Applied</Badge>
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleShowAvatar}
                className="text-xs sm:text-sm w-full sm:w-auto"
              >
                {showAvatarPlayer ? 'Hide' : 'Show'} Avatar
              </Button>
            </div>
            
            {showAvatarPlayer && (
              <div className="bg-white rounded-lg border overflow-hidden">
                {/* Mobile-friendly aspect ratio container with max height constraints */}
                <div 
                  className="w-full max-w-full" 
                  style={{ 
                    aspectRatio: isMobile ? '4/3' : '16/9',
                    maxHeight: isMobile ? '280px' : '400px'
                  }}
                >
                  {post.avatarVideoUrl ? (
                    <div className="relative w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
                      {/* In-app ASL video player */}
                      <video
                        className="w-full h-full object-contain rounded-lg"
                        controls
                        autoPlay
                        loop
                        muted={false}
                        playsInline
                        preload="metadata"
                      >
                        <source src={post.avatarVideoUrl} type="video/mp4" />
                        <track kind="captions" srcLang="en" label="English Captions" default />
                        <track kind="descriptions" srcLang="en" label="ASL Description" />
                        Your browser does not support the video tag.
                      </video>
                      
                      {/* ASL Video overlay controls */}
                      <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center">
                        <div className="bg-black/80 text-white px-2 py-1 rounded text-xs truncate max-w-[60%]">
                          🤟 ASL: {post.author.name.split(' ')[0]}
                        </div>
                        <div className="flex gap-1">
                          <Button size="sm" variant="secondary" className="h-8 px-2 text-xs" title="Toggle captions">
                            CC
                          </Button>
                          <Button size="sm" variant="secondary" className="h-8 px-2 text-xs" title="Video settings">
                            ⚙️
                          </Button>
                        </div>
                      </div>
                      
                      {/* ASL Content overlay */}
                      <div className="absolute top-2 left-2 right-2">
                        <div className="bg-black/80 text-white px-3 py-2 rounded text-xs border border-white/20">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-yellow-300">🤟</span>
                            <span className="text-blue-300 text-xs">ASL Translation</span>
                          </div>
                          <p className="text-white italic">"{post.content}"</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full p-4">
                      <div className="text-center max-w-sm">
                        <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-[#183543] to-[#2a4a5a] rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg animate-pulse">
                          <span className="text-xl sm:text-3xl">🤟</span>
                        </div>
                        <h4 className="font-medium mb-2 text-sm sm:text-base">ASL Avatar Translation</h4>
                        <p className="text-xs sm:text-sm text-muted-foreground mb-2">
                          Watch {post.author.name.split(' ')[0]}'s message in American Sign Language
                        </p>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 mb-4">
                          <p className="text-xs text-blue-800 italic">
                            "{post.content}"
                          </p>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row justify-center gap-2">
                          <Button 
                            size="sm" 
                            className="bg-[#183543] hover:bg-[#2a4a5a] text-xs sm:text-sm"
                            onClick={() => {
                              // Load a demo ASL video with extended content
                              const aslPhrases = [
                                'Hello! Welcome to our community.',
                                'Thank you for joining us today.',
                                'I am happy to meet you.',
                                'Please enjoy learning ASL with us.',
                                'Have a wonderful day!'
                              ];
                              const randomPhrase = aslPhrases[Math.floor(Math.random() * aslPhrases.length)];
                              const demoPost = { 
                                ...post, 
                                avatarVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                                content: randomPhrase
                              };
                              // Trigger a re-render by updating parent state
                              setTimeout(() => {
                                setShowAvatarPlayer(false);
                                setTimeout(() => setShowAvatarPlayer(true), 100);
                              }, 100);
                            }}
                          >
                            <Play className="h-3 w-3 mr-1" />
                            ASL Demo
                          </Button>
                          <Button size="sm" variant="outline" className="text-xs sm:text-sm">
                            Settings
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {!showAvatarPlayer && (
              <p className="text-sm text-[#183543]">Click to view avatar translation of this content</p>
            )}
          </div>
        )}

        {/* Mode-specific overlays */}
        {activeFABMode === 'text-to-speech' && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <Volume2 className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-700">Text-to-Speech active</span>
              <Button size="sm" variant="outline" className="ml-auto">
                <Play className="h-3 w-3 mr-1" />
                Read Post
              </Button>
            </div>
          </div>
        )}

        {/* Interaction Row */}
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`flex items-center gap-1 ${isLiked ? 'text-red-500' : ''}`}
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
              <span className="text-sm">{post.likes + (isLiked ? 1 : 0)}</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              <span className="text-sm">{post.comments}</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-1">
              <Share className="h-4 w-4" />
              <span className="text-sm">{post.shares}</span>
            </Button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSave}
            className={isSaved ? 'text-[#183543]' : ''}
          >
            <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
          </Button>
        </div>

        {/* Comments Preview */}
        {post.comments > 0 && (
          <div className="pt-2 border-t">
            <p className="text-sm text-muted-foreground mb-2">
              View all {post.comments} comments
            </p>
            <div className="space-y-2">
              <div className="flex gap-2">
                <div className="w-6 h-6 bg-gray-300 rounded-full flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium">John Smith</span> Great insights! This will really help accessibility.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}