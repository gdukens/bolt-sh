import React from 'react';
import { Hand, User, Mic, Volume2, AlertTriangle, Settings, BookOpen, Bluetooth } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import type { Screen } from '../../App';

interface InfinityScreenProps {
  onNavigate: (screen: Screen) => void;
}

const modeCards = [
  {
    id: 'sign-capture',
    title: 'Sign Capture',
    description: 'Record and recognize sign language in real-time',
    icon: Hand,
    color: 'from-blue-500 to-cyan-500',
    features: ['Live recognition', 'Auto-transcription', 'Avatar generation'],
  },
  {
    id: 'avatar',
    title: 'Avatar Mode',
    description: 'Generate avatar translations of text and speech',
    icon: User,
    color: 'from-purple-500 to-pink-500',
    features: ['Text to avatar', 'Custom avatars', 'Multiple languages'],
  },
  {
    id: 'speech-to-text',
    title: 'Speech to Text',
    description: 'Convert spoken words to text with high accuracy',
    icon: Mic,
    color: 'from-green-500 to-emerald-500',
    features: ['Real-time transcription', 'Multiple languages', 'Noise filtering'],
  },
  {
    id: 'text-to-speech',
    title: 'Text to Speech',
    description: 'Convert text to natural-sounding speech',
    icon: Volume2,
    color: 'from-orange-500 to-red-500',
    features: ['Natural voices', 'Speed control', 'Multiple accents'],
  },
];

const quickActions = [
  {
    title: 'Avatar Studio',
    description: 'Create and customize your avatars',
    icon: User,
    action: 'avatar-studio' as Screen,
    color: 'bg-purple-100 text-purple-700',
  },
  {
    title: 'Sign Capture',
    description: 'Start recording signs immediately',
    icon: Hand,
    action: 'camera' as Screen,
    color: 'bg-blue-100 text-blue-700',
  },
  {
    title: 'Education Hub',
    description: 'Practice and learn new signs',
    icon: BookOpen,
    action: 'education' as Screen,
    color: 'bg-green-100 text-green-700',
  },
];

export function InfinityScreen({ onNavigate }: InfinityScreenProps) {
  return (
    <div className="h-full bg-background">
      <ScrollArea className="h-full">
        <div className="p-4 space-y-6">
          {/* Header */}
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-gradient-to-br from-[#183543] to-slate-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-white text-2xl">∞</span>
            </div>
            <h1>Arkan Infinity</h1>
            <p className="text-muted-foreground">Multimodal accessibility at your fingertips</p>
          </div>

          {/* Mode Selection */}
          <div>
            <h2 className="mb-4">Accessibility Modes</h2>
            <div className="grid gap-4">
              {modeCards.map((mode) => (
                <Card key={mode.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${mode.color} rounded-xl flex items-center justify-center`}>
                        <mode.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4>{mode.title}</h4>
                        <p className="text-sm text-muted-foreground">{mode.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {mode.features.map((feature) => (
                        <Badge key={feature} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    <Button className="w-full">
                      Enable {mode.title}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h3 className="mb-4">Quick Actions</h3>
            <div className="grid gap-3">
              {quickActions.map((action) => (
                <Card 
                  key={action.title} 
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => onNavigate(action.action)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center`}>
                        <action.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">{action.title}</h4>
                        <p className="text-xs text-muted-foreground">{action.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Device Connections */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bluetooth className="h-5 w-5" />
                <h3>Connected Devices</h3>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Bluetooth className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">ModuSign Mini</p>
                      <p className="text-xs text-muted-foreground">Battery: 87%</p>
                    </div>
                  </div>
                  <Badge variant="secondary">Connected</Badge>
                </div>
                <Button variant="outline" className="w-full">
                  <Bluetooth className="h-4 w-4 mr-2" />
                  Pair New Device
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* SOS Section */}
          <Card className="border-orange-200 bg-orange-50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                <h3>Emergency SOS</h3>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Long press the floating button for 2.5 seconds to send an emergency alert
              </p>
              <div className="space-y-2">
                <Button variant="outline" className="w-full">
                  <Settings className="h-4 w-4 mr-2" />
                  Configure SOS Settings
                </Button>
                <Button variant="outline" className="w-full">
                  Test SOS (No Alert Sent)
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <h3>Recent Activity</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Hand className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">Sign captured: "Hello"</p>
                    <p className="text-xs text-muted-foreground">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">Avatar generated for post</p>
                    <p className="text-xs text-muted-foreground">15 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <BookOpen className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">Completed practice session</p>
                    <p className="text-xs text-muted-foreground">1 hour ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tutorials */}
          <Card>
            <CardHeader>
              <h3>Getting Started</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <span className="mr-2">📚</span>
                  How to use the Floating Button
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <span className="mr-2">🎥</span>
                  Sign Capture Best Practices
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <span className="mr-2">👤</span>
                  Creating Your First Avatar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
}