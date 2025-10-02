import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { Settings, Languages, Palette, User, Film, LogOut } from 'lucide-react';
import type { Screen } from '../App';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (screen: Screen) => void;
  signLanguage: string;
  onSignLanguageChange: (value: string) => void;
  spokenLanguage: string;
  onSpokenLanguageChange: (value: string) => void;
  isDarkMode: boolean;
  onThemeChange: (checked: boolean) => void;
  onLogout?: () => void;
}

export function Sidebar({
  isOpen,
  onClose,
  onNavigate,
  signLanguage,
  onSignLanguageChange,
  spokenLanguage,
  onSpokenLanguageChange,
  isDarkMode,
  onThemeChange,
  onLogout
}: SidebarProps) {
  if (!isOpen) return null;

  const handleNavigate = (screen: Screen) => {
    onNavigate(screen);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
      onClick={onClose}
    >
      <div 
        className="glass-sidebar w-80 h-full overflow-y-auto liquid-border"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Profile Section */}
        <div className="p-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-[#183543] to-[#2a4a5a] rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-medium">JD</span>
            </div>
            <div>
              <h3 className="font-medium">John Doe</h3>
              <p className="text-muted-foreground text-sm">Software Engineer</p>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="space-y-3 mb-8">
            <button 
              className="flex items-center gap-3 w-full text-left py-3 px-4 liquid-border glass liquid-hover"
              onClick={() => handleNavigate('profile')}
            >
              <User size={20} />
              <span className="font-medium">View Profile</span>
            </button>
            <button 
              className="flex items-center gap-3 w-full text-left py-3 px-4 liquid-border glass liquid-hover"
              onClick={() => handleNavigate('avatar-studio')}
            >
              <Film size={20} />
              <span className="font-medium">Avatar Studio</span>
            </button>
          </nav>

          <Separator className="my-6 opacity-30" />

          {/* Settings Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 glass rounded-xl">
                <Settings size={20} />
              </div>
              <h4 className="font-medium">Settings</h4>
            </div>

            {/* Sign Language Selection */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Languages size={16} />
                <label className="text-sm">Sign Language</label>
              </div>
              <Select value={signLanguage} onValueChange={onSignLanguageChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select sign language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ASL">ASL (American Sign Language)</SelectItem>
                  <SelectItem value="BSL">BSL (British Sign Language)</SelectItem>
                  <SelectItem value="FSL">FSL (French Sign Language)</SelectItem>
                  <SelectItem value="GSL">GSL (German Sign Language)</SelectItem>
                  <SelectItem value="JSL">JSL (Japanese Sign Language)</SelectItem>
                  <SelectItem value="CSL">CSL (Chinese Sign Language)</SelectItem>
                  <SelectItem value="ISL">ISL (Indian Sign Language)</SelectItem>
                  <SelectItem value="AUSLAN">Auslan (Australian Sign Language)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Spoken Language Selection */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Languages size={16} />
                <label className="text-sm">Spoken Language</label>
              </div>
              <Select value={spokenLanguage} onValueChange={onSpokenLanguageChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select spoken language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Spanish">Spanish</SelectItem>
                  <SelectItem value="French">French</SelectItem>
                  <SelectItem value="German">German</SelectItem>
                  <SelectItem value="Japanese">Japanese</SelectItem>
                  <SelectItem value="Chinese">Chinese (Mandarin)</SelectItem>
                  <SelectItem value="Hindi">Hindi</SelectItem>
                  <SelectItem value="Portuguese">Portuguese</SelectItem>
                  <SelectItem value="Russian">Russian</SelectItem>
                  <SelectItem value="Arabic">Arabic</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator className="my-4" />
            
            {/* Quick Actions */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Settings size={16} />
                <label className="text-sm">Quick Actions</label>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleNavigate('settings')}
                  className="flex items-center gap-2 p-3 text-xs bg-accent/30 rounded-xl hover:bg-accent/50 transition-colors"
                >
                  <Settings size={14} />
                  <span>Settings</span>
                </button>
                <button
                  onClick={() => handleNavigate('avatar-studio')}
                  className="flex items-center gap-2 p-3 text-xs bg-accent/30 rounded-xl hover:bg-accent/50 transition-colors"
                >
                  <Film size={14} />
                  <span>Avatar Studio</span>
                </button>
              </div>
            </div>

            <Separator className="my-4" />

            {/* Theme Customization */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Palette size={16} />
                <label className="text-sm">Theme</label>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="text-sm">Dark Mode</div>
                  <div className="text-xs text-muted-foreground">
                    Switch between light and dark themes
                  </div>
                </div>
                <Switch 
                  checked={isDarkMode} 
                  onCheckedChange={onThemeChange}
                />
              </div>
            </div>

            {/* Logout Button */}
            {onLogout && (
              <>
                <Separator className="my-4" />
                <button
                  onClick={() => {
                    onLogout();
                    onClose();
                  }}
                  className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-destructive/10 transition-colors text-destructive"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Log Out</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}