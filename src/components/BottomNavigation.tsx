import React from 'react';
import { Home, Users, Infinity, GraduationCap, Bell } from 'lucide-react';
import type { Screen } from '../App';

interface BottomNavigationProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

const navItems = [
  { id: 'home' as Screen, label: 'Home', icon: Home },
  { id: 'connections' as Screen, label: 'Network', icon: Users },
  { id: 'infinity' as Screen, label: 'Infinity', icon: Infinity },
  { id: 'education' as Screen, label: 'Education', icon: GraduationCap },
  { id: 'notifications' as Screen, label: 'Alerts', icon: Bell },
];

export function BottomNavigation({ currentScreen, onNavigate }: BottomNavigationProps) {
  return (
    <nav className="h-16 glass-nav flex items-center justify-around px-2 relative border-t border-white/10">
      {navItems.map(({ id, label, icon: Icon }) => {
        const isActive = currentScreen === id;
        return (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className={`relative flex flex-col items-center justify-center flex-1 h-full transition-all duration-300 rounded-xl ${
              isActive 
                ? 'text-[#183543] transform scale-105' 
                : 'text-muted-foreground hover:text-foreground hover:scale-105'
            }`}
            data-walkthrough={id === 'education' ? 'education' : undefined}
          >
            <div className={`p-1.5 rounded-xl transition-all duration-300 ${
              isActive ? 'glass-strong shadow-lg' : 'hover:glass'
            }`}>
              <Icon className={`h-5 w-5 transition-all duration-300 ${
                isActive ? 'fill-current drop-shadow-md' : ''
              }`} />
            </div>
            <span className={`text-xs mt-1 transition-all duration-300 ${
              isActive ? 'font-medium' : ''
            }`}>{label}</span>
            {isActive && (
              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#183543] rounded-full shadow-lg"></div>
            )}
          </button>
        );
      })}
    </nav>
  );
}