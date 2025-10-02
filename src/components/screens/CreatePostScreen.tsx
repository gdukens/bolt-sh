import React, { useState } from 'react';
import { ArrowLeft, Edit, Sparkles, Mic, Video, Type } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Textarea } from '../ui/textarea';
import { motion, AnimatePresence } from 'motion/react';
import svgPaths from '../../imports/svg-b7e5fvlzcu';

interface CreatePostScreenProps {
  onBack: () => void;
}

// Icon components from Figma design
function MediaIcon() {
  return (
    <div className="relative shrink-0 size-[32px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <path d={svgPaths.pa3faf00} fill="var(--fill-0, #183543)" />
      </svg>
    </div>
  );
}

function JobsIcon() {
  return (
    <div className="relative shrink-0 size-[32px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <path d={svgPaths.p1d33ee00} fill="var(--fill-0, #183543)" />
      </svg>
    </div>
  );
}

function EventIcon() {
  return (
    <div className="relative shrink-0 size-[32px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <path d={svgPaths.p32cf3000} fill="var(--fill-0, #183543)" />
      </svg>
    </div>
  );
}

function DocumentIcon() {
  return (
    <div className="relative shrink-0 size-[32px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <path d={svgPaths.pd3c5e00} fill="var(--fill-0, #183543)" />
      </svg>
    </div>
  );
}

function ServicesIcon() {
  return (
    <div className="relative shrink-0 size-[32px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <path d={svgPaths.p16a6af00} fill="var(--fill-0, #183543)" />
      </svg>
    </div>
  );
}

function PollIcon() {
  return (
    <div className="relative shrink-0 size-[32px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <path d={svgPaths.p118ea700} fill="var(--fill-0, #183543)" />
      </svg>
    </div>
  );
}

function CelebrateIcon() {
  return (
    <div className="relative shrink-0 size-[32px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <path d={svgPaths.p26cd193d} fill="var(--fill-0, #183543)" />
      </svg>
    </div>
  );
}

function ASLIcon() {
  return (
    <div className="relative shrink-0 size-[32px] flex items-center justify-center">
      <span className="text-[#183543] text-xl font-bold">🤟</span>
    </div>
  );
}

// Post type option component
interface PostTypeOptionProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  index: number;
}

function PostTypeOption({ icon, label, onClick, index }: PostTypeOptionProps) {
  return (
    <motion.div
      className="flex flex-col gap-4 items-center cursor-pointer"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <div className="glass-card liquid-border flex gap-[10px] items-center justify-center p-[18px] size-[68px] liquid-hover">
        {icon}
      </div>
      <div className="text-sm text-center text-foreground font-medium">
        {label}
      </div>
    </motion.div>
  );
}

export function CreatePostScreen({ onBack }: CreatePostScreenProps) {
  const [postText, setPostText] = useState('');
  const [selectedPostType, setSelectedPostType] = useState<string | null>(null);
  const [showAttachments, setShowAttachments] = useState(false);

  const postTypes = [
    { icon: <MediaIcon />, label: 'Media', id: 'media' },
    { icon: <ASLIcon />, label: 'ASL Video', id: 'asl' },
    { icon: <JobsIcon />, label: 'Job', id: 'job' },
    { icon: <EventIcon />, label: 'Event', id: 'event' },
    { icon: <DocumentIcon />, label: 'Document', id: 'document' },
    { icon: <PollIcon />, label: 'Poll', id: 'poll' },
    { icon: <CelebrateIcon />, label: 'Celebrate', id: 'celebrate' },
  ];

  const handlePostTypeSelect = (typeId: string) => {
    setSelectedPostType(typeId);
    setShowAttachments(false);
    // Add logic for each post type
    console.log(`Selected post type: ${typeId}`);
  };

  const handleCreatePost = () => {
    if (postText.trim()) {
      // Handle post creation logic here
      console.log('Creating post:', { text: postText, type: selectedPostType });
      onBack();
    }
  };

  return (
    <div className="h-full bg-background flex flex-col overflow-hidden">
      {/* Header */}
      <div className="glass-header flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="font-medium">Create Post</h2>
            <p className="text-sm text-muted-foreground">Share with your network</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowAttachments(!showAttachments)}
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Attach
          </Button>
          <Button 
            size="sm" 
            onClick={handleCreatePost}
            disabled={!postText.trim()}
            className="bg-[#183543] hover:bg-[#2a4a5a]"
          >
            Post
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {/* Post Input Area */}
        <Card className="glass-card liquid-border">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#183543] to-[#2a4a5a] rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white text-sm font-medium">You</span>
              </div>
              <div>
                <h4 className="font-medium">Share your thoughts</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedPostType && `Creating a ${selectedPostType} post`}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              placeholder="What's on your mind? Share your thoughts, experiences, or insights with your network..."
              className="min-h-[120px] resize-none border-0 bg-transparent focus:ring-0 text-base"
              maxLength={3000}
            />
            <div className="space-y-3">
              {/* ASL Input Methods */}
              <div className="flex gap-1.5 sm:gap-2 pt-3 border-t">
                <Button variant="outline" size="sm" className="flex-1 text-[0.688rem] sm:text-sm px-1.5 sm:px-3 min-w-0">
                  <Video className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1 sm:mr-2 flex-shrink-0" />
                  <span className="truncate">ASL Record</span>
                </Button>
                <Button variant="outline" size="sm" className="flex-1 text-[0.688rem] sm:text-sm px-1.5 sm:px-3 min-w-0">
                  <Mic className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1 sm:mr-2 flex-shrink-0" />
                  <span className="truncate">Voice-to-Text</span>
                </Button>
                <Button variant="outline" size="sm" className="flex-1 text-[0.688rem] sm:text-sm px-1.5 sm:px-3 min-w-0">
                  <Type className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1 sm:mr-2 flex-shrink-0" />
                  <span className="truncate">Text-to-ASL</span>
                </Button>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">
                  {postText.length}/3000 characters
                </span>
                {selectedPostType && (
                  <div className="flex items-center gap-2 text-sm text-[#183543]">
                    <Edit className="h-3 w-3" />
                    <span className="capitalize">{selectedPostType} post</span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Selected Post Type Details */}
        {selectedPostType && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <Card className="glass-card liquid-border">
              <CardHeader>
                <h3 className="capitalize">{selectedPostType} Details</h3>
                <p className="text-sm text-muted-foreground">
                  {selectedPostType === 'media' && 'Add photos, videos, or documents to your post'}
                  {selectedPostType === 'asl' && 'Record ASL video content with automatic captions'}
                  {selectedPostType === 'job' && 'Share job opportunities with your network'}
                  {selectedPostType === 'event' && 'Create and promote events in your community'}
                  {selectedPostType === 'document' && 'Share important documents and files'}
                  {selectedPostType === 'poll' && 'Create engaging polls for your audience'}
                  {selectedPostType === 'celebrate' && 'Share achievements and milestones'}
                </p>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-4 text-center border">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#183543] to-[#2a4a5a] rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">
                      {selectedPostType === 'media' && '📸'}
                      {selectedPostType === 'asl' && '🤟'}
                      {selectedPostType === 'job' && '💼'}
                      {selectedPostType === 'event' && '📅'}
                      {selectedPostType === 'document' && '📄'}
                      {selectedPostType === 'poll' && '📊'}
                      {selectedPostType === 'celebrate' && '🎉'}
                    </span>
                  </div>
                  <Button variant="outline" size="sm">
                    Configure {selectedPostType}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>

      {/* Post Type Attachments Modal */}
      <AnimatePresence>
        {showAttachments && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setShowAttachments(false)}
            />

            {/* Bottom Sheet */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50"
            >
              <div className="glass-strong rounded-t-[20px] p-8 mx-auto max-w-md">
                {/* Handle bar */}
                <div className="flex justify-center mb-6">
                  <div className="w-12 h-1 bg-gray-400 rounded-full" />
                </div>

                {/* Post Type Grid */}
                <div className="grid grid-cols-3 gap-6 sm:gap-8 justify-items-center max-w-sm mx-auto">
                  {postTypes.map((type, index) => (
                    <PostTypeOption
                      key={type.id}
                      icon={type.icon}
                      label={type.label}
                      onClick={() => handlePostTypeSelect(type.id)}
                      index={index}
                    />
                  ))}
                </div>

                {/* Home Indicator */}
                <div className="flex justify-center mt-8">
                  <div className="w-32 h-1 bg-gray-800 rounded-full" />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}