import React, { useState } from 'react';
import { ArrowLeft, Search, Phone, Video, Send, Smile, Camera, Mic, Play } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { ScrollArea } from '../ui/scroll-area';
import type { Screen } from '../../App';

interface MessagesScreenProps {
  onNavigate: (screen: Screen) => void;
}

interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  timeAgo: string;
  unreadCount: number;
  avatar: string;
  isOnline: boolean;
}

interface Message {
  id: string;
  senderId: string;
  content: string;
  type: 'text' | 'sign-video' | 'avatar';
  timestamp: string;
  isOwn: boolean;
}

const mockConversations: Conversation[] = [
  { id: '1', name: 'Sarah Chen', lastMessage: 'Great work on the presentation!', timeAgo: '2m', unreadCount: 2, avatar: 'SC', isOnline: true },
  { id: '2', name: 'Dr. Maya Patel', lastMessage: 'Thanks for sharing the research paper', timeAgo: '1h', unreadCount: 0, avatar: 'MP', isOnline: false },
  { id: '3', name: 'Alex Thompson', lastMessage: '👋 (Sign video)', timeAgo: '3h', unreadCount: 1, avatar: 'AT', isOnline: true },
  { id: '4', name: 'Team Chat', lastMessage: 'Meeting starts in 10 minutes', timeAgo: '5h', unreadCount: 0, avatar: 'TC', isOnline: false },
];

const mockMessages: Message[] = [
  { id: '1', senderId: 'other', content: 'Hey! How are you doing?', type: 'text', timestamp: '10:30 AM', isOwn: false },
  { id: '2', senderId: 'own', content: 'I\'m doing great! Just finished the avatar feature', type: 'text', timestamp: '10:32 AM', isOwn: true },
  { id: '3', senderId: 'other', content: 'That\'s awesome! Can you show me?', type: 'text', timestamp: '10:33 AM', isOwn: false },
  { id: '4', senderId: 'own', content: 'Sure! Here\'s a quick demo', type: 'sign-video', timestamp: '10:35 AM', isOwn: true },
  { id: '5', senderId: 'other', content: 'Wow, that looks amazing!', type: 'avatar', timestamp: '10:37 AM', isOwn: false },
];

export function MessagesScreen({ onNavigate }: MessagesScreenProps) {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');

  const handleBackToList = () => {
    setSelectedConversation(null);
  };

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // Handle sending message
      setMessageText('');
    }
  };

  const renderMessageBubble = (message: Message) => (
    <div key={message.id} className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[70%] ${message.isOwn ? 'order-2' : 'order-1'}`}>
        <div className={`rounded-2xl px-4 py-2 ${
          message.isOwn 
            ? 'bg-[#0A66C2] text-white' 
            : 'bg-gray-100 text-gray-900'
        }`}>
          {message.type === 'text' && (
            <p className="text-sm">{message.content}</p>
          )}
          {message.type === 'sign-video' && (
            <div className="space-y-2">
              <div className="bg-black bg-opacity-20 rounded-lg aspect-video flex items-center justify-center">
                <Play className="h-6 w-6 text-white" />
              </div>
              <p className="text-sm">Sign video message</p>
            </div>
          )}
          {message.type === 'avatar' && (
            <div className="space-y-2">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg aspect-video flex items-center justify-center">
                <span className="text-2xl">👤</span>
              </div>
              <p className="text-sm">Avatar message</p>
            </div>
          )}
        </div>
        <p className={`text-xs text-gray-500 mt-1 ${message.isOwn ? 'text-right' : 'text-left'}`}>
          {message.timestamp}
        </p>
      </div>
    </div>
  );

  if (selectedConversation) {
    const conversation = mockConversations.find(c => c.id === selectedConversation);
    
    return (
      <div className="h-full flex flex-col bg-background">
        {/* Chat Header */}
        <div className="flex items-center gap-3 p-4 border-b">
          <Button variant="ghost" size="sm" onClick={handleBackToList}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="w-10 h-10 bg-[#0A66C2] rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">{conversation?.avatar}</span>
          </div>
          <div className="flex-1">
            <h3 className="font-medium">{conversation?.name}</h3>
            <p className="text-sm text-muted-foreground">
              {conversation?.isOnline ? 'Online' : 'Last seen 2h ago'}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm">
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Video className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          {mockMessages.map(renderMessageBubble)}
        </ScrollArea>

        {/* Message Input */}
        <div className="p-4 border-t">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Smile className="h-4 w-4" />
            </Button>
            <Input
              placeholder="Type a message..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button variant="ghost" size="sm">
              <Camera className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Mic className="h-4 w-4" />
            </Button>
            <Button size="sm" onClick={handleSendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex gap-2 mt-2">
            <Button variant="outline" size="sm" className="text-xs">
              📹 Start Sign Capture
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              👤 Send Avatar
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-background">
      {/* Messages Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2>Messages</h2>
          <Button variant="ghost" size="sm">
            <Search className="h-4 w-4" />
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input placeholder="Search messages..." className="pl-10" />
        </div>
      </div>

      {/* Conversations List */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-2">
          {mockConversations.map((conversation) => (
            <div
              key={conversation.id}
              className="flex items-center gap-3 p-3 hover:bg-accent rounded-lg cursor-pointer transition-colors"
              onClick={() => onNavigate('chat-detail')}
            >
              <div className="relative">
                <div className="w-12 h-12 bg-[#0A66C2] rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">{conversation.avatar}</span>
                </div>
                {conversation.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium truncate">{conversation.name}</h4>
                  <span className="text-xs text-muted-foreground">{conversation.timeAgo}</span>
                </div>
                <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
              </div>
              {conversation.unreadCount > 0 && (
                <div className="w-5 h-5 bg-[#0A66C2] rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">{conversation.unreadCount}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}