import React, { useState } from 'react';
import { ArrowLeft, Camera, Plus, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Card } from '../ui/card';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';

interface ProfileEditScreenProps {
  onBack: () => void;
}

export function ProfileEditScreen({ onBack }: ProfileEditScreenProps) {
  const [name, setName] = useState('John Doe');
  const [headline, setHeadline] = useState('Software Engineer | Accessibility Advocate');
  const [location, setLocation] = useState('San Francisco, CA');
  const [about, setAbout] = useState('Passionate about creating accessible technology for everyone.');
  const [skills, setSkills] = useState(['React', 'TypeScript', 'Accessibility', 'Sign Language']);
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleSave = () => {
    // Handle save profile
    onBack();
  };

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
        <h2 className="flex-1">Edit Profile</h2>
        <Button
          className="bg-[#183543] hover:bg-[#183543]/90 text-white"
          onClick={handleSave}
        >
          Save
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-20 lg:pb-6">
        <div className="px-4 py-6 space-y-6">
          {/* Profile Photo */}
          <Card className="p-6 glass-card">
            <Label className="mb-4 block">Profile Photo</Label>
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 rounded-full bg-[#183543] flex items-center justify-center relative group">
                <span className="text-white text-2xl">JD</span>
                <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                  <Camera className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <Button variant="outline">Upload Photo</Button>
                <p className="text-sm text-muted-foreground mt-2">
                  JPG, PNG or GIF. Max size 5MB.
                </p>
              </div>
            </div>
          </Card>

          {/* Cover Photo */}
          <Card className="p-6 glass-card">
            <Label className="mb-4 block">Cover Photo</Label>
            <div className="relative h-32 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl overflow-hidden group cursor-pointer">
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Camera className="h-8 w-8 text-white" />
              </div>
            </div>
            <Button variant="outline" className="mt-4">Upload Cover</Button>
          </Card>

          {/* Basic Info */}
          <Card className="p-6 glass-card space-y-4">
            <h3>Basic Information</h3>
            
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="glass"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="headline">Headline *</Label>
              <Input
                id="headline"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder="e.g. Software Engineer at Company"
                className="glass"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City, State/Country"
                className="glass"
              />
            </div>
          </Card>

          {/* About */}
          <Card className="p-6 glass-card space-y-4">
            <h3>About</h3>
            <div className="space-y-2">
              <Label htmlFor="about">Tell us about yourself</Label>
              <Textarea
                id="about"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                placeholder="Write a few sentences about yourself..."
                className="min-h-[120px] glass"
              />
              <p className="text-xs text-muted-foreground">
                {about.length}/2000 characters
              </p>
            </div>
          </Card>

          {/* Skills */}
          <Card className="p-6 glass-card space-y-4">
            <h3>Skills</h3>
            <div className="space-y-2">
              <Label>Add Skills</Label>
              <div className="flex gap-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                  placeholder="e.g. JavaScript"
                  className="flex-1 glass"
                />
                <Button onClick={handleAddSkill} variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="px-3 py-1 pr-1">
                  {skill}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto w-auto p-0 ml-2 hover:bg-transparent"
                    onClick={() => handleRemoveSkill(skill)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </Card>

          {/* Contact Info */}
          <Card className="p-6 glass-card space-y-4">
            <h3>Contact Information</h3>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                className="glass"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                className="glass"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                type="url"
                placeholder="https://yourwebsite.com"
                className="glass"
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
