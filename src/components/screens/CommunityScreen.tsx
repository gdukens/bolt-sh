import React, { useState } from 'react';
import { ArrowLeft, Users, Plus, MoreHorizontal, Lock, Globe, MessageCircle, Calendar, Video } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { PostCard } from '../PostCard';
import type { Screen } from '../../App';

interface CommunityScreenProps {
  onBack: () => void;
  onNavigate: (screen: Screen) => void;
  communityId?: string;
}

export function CommunityScreen({ onBack, onNavigate, communityId }: CommunityScreenProps) {
  const [isMember, setIsMember] = useState(false);

  const community = {
    name: 'Sign Language & Accessibility Tech',
    description: 'A community for professionals passionate about sign language technology and accessibility',
    type: 'Public',
    members: 8234,
    posts: 1456,
    about: 'Join us to discuss the latest innovations in sign language technology, accessibility tools, and inclusive design. Whether you\'re an engineer, designer, educator, or advocate, this is your space to share knowledge, collaborate, and drive positive change.',
    rules: [
      'Be respectful and inclusive',
      'Share knowledge and resources',
      'No spam or self-promotion',
      'Keep discussions on topic'
    ],
    admins: [
      { name: 'Sarah Martinez', title: 'Community Manager', avatar: 'SM' },
      { name: 'Michael Chen', title: 'Moderator', avatar: 'MC' }
    ]
  };

  const posts = [
    {
      id: '1',
      author: 'Emily Rodriguez',
      authorTitle: 'ASL Interpreter',
      timeAgo: '4 hours ago',
      content: 'Just discovered an amazing new app that translates sign language in real-time! Has anyone else tried it? Would love to hear your experiences. 🤟',
      likes: 187,
      comments: 43,
      shares: 12,
      hasSignLanguage: false,
      hasVideo: false
    },
    {
      id: '2',
      author: 'David Kim',
      authorTitle: 'Accessibility Engineer',
      timeAgo: '1 day ago',
      content: 'Sharing some best practices for implementing WCAG 2.1 AAA compliance in web applications. Check out this guide I put together!',
      likes: 234,
      comments: 56,
      shares: 89,
      hasSignLanguage: false,
      hasVideo: false
    }
  ];

  const upcomingEvents = [
    {
      title: 'Virtual Meetup: AI in Sign Language',
      date: 'Oct 15, 2025',
      time: '2:00 PM PST',
      attendees: 234
    },
    {
      title: 'Accessibility Workshop',
      date: 'Oct 22, 2025',
      time: '10:00 AM PST',
      attendees: 156
    }
  ];

  return (
    <div className="h-full overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 glass-header px-4 py-3 flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="w-10 h-10 rounded-full p-0"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h2 className="truncate">{community.name}</h2>
          <p className="text-sm text-muted-foreground">{community.members.toLocaleString()} members</p>
        </div>
        <Button variant="ghost" size="sm" className="w-10 h-10 rounded-full p-0">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </div>

      <div className="pb-20 lg:pb-6">
        {/* Cover */}
        <div className="relative">
          <div className="h-32 lg:h-48 bg-gradient-to-r from-green-500/20 to-teal-500/20" />
          <div className="px-4 pb-4">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 -mt-16 lg:-mt-20">
              <div className="flex flex-col lg:flex-row lg:items-end gap-4">
                <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-2xl bg-white dark:bg-gray-900 flex items-center justify-center glass-card border-4 border-background shadow-xl">
                  <Users className="w-16 h-16 lg:w-20 lg:h-20 text-[#183543]" />
                </div>
                <div className="lg:mb-2">
                  <h1 className="text-xl lg:text-2xl">{community.name}</h1>
                  <p className="text-muted-foreground mt-1">{community.description}</p>
                  <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      {community.type === 'Public' ? <Globe className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                      {community.type} group
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {community.members.toLocaleString()} members
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" />
                      {community.posts.toLocaleString()} posts
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 lg:mb-2">
                <Button
                  className={`flex-1 lg:flex-none ${isMember ? '' : 'bg-[#183543] hover:bg-[#183543]/90 text-white'}`}
                  variant={isMember ? 'outline' : 'default'}
                  onClick={() => setIsMember(!isMember)}
                >
                  <Plus className={`h-4 w-4 mr-2 ${isMember ? 'rotate-45' : ''}`} />
                  {isMember ? 'Joined' : 'Join Group'}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 mt-4">
          <Tabs defaultValue="posts" className="w-full">
            <TabsList className="w-full glass justify-start overflow-x-auto">
              <TabsTrigger value="posts">Posts</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="members">Members</TabsTrigger>
            </TabsList>

            <TabsContent value="posts" className="space-y-4 mt-4">
              {isMember && (
                <Card className="p-4 glass-card mb-4">
                  <Button className="w-full justify-start bg-transparent hover:bg-accent text-foreground">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Start a discussion...
                  </Button>
                </Card>
              )}
              {posts.map(post => (
                <PostCard key={post.id} {...post} />
              ))}
            </TabsContent>

            <TabsContent value="about" className="space-y-4 mt-4">
              <Card className="p-6 glass-card">
                <h3 className="mb-4">About this group</h3>
                <p className="text-muted-foreground leading-relaxed">{community.about}</p>
              </Card>

              <Card className="p-6 glass-card">
                <h3 className="mb-4">Group Rules</h3>
                <div className="space-y-3">
                  {community.rules.map((rule, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#183543]/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm text-[#183543]">{index + 1}</span>
                      </div>
                      <p className="text-muted-foreground">{rule}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 glass-card">
                <h3 className="mb-4">Group Admins</h3>
                <div className="space-y-4">
                  {community.admins.map((admin, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-[#183543] flex items-center justify-center">
                        <span className="text-white">{admin.avatar}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm">{admin.name}</h4>
                        <p className="text-sm text-muted-foreground">{admin.title}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Message
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="events" className="space-y-4 mt-4">
              {upcomingEvents.map((event, index) => (
                <Card key={index} className="p-6 glass-card">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-xl bg-[#183543]/10 flex flex-col items-center justify-center flex-shrink-0">
                      <Calendar className="h-6 w-6 text-[#183543]" />
                    </div>
                    <div className="flex-1">
                      <h4>{event.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {event.date} • {event.time}
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        {event.attendees} people attending
                      </p>
                      <Button className="mt-4 bg-[#183543] hover:bg-[#183543]/90 text-white" size="sm">
                        <Video className="h-4 w-4 mr-2" />
                        Join Event
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="members" className="mt-4">
              <Card className="p-6 glass-card text-center">
                <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h4>Group Members</h4>
                <p className="text-muted-foreground mt-2">
                  {community.members.toLocaleString()} members
                </p>
                <Button className="mt-4 bg-[#183543] hover:bg-[#183543]/90 text-white">
                  See all members
                </Button>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
