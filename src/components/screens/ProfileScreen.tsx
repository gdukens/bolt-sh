import React, { useState } from 'react';
import { Edit, Settings, User, Play, Bluetooth, Shield, Award } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import type { Screen } from '../../App';

interface ProfileScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function ProfileScreen({ onNavigate }: ProfileScreenProps) {
  const [activeTab, setActiveTab] = useState('about');

  return (
    <div className="h-full bg-background">
      <ScrollArea className="h-full">
        <div className="relative">
          {/* Cover Image */}
          <div className="h-32 bg-gradient-to-r from-[#183543] to-slate-700"></div>
          
          {/* Profile Info */}
          <div className="px-4 pb-4">
            <div className="relative -mt-16 mb-4">
              <div className="w-24 h-24 bg-white rounded-full border-4 border-white flex items-center justify-center">
                <div className="w-20 h-20 bg-[#183543] rounded-full flex items-center justify-center">
                  <span className="text-white font-medium">JD</span>
                </div>
              </div>
              <Button 
                size="sm" 
                className="absolute top-4 right-0"
                onClick={() => onNavigate('avatar-studio')}
              >
                <Edit className="h-3 w-3 mr-1" />
                Edit
              </Button>
            </div>

            <div className="space-y-2 mb-6">
              <h1>John Doe</h1>
              <p className="text-muted-foreground">Software Engineer at TechCorp</p>
              <p className="text-sm text-muted-foreground">San Francisco, CA • 500+ connections</p>
              <div className="flex gap-2 mt-3">
                <Badge variant="secondary">ASL Interpreter</Badge>
                <Badge variant="secondary">Accessibility Advocate</Badge>
              </div>
            </div>

            <div className="flex gap-2 mb-6">
              <Button 
                className="flex-1"
                onClick={() => onNavigate('profile-edit')}
              >
                <User className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => onNavigate('avatar-studio')}
              >
                View Avatar
              </Button>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="px-4">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="avatar">Avatar</TabsTrigger>
              <TabsTrigger value="devices">Devices</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="mt-4 space-y-4">
              <Card className="glass-card liquid-hover">
                <CardHeader>
                  <h3>About</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Passionate about creating accessible technology and bridging communication gaps. 
                    Experienced in sign language interpretation and assistive technology development.
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card liquid-hover">
                <CardHeader>
                  <h3>Experience</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 text-xs font-medium">TC</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm">Software Engineer</h4>
                      <p className="text-sm text-muted-foreground">TechCorp • 2022 - Present</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Leading accessibility initiatives and sign language integration
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-green-600 text-xs font-medium">ASL</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm">ASL Interpreter</h4>
                      <p className="text-sm text-muted-foreground">Freelance • 2020 - 2022</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Provided interpretation services for educational and corporate events
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card liquid-hover">
                <CardHeader>
                  <h3>Skills & Endorsements</h3>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">American Sign Language</Badge>
                    <Badge variant="outline">Accessibility Design</Badge>
                    <Badge variant="outline">React Development</Badge>
                    <Badge variant="outline">UI/UX Design</Badge>
                    <Badge variant="outline">Sign Language Technology</Badge>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="mt-4 space-y-4">
              <Card>
                <CardHeader>
                  <h3>Recent Activity</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">Posted about accessibility features</p>
                      <p className="text-xs text-muted-foreground">2 hours ago • 47 likes</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Award className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">Completed ASL Fundamentals course</p>
                      <p className="text-xs text-muted-foreground">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">Created new avatar</p>
                      <p className="text-xs text-muted-foreground">3 days ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="avatar" className="mt-4 space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <h3>Your Avatars</h3>
                    <Button 
                      size="sm" 
                      onClick={() => onNavigate('avatar-studio')}
                    >
                      Create New
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-4 text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                          <span className="text-2xl">👤</span>
                        </div>
                        <p className="text-sm font-medium">Professional</p>
                        <p className="text-xs text-muted-foreground">Default avatar</p>
                        <Button size="sm" className="mt-2 w-full">
                          <Play className="h-3 w-3 mr-1" />
                          Preview
                        </Button>
                      </CardContent>
                    </Card>
                    <Card className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-4 text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                          <span className="text-2xl">👤</span>
                        </div>
                        <p className="text-sm font-medium">Casual</p>
                        <p className="text-xs text-muted-foreground">Informal setting</p>
                        <Button size="sm" variant="outline" className="mt-2 w-full">
                          <Play className="h-3 w-3 mr-1" />
                          Preview
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => onNavigate('avatar-studio')}
                  >
                    Open Avatar Studio
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="devices" className="mt-4 space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Bluetooth className="h-5 w-5" />
                    <h3>Connected Devices</h3>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Bluetooth className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">ModuSign Mini</p>
                        <p className="text-xs text-muted-foreground">Battery: 87% • Last sync: 2 min ago</p>
                      </div>
                    </div>
                    <Badge variant="secondary">Connected</Badge>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Bluetooth className="h-4 w-4 mr-2" />
                    Pair New Device
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="mt-4 space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    <h3>Account Settings</h3>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="ghost" className="w-full justify-start">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Shield className="h-4 w-4 mr-2" />
                    Privacy Settings
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Settings className="h-4 w-4 mr-2" />
                    Accessibility Options
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h3>Arkan Infinity Settings</h3>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="ghost" className="w-full justify-start">
                    FAB Position & Behavior
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Default Mode Settings
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    SOS Configuration
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Overlay Permissions
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h3>Support & Help</h3>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="ghost" className="w-full justify-start">
                    Help Center
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Contact Support
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Privacy Policy
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>
    </div>
  );
}