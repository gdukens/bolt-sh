import React, { useState } from 'react';
import { ArrowLeft, Users, MapPin, Link as LinkIcon, Building2, Plus, MoreHorizontal, Briefcase } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { PostCard } from '../PostCard';
import type { Screen } from '../../App';

interface CompanyPageScreenProps {
  onBack: () => void;
  onNavigate: (screen: Screen) => void;
  companyId?: string;
}

export function CompanyPageScreen({ onBack, onNavigate, companyId }: CompanyPageScreenProps) {
  const [isFollowing, setIsFollowing] = useState(false);

  const company = {
    name: 'AccessTech Inc',
    tagline: 'Making technology accessible for everyone',
    industry: 'Technology, Accessibility',
    size: '201-500 employees',
    location: 'San Francisco, CA',
    website: 'www.accesstech.com',
    followers: 12540,
    employees: 342,
    about: 'AccessTech is a leading innovator in accessibility technology. We\'re on a mission to create inclusive digital experiences that empower everyone, regardless of their abilities. Our products combine cutting-edge AI with human-centered design to break down barriers in communication, education, and professional networking.',
    specialties: ['Accessibility', 'AI/ML', 'Sign Language Tech', 'Inclusive Design', 'Assistive Technology'],
    openJobs: 12
  };

  const posts = [
    {
      id: '1',
      author: 'AccessTech Inc',
      authorTitle: 'Making technology accessible for everyone',
      timeAgo: '1 day ago',
      content: 'We\'re hiring! Join our team of passionate engineers working to make technology accessible for all. 12 new positions open across engineering, design, and product. Check out our careers page! 🚀',
      likes: 456,
      comments: 89,
      shares: 34,
      hasSignLanguage: false,
      hasVideo: false
    }
  ];

  const jobs = [
    {
      title: 'Senior Accessibility Engineer',
      location: 'San Francisco, CA',
      type: 'Full-time',
      applicants: 45
    },
    {
      title: 'UX Designer - Accessibility Focus',
      location: 'Remote',
      type: 'Full-time',
      applicants: 67
    },
    {
      title: 'Product Manager - Assistive Tech',
      location: 'San Francisco, CA',
      type: 'Full-time',
      applicants: 32
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
          <h2>{company.name}</h2>
          <p className="text-sm text-muted-foreground">{company.followers.toLocaleString()} followers</p>
        </div>
        <Button variant="ghost" size="sm" className="w-10 h-10 rounded-full p-0">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </div>

      <div className="pb-20 lg:pb-6">
        {/* Cover & Logo */}
        <div className="relative">
          <div className="h-32 lg:h-48 bg-gradient-to-r from-blue-500/20 to-purple-500/20" />
          <div className="px-4 pb-4">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
              <div className="flex flex-col lg:flex-row lg:items-end gap-4">
                <div className="-mt-16 lg:-mt-20">
                  <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-2xl bg-white dark:bg-gray-900 flex items-center justify-center glass-card border-4 border-background shadow-xl">
                    <Building2 className="w-16 h-16 lg:w-20 lg:h-20 text-[#183543]" />
                  </div>
                </div>
                <div className="lg:mb-2">
                  <h1 className="text-2xl lg:text-3xl">{company.name}</h1>
                  <p className="text-muted-foreground mt-1">{company.tagline}</p>
                  <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {company.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {company.followers.toLocaleString()} followers
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase className="h-4 w-4" />
                      {company.size}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 lg:mb-2">
                <Button
                  className={`flex-1 lg:flex-none ${isFollowing ? '' : 'bg-[#183543] hover:bg-[#183543]/90 text-white'}`}
                  variant={isFollowing ? 'outline' : 'default'}
                  onClick={() => setIsFollowing(!isFollowing)}
                >
                  <Plus className={`h-4 w-4 mr-2 ${isFollowing ? 'rotate-45' : ''}`} />
                  {isFollowing ? 'Following' : 'Follow'}
                </Button>
                <Button variant="outline" className="flex-1 lg:flex-none">
                  Visit Website
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="px-4 mt-4">
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="w-full glass justify-start overflow-x-auto">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="posts">Posts</TabsTrigger>
              <TabsTrigger value="jobs">
                Jobs ({company.openJobs})
              </TabsTrigger>
              <TabsTrigger value="people">People</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="space-y-4 mt-4">
              <Card className="p-6 glass-card">
                <h3 className="mb-4">About</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">{company.about}</p>

                <div className="grid gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Industry</p>
                    <p>{company.industry}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Company Size</p>
                    <p>{company.size}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Headquarters</p>
                    <p>{company.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Website</p>
                    <a href={`https://${company.website}`} className="text-[#183543] hover:underline flex items-center gap-1">
                      {company.website}
                      <LinkIcon className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </Card>

              <Card className="p-6 glass-card">
                <h3 className="mb-4">Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {company.specialties.map((specialty, index) => (
                    <Badge key={index} variant="secondary" className="px-4 py-2">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="posts" className="space-y-4 mt-4">
              {posts.map(post => (
                <PostCard key={post.id} {...post} />
              ))}
            </TabsContent>

            <TabsContent value="jobs" className="space-y-4 mt-4">
              {jobs.map((job, index) => (
                <Card key={index} className="p-6 glass-card hover:shadow-lg transition-shadow cursor-pointer">
                  <h4 className="text-lg">{job.title}</h4>
                  <p className="text-muted-foreground mt-1">{company.name}</p>
                  <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                    <span>{job.location}</span>
                    <span>•</span>
                    <span>{job.type}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-3">{job.applicants} applicants</p>
                  <Button className="mt-4 bg-[#183543] hover:bg-[#183543]/90 text-white">
                    Apply Now
                  </Button>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="people" className="space-y-4 mt-4">
              <Card className="p-6 glass-card text-center">
                <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h4>Connect with employees</h4>
                <p className="text-muted-foreground mt-2">
                  {company.employees} employees are on Arkan Infinity
                </p>
                <Button className="mt-4 bg-[#183543] hover:bg-[#183543]/90 text-white">
                  See all employees
                </Button>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
