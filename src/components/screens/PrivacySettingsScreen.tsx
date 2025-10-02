import React, { useState } from 'react';
import { ArrowLeft, Lock, Eye, EyeOff, Shield, Users, Bell, MapPin } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface PrivacySettingsScreenProps {
  onBack: () => void;
}

export function PrivacySettingsScreen({ onBack }: PrivacySettingsScreenProps) {
  const [profileVisibility, setProfileVisibility] = useState('public');
  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [showLocation, setShowLocation] = useState(true);
  const [allowMessages, setAllowMessages] = useState('everyone');
  const [showActivity, setShowActivity] = useState(true);
  const [showConnections, setShowConnections] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);
  const [personalization, setPersonalization] = useState(true);

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
        <h2 className="flex-1">Privacy Settings</h2>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-20 lg:pb-6">
        <div className="px-4 py-6 space-y-6">
          {/* Profile Visibility */}
          <Card className="p-6 glass-card space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#183543]/10 flex items-center justify-center flex-shrink-0">
                <Eye className="h-5 w-5 text-[#183543]" />
              </div>
              <div className="flex-1">
                <h3 className="mb-1">Profile Visibility</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Control who can see your profile
                </p>
                <Select value={profileVisibility} onValueChange={setProfileVisibility}>
                  <SelectTrigger className="glass">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public - Anyone can see</SelectItem>
                    <SelectItem value="connections">Connections Only</SelectItem>
                    <SelectItem value="private">Private - Only you</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* Contact Information */}
          <Card className="p-6 glass-card space-y-4">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#183543]/10 flex items-center justify-center flex-shrink-0">
                <Shield className="h-5 w-5 text-[#183543]" />
              </div>
              <div>
                <h3>Contact Information</h3>
                <p className="text-sm text-muted-foreground">
                  Choose what contact info to display
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Label htmlFor="show-email">Show Email Address</Label>
                  <p className="text-sm text-muted-foreground">
                    Display your email on your profile
                  </p>
                </div>
                <Switch
                  id="show-email"
                  checked={showEmail}
                  onCheckedChange={setShowEmail}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Label htmlFor="show-phone">Show Phone Number</Label>
                  <p className="text-sm text-muted-foreground">
                    Display your phone number on your profile
                  </p>
                </div>
                <Switch
                  id="show-phone"
                  checked={showPhone}
                  onCheckedChange={setShowPhone}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Label htmlFor="show-location">Show Location</Label>
                  <p className="text-sm text-muted-foreground">
                    Display your city and state
                  </p>
                </div>
                <Switch
                  id="show-location"
                  checked={showLocation}
                  onCheckedChange={setShowLocation}
                />
              </div>
            </div>
          </Card>

          {/* Messaging */}
          <Card className="p-6 glass-card space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#183543]/10 flex items-center justify-center flex-shrink-0">
                <Users className="h-5 w-5 text-[#183543]" />
              </div>
              <div className="flex-1">
                <h3 className="mb-1">Who Can Message You</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Control who can send you messages
                </p>
                <Select value={allowMessages} onValueChange={setAllowMessages}>
                  <SelectTrigger className="glass">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="everyone">Everyone</SelectItem>
                    <SelectItem value="connections">Connections Only</SelectItem>
                    <SelectItem value="no-one">No One</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* Activity & Presence */}
          <Card className="p-6 glass-card space-y-4">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#183543]/10 flex items-center justify-center flex-shrink-0">
                <Bell className="h-5 w-5 text-[#183543]" />
              </div>
              <div>
                <h3>Activity & Presence</h3>
                <p className="text-sm text-muted-foreground">
                  Control what others can see about your activity
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Label htmlFor="show-activity">Show Activity Status</Label>
                  <p className="text-sm text-muted-foreground">
                    Let others see when you're online
                  </p>
                </div>
                <Switch
                  id="show-activity"
                  checked={showActivity}
                  onCheckedChange={setShowActivity}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Label htmlFor="show-connections">Show Connections</Label>
                  <p className="text-sm text-muted-foreground">
                    Display your connection count
                  </p>
                </div>
                <Switch
                  id="show-connections"
                  checked={showConnections}
                  onCheckedChange={setShowConnections}
                />
              </div>
            </div>
          </Card>

          {/* Data & Personalization */}
          <Card className="p-6 glass-card space-y-4">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#183543]/10 flex items-center justify-center flex-shrink-0">
                <Lock className="h-5 w-5 text-[#183543]" />
              </div>
              <div>
                <h3>Data & Personalization</h3>
                <p className="text-sm text-muted-foreground">
                  Manage how your data is used
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Label htmlFor="personalization">Personalized Experience</Label>
                  <p className="text-sm text-muted-foreground">
                    Use my data to personalize content
                  </p>
                </div>
                <Switch
                  id="personalization"
                  checked={personalization}
                  onCheckedChange={setPersonalization}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Label htmlFor="data-sharing">Data Sharing for Research</Label>
                  <p className="text-sm text-muted-foreground">
                    Share anonymized data for accessibility research
                  </p>
                </div>
                <Switch
                  id="data-sharing"
                  checked={dataSharing}
                  onCheckedChange={setDataSharing}
                />
              </div>
            </div>
          </Card>

          {/* Account Actions */}
          <Card className="p-6 glass-card space-y-4">
            <h3 className="mb-4">Account Management</h3>
            
            <Button variant="outline" className="w-full justify-start">
              <Lock className="h-4 w-4 mr-2" />
              Change Password
            </Button>

            <Button variant="outline" className="w-full justify-start">
              <Shield className="h-4 w-4 mr-2" />
              Two-Factor Authentication
            </Button>

            <Button variant="outline" className="w-full justify-start">
              Download My Data
            </Button>

            <Button variant="destructive" className="w-full justify-start">
              Delete Account
            </Button>
          </Card>

          {/* Privacy Notice */}
          <Card className="p-6 glass-card bg-gradient-to-r from-blue-500/10 to-purple-500/10">
            <h4 className="mb-2">Your Privacy Matters</h4>
            <p className="text-sm text-muted-foreground">
              We're committed to protecting your privacy. Read our{' '}
              <Button variant="link" className="p-0 h-auto text-[#183543]">
                Privacy Policy
              </Button>{' '}
              to learn more about how we handle your data.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
