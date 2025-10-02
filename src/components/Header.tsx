import React from 'react';
import { Search, Plus, MessageCircle, Home, Users, Infinity, GraduationCap, Bell, Briefcase } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import type { Screen } from '../App';
import arkanLogo from 'figma:asset/99b3bedf02fee33c38a846fb7da497383fe8687c.png';

interface HeaderProps {
  onProfileClick: () => void;
  onMessagesClick: () => void;
  onCreateClick: () => void;
  onSearchClick?: () => void;
  currentScreen?: Screen;
  onNavigate?: (screen: Screen) => void;
}

const desktopNavItems = [
  { id: 'home' as Screen, label: 'Home', icon: Home },
  { id: 'connections' as Screen, label: 'My Network', icon: Users },
  { id: 'infinity' as Screen, label: 'Infinity', icon: Infinity },
  { id: 'education' as Screen, label: 'Learning', icon: GraduationCap },
  { id: 'notifications' as Screen, label: 'Notifications', icon: Bell },
];

export function Header({ onProfileClick, onMessagesClick, onCreateClick, onSearchClick, currentScreen, onNavigate }: HeaderProps) {

  return (
    <header className="h-14 lg:h-16 glass-header px-4 lg:px-6 flex items-center justify-between sticky top-0 z-40">
      {/* Mobile Layout (existing) */}
      <div className="flex lg:hidden items-center justify-between w-full">
        {/* Profile Avatar */}
        <button 
          onClick={onProfileClick}
          className="w-9 h-9 bg-[#183543] rounded-full flex items-center justify-center hover:scale-105 transition-all duration-300 shadow-lg liquid-hover"
          data-walkthrough="profile"
        >
          <span className="text-white text-sm font-medium">JD</span>
        </button>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search people, posts, topics..."
              className="pl-10 h-10 glass liquid-border border-white/20 backdrop-blur-md cursor-pointer"
              onClick={onSearchClick}
              readOnly
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onCreateClick}
            className="w-10 h-10 rounded-full p-0 glass liquid-hover hover:bg-white/20"
            data-walkthrough="create-post"
          >
            <Plus className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onMessagesClick}
            className="w-10 h-10 rounded-full p-0 relative glass liquid-hover hover:bg-white/20"
            data-walkthrough="messages"
          >
            <MessageCircle className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-400 to-red-600 rounded-full shadow-lg pulse"></span>
          </Button>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex items-center justify-between w-full">
        {/* Left Section - Logo + Navigation */}
        <div className="flex items-center gap-6 xl:gap-8">
          {/* Logo/Brand */}
          <div className="flex items-center gap-2">

            <img src={arkanLogo} alt="Arkan Infinity" className="h-12 w-auto hidden xl:block object-contain" />
          </div>

          {/* Desktop Navigation */}
          <nav className="flex items-center">
            {desktopNavItems.map(({ id, label, icon: Icon }) => {
              const isActive = currentScreen === id;
              return (
                <button
                  key={id}
                  onClick={() => onNavigate?.(id)}
                  className={`relative flex flex-col items-center justify-center px-3 xl:px-4 py-2 transition-all duration-300 rounded-xl group ${
                    isActive 
                      ? 'text-[#183543]' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <div className={`p-2 rounded-lg transition-all duration-300 ${
                    isActive ? 'glass-strong shadow-lg scale-105' : 'group-hover:glass group-hover:scale-105'
                  }`}>
                    <Icon className={`h-5 w-5 transition-all duration-300 ${
                      isActive ? 'fill-current drop-shadow-md' : ''
                    }`} />
                  </div>
                  <span className={`text-xs mt-1 transition-all duration-300 whitespace-nowrap ${
                    isActive ? 'font-medium' : ''
                  }`}>{label}</span>
                  {isActive && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-[#183543] rounded-full shadow-lg"></div>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Center Section - Search */}
        <div className="flex-1 max-w-lg mx-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search people, posts, topics..."
              className="pl-12 h-12 glass liquid-border border-white/20 backdrop-blur-md cursor-pointer text-base"
              onClick={onSearchClick}
              readOnly
            />
          </div>
        </div>

        {/* Right Section - Actions + Profile */}
        <div className="flex items-center gap-4">
          {/* Messages */}
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onMessagesClick}
            className="relative flex flex-col items-center justify-center px-4 py-2 rounded-xl group hover:glass transition-all duration-300"
            data-walkthrough="messages"
          >
            <div className="p-2 rounded-lg group-hover:glass-strong transition-all duration-300">
              <MessageCircle className="h-5 w-5" />
            </div>
            <span className="text-xs mt-1">Messaging</span>
            <span className="absolute top-1 right-1 w-3 h-3 bg-gradient-to-r from-red-400 to-red-600 rounded-full shadow-lg pulse"></span>
          </Button>

          {/* Create Post */}
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onCreateClick}
            className="flex flex-col items-center justify-center px-4 py-2 rounded-xl group hover:glass transition-all duration-300"
          >
            <div className="p-2 rounded-lg group-hover:glass-strong transition-all duration-300">
              <Plus className="h-5 w-5" />
            </div>
            <span className="text-xs mt-1">Create</span>
          </Button>

          {/* Profile Menu */}
          <button 
            onClick={onProfileClick}
            className="flex flex-col items-center justify-center px-4 py-2 rounded-xl group hover:glass transition-all duration-300"
          >
            <div className="w-10 h-10 bg-[#183543] rounded-full flex items-center justify-center shadow-lg group-hover:scale-105 transition-all duration-300">
              <span className="text-white text-sm font-medium">JD</span>
            </div>
            <span className="text-xs mt-1">Me</span>
          </button>
        </div>
      </div>
    </header>
  );
}