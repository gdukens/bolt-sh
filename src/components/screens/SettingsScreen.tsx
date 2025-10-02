import React from 'react';
import { ArrowLeft, ChevronRight, Accessibility, Shield, Smartphone, Globe, HelpCircle, User, Bell } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Switch } from '../ui/switch';
import { motion } from 'motion/react';

interface SettingsScreenProps {
  onBack: () => void;
  onNavigate: (screen: any) => void;
  isDarkMode: boolean;
  onThemeChange: (isDark: boolean) => void;
  onRestartWalkthrough?: () => void;
}

const settingsGroups = [
  {
    title: 'Accessibility',
    items: [
      {
        id: 'accessibility-settings',
        icon: Accessibility,
        label: 'Accessibility Settings',
        description: 'ASL, captions, font size, and more',
        screen: 'accessibility-settings',
      },
      {
        id: 'device-pairing',
        icon: Smartphone,
        label: 'ModuSign Mini Pairing',
        description: 'Connect your signing device',
        screen: 'device-pairing',
      },
    ],
  },
  {
    title: 'Account',
    items: [
      {
        id: 'profile-edit',
        icon: User,
        label: 'Edit Profile',
        description: 'Update your information and preferences',
        screen: 'profile-edit',
      },
      {
        id: 'privacy-settings',
        icon: Shield,
        label: 'Privacy & Security',
        description: 'Control who can see your content',
        screen: 'privacy-settings',
      },
      {
        id: 'notifications',
        icon: Bell,
        label: 'Notifications',
        description: 'Manage your notification preferences',
        screen: 'notifications',
      },
    ],
  },
  {
    title: 'General',
    items: [
      {
        id: 'language-settings',
        icon: Globe,
        label: 'Language & Region',
        description: 'Sign and spoken language preferences',
        screen: 'language-settings',
      },
      {
        id: 'help-support',
        icon: HelpCircle,
        label: 'Help & Support',
        description: 'Get help and send feedback',
        screen: 'help-support',
      },
    ],
  },
];

export function SettingsScreen({ onBack, onNavigate, isDarkMode, onThemeChange, onRestartWalkthrough }: SettingsScreenProps) {
  return (
    <div className="h-full bg-background flex flex-col overflow-hidden">
      {/* Header */}
      <div className="glass-header flex items-center gap-3 p-4 border-b">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="font-medium">Settings</h2>
          <p className="text-sm text-muted-foreground">Manage your preferences</p>
        </div>
      </div>

      {/* Settings Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Quick Toggle */}
        <Card className="glass-card liquid-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#183543] to-[#2a4a5a] rounded-xl flex items-center justify-center">
                  <span className="text-white text-lg">🌙</span>
                </div>
                <div>
                  <h3 className="font-medium">Dark Mode</h3>
                  <p className="text-sm text-muted-foreground">Better for low-light environments</p>
                </div>
              </div>
              <Switch
                checked={isDarkMode}
                onCheckedChange={onThemeChange}
              />
            </div>
          </CardContent>
        </Card>

        {/* Settings Groups */}
        {settingsGroups.map((group, groupIndex) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: groupIndex * 0.1 }}
          >
            <h3 className="font-medium mb-3 text-muted-foreground uppercase text-xs tracking-wider">
              {group.title}
            </h3>
            <Card className="glass-card liquid-border">
              <CardContent className="p-0">
                {group.items.map((item, index) => (
                  <div
                    key={item.id}
                    className={`p-4 cursor-pointer hover:bg-accent/50 transition-colors ${
                      index < group.items.length - 1 ? 'border-b border-border' : ''
                    }`}
                    onClick={() => onNavigate(item.screen)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#183543] to-[#2a4a5a] rounded-xl flex items-center justify-center">
                        <item.icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{item.label}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {/* App Tour */}
        {onRestartWalkthrough && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card 
              className="glass-card liquid-border border-blue-200 bg-blue-50/50 cursor-pointer liquid-hover"
              onClick={onRestartWalkthrough}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <span className="text-white text-lg">✨</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-blue-800">App Tour</h4>
                    <p className="text-sm text-blue-600">Restart the interactive walkthrough</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Emergency SOS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card 
            className="glass-card liquid-border border-red-200 bg-red-50/50 cursor-pointer liquid-hover"
            onClick={() => onNavigate('emergency-sos')}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold">SOS</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-red-800">Emergency SOS</h4>
                  <p className="text-sm text-red-600">Quick access to emergency services</p>
                </div>
                <ChevronRight className="h-4 w-4 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* App Info */}
        <div className="text-center py-6 space-y-2">
          <h4 className="font-medium">Arkan Infinity</h4>
          <p className="text-sm text-muted-foreground">Version 1.0.0</p>
          <p className="text-xs text-muted-foreground">
            Making communication accessible for everyone
          </p>
        </div>
      </div>
    </div>
  );
}