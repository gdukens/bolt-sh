import React, { useState } from 'react';
import { ArrowLeft, UserPlus, MessageCircle, MoreHorizontal, MapPin, Briefcase, GraduationCap, Link as LinkIcon, Users, Video } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { PostCard } from '../PostCard';
import { Badge } from '../ui/badge';
import type { Screen } from '../../App';

interface UserProfileScreenProps {
  onBack: () => void;
  onNavigate: (screen: Screen) => void;
  userId?: string;
}

export function UserProfileScreen({ onBack, onNavigate, userId }: UserProfileScreenProps) {
  const [isConnected, setIsConnected] = useState(false);

  // Mock user data
  const user = {
    name: 'Sarah Martinez',
    headline: 'Senior UX Designer | Accessibility Advocate | Sign Language Interpreter',
    location: 'San Francisco, CA',
    connections: 847,
    avatar: 'SM',
    coverColor: 'from-purple-500/20 to-blue-500/20',
    about: 'Passionate about creating inclusive digital experiences for all users. Certified ASL interpreter with 8+ years of experience in UX design. I believe technology should be accessible to everyone, regardless of their abilities.',
    experience: [
      {
        title: 'Senior UX Designer',
        company: 'AccessTech Inc',
        period: '2021 - Present',
        description: 'Leading accessibility initiatives and designing inclusive user experiences.'
      },
      {
        title: 'UX Designer',
        company: 'Digital Solutions Co',
        period: '2019 - 2021',
        description: 'Designed user interfaces with focus on WCAG compliance.'
      }
    ],
    education: [
      {
        school: 'Stanford University',
        degree: 'Masters in Human-Computer Interaction',
        period: '2017 - 2019'
      }
    ],
    skills: ['UX Design', 'Accessibility', 'Sign Language', 'User Research', 'Prototyping', 'Figma']
  };

  const posts = [
    {
      id: '1',
      author: 'Sarah Martinez',
      authorTitle: 'Senior UX Designer',
      timeAgo: '2 days ago',
      content: 'Just finished redesigning our app\'s accessibility features. Excited to share that we\'ve achieved WCAG 2.1 AAA compliance! 🎉',
      likes: 234,
      comments: 45,
      shares: 12,
      hasSignLanguage: true,
      hasVideo: false
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
          <h2>{user.name}</h2>
          <p className="text-sm text-muted-foreground">{user.connections} connections</p>
        </div>
        <Button variant="ghost" size="sm" className="w-10 h-10 rounded-full p-0">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </div>

      <div className="pb-20 lg:pb-6">
        {/* Cover & Profile */}
        <div className="relative">
          <div className={`h-32 lg:h-48 bg-gradient-to-r ${user.coverColor}`} />
          <div className="px-4 pb-4">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
              <div className="flex flex-col lg:flex-row lg:items-end gap-4">
                <div className="-mt-16 lg:-mt-20">
                  <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full bg-[#183543] flex items-center justify-center glass-card border-4 border-background">
                    <span className="text-4xl lg:text-5xl text-white">{user.avatar}</span>
                  </div>
                </div>
                <div className="lg:mb-2">
                  <h1 className="text-2xl lg:text-3xl">{user.name}</h1>
                  <p className="text-muted-foreground mt-1">{user.headline}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {user.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {user.connections} connections
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 lg:mb-2">
                {!isConnected ? (
                  <Button
                    className="flex-1 lg:flex-none bg-[#183543] hover:bg-[#183543]/90 text-white"
                    onClick={() => setIsConnected(true)}
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Connect
                  </Button>
                ) : (
                  <Button variant="outline" className="flex-1 lg:flex-none" disabled>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Pending
                  </Button>
                )}
                <Button variant="outline" className="flex-1 lg:flex-none">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Message
                </Button>
                <Button variant="outline" className="lg:flex-none">
                  <Video className="h-4 w-4 mr-2 hidden lg:block" />
                  <span className="hidden lg:block">Video Call</span>
                  <Video className="h-4 w-4 lg:hidden" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="px-4 mt-4">
          <Tabs defaultValue="posts" className="w-full">
            <TabsList className="w-full glass justify-start overflow-x-auto">
              <TabsTrigger value="posts">Posts</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
            </TabsList>

            <TabsContent value="posts" className="space-y-4 mt-4">
              {posts.map(post => (
                <PostCard key={post.id} {...post} />
              ))}
            </TabsContent>

            <TabsContent value="about" className="mt-4">
              <Card className="p-6 glass-card">
                <h3 className="mb-4">About</h3>
                <p className="text-muted-foreground leading-relaxed">{user.about}</p>
              </Card>
            </TabsContent>

            <TabsContent value="experience" className="space-y-4 mt-4">
              {user.experience.map((exp, index) => (
                <Card key={index} className="p-6 glass-card">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#183543]/10 flex items-center justify-center flex-shrink-0">
                      <Briefcase className="h-6 w-6 text-[#183543]" />
                    </div>
                    <div className="flex-1">
                      <h4>{exp.title}</h4>
                      <p className="text-muted-foreground">{exp.company}</p>
                      <p className="text-sm text-muted-foreground mt-1">{exp.period}</p>
                      <p className="text-sm text-muted-foreground mt-2">{exp.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="education" className="space-y-4 mt-4">
              {user.education.map((edu, index) => (
                <Card key={index} className="p-6 glass-card">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#183543]/10 flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="h-6 w-6 text-[#183543]" />
                    </div>
                    <div className="flex-1">
                      <h4>{edu.school}</h4>
                      <p className="text-muted-foreground">{edu.degree}</p>
                      <p className="text-sm text-muted-foreground mt-1">{edu.period}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="skills" className="mt-4">
              <Card className="p-6 glass-card">
                <h3 className="mb-4">Skills & Endorsements</h3>
                <div className="flex flex-wrap gap-2">
                  {user.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="px-4 py-2">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
