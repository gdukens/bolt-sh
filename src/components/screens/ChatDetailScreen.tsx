import React, { useState } from 'react';
import { ArrowLeft, Video, Phone, MoreVertical, Send, Smile, Paperclip, Mic, Camera } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import type { Screen } from '../../App';

interface ChatDetailScreenProps {
  onBack: () => void;
  onNavigate: (screen: Screen) => void;
  contactId?: string;
}

export function ChatDetailScreen({ onBack, onNavigate, contactId }: ChatDetailScreenProps) {
  const [message, setMessage] = useState('');

  const contact = {
    name: 'Sarah Martinez',
    title: 'UX Designer',
    avatar: 'SM',
    online: true
  };

  const messages = [
    {
      id: '1',
      sender: 'them',
      content: 'Hey! Did you see the new accessibility features announced today?',
      time: '10:30 AM',
      avatar: 'SM'
    },
    {
      id: '2',
      sender: 'me',
      content: 'Yes! The sign language translation looks amazing!',
      time: '10:32 AM'
    },
    {
      id: '3',
      sender: 'them',
      content: 'Right? I\'m especially excited about the AI avatar feature. Would love to try it out.',
      time: '10:33 AM',
      avatar: 'SM'
    },
    {
      id: '4',
      sender: 'me',
      content: 'We should definitely test it together. Maybe schedule a video call?',
      time: '10:35 AM'
    },
    {
      id: '5',
      sender: 'them',
      content: 'Perfect! How about tomorrow at 2 PM?',
      time: '10:36 AM',
      avatar: 'SM'
    },
    {
      id: '6',
      sender: 'me',
      content: 'Sounds good! Looking forward to it 🤟',
      time: '10:37 AM'
    }
  ];

  const handleSend = () => {
    if (message.trim()) {
      // Handle send message
      setMessage('');
    }
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
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-[#183543] flex items-center justify-center">
              <span className="text-white text-sm">{contact.avatar}</span>
            </div>
            {contact.online && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="truncate">{contact.name}</h3>
            <p className="text-xs text-muted-foreground truncate">{contact.title}</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="w-10 h-10 rounded-full p-0">
          <Video className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="sm" className="w-10 h-10 rounded-full p-0">
          <Phone className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="sm" className="w-10 h-10 rounded-full p-0">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.sender === 'me' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            {msg.sender === 'them' && (
              <div className="w-8 h-8 rounded-full bg-[#183543] flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs">{msg.avatar}</span>
              </div>
            )}
            <div className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'} max-w-[70%]`}>
              <div
                className={`px-4 py-2 rounded-2xl ${
                  msg.sender === 'me'
                    ? 'bg-[#183543] text-white rounded-br-sm'
                    : 'glass-card rounded-bl-sm'
                }`}
              >
                <p className="text-sm">{msg.content}</p>
              </div>
              <span className="text-xs text-muted-foreground mt-1 px-2">{msg.time}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="glass-nav p-4 border-t border-border">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="w-10 h-10 rounded-full p-0 flex-shrink-0">
            <Smile className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="sm" className="w-10 h-10 rounded-full p-0 flex-shrink-0">
            <Paperclip className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="sm" className="w-10 h-10 rounded-full p-0 flex-shrink-0">
            <Camera className="h-5 w-5" />
          </Button>
          <Input
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 glass"
          />
          {message.trim() ? (
            <Button
              size="sm"
              className="w-10 h-10 rounded-full p-0 bg-[#183543] hover:bg-[#183543]/90 text-white flex-shrink-0"
              onClick={handleSend}
            >
              <Send className="h-5 w-5" />
            </Button>
          ) : (
            <Button variant="ghost" size="sm" className="w-10 h-10 rounded-full p-0 flex-shrink-0">
              <Mic className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
