import React, { useState } from 'react';
import { Bell, MessageCircle, UserPlus, Heart, AlertTriangle, Settings } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';

interface Notification {
  id: string;
  type: 'mention' | 'connection' | 'like' | 'comment' | 'system' | 'sos';
  title: string;
  description: string;
  timeAgo: string;
  isRead: boolean;
  avatar?: string;
  priority?: 'high' | 'normal';
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'mention',
    title: 'Sarah Chen mentioned you',
    description: 'in a post about accessibility features',
    timeAgo: '5m ago',
    isRead: false,
    avatar: 'SC',
  },
  {
    id: '2',
    type: 'connection',
    title: 'David Chen wants to connect',
    description: 'Accessibility Engineer at Google',
    timeAgo: '1h ago',
    isRead: false,
    avatar: 'DC',
  },
  {
    id: '3',
    type: 'like',
    title: '12 people liked your post',
    description: 'about sign language technology',
    timeAgo: '2h ago',
    isRead: true,
  },
  {
    id: '4',
    type: 'system',
    title: 'Avatar generation complete',
    description: 'Your new avatar is ready to use',
    timeAgo: '3h ago',
    isRead: false,
    priority: 'high',
  },
  {
    id: '5',
    type: 'comment',
    title: 'Lisa Rodriguez commented',
    description: 'on your post about ASL education',
    timeAgo: '1d ago',
    isRead: true,
    avatar: 'LR',
  },
  {
    id: '6',
    type: 'sos',
    title: 'SOS Test Successful',
    description: 'Emergency alert system is working correctly',
    timeAgo: '2d ago',
    isRead: true,
    priority: 'high',
  },
];

const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'mention':
      return MessageCircle;
    case 'connection':
      return UserPlus;
    case 'like':
      return Heart;
    case 'comment':
      return MessageCircle;
    case 'system':
      return Bell;
    case 'sos':
      return AlertTriangle;
    default:
      return Bell;
  }
};

const getNotificationColor = (type: Notification['type']) => {
  switch (type) {
    case 'mention':
      return 'text-blue-600 bg-blue-100';
    case 'connection':
      return 'text-green-600 bg-green-100';
    case 'like':
      return 'text-red-600 bg-red-100';
    case 'comment':
      return 'text-purple-600 bg-purple-100';
    case 'system':
      return 'text-orange-600 bg-orange-100';
    case 'sos':
      return 'text-red-600 bg-red-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};

export function NotificationsScreen() {
  const [activeTab, setActiveTab] = useState('all');

  const filterNotifications = (notifications: Notification[], filter: string) => {
    switch (filter) {
      case 'mentions':
        return notifications.filter(n => n.type === 'mention' || n.type === 'comment');
      case 'system':
        return notifications.filter(n => n.type === 'system');
      case 'sos':
        return notifications.filter(n => n.type === 'sos');
      default:
        return notifications;
    }
  };

  const renderNotification = (notification: Notification) => {
    const Icon = getNotificationIcon(notification.type);
    const colorClasses = getNotificationColor(notification.type);

    return (
      <Card 
        key={notification.id} 
        className={`mb-3 cursor-pointer hover:shadow-md transition-shadow ${
          !notification.isRead ? 'border-l-4 border-l-blue-500' : ''
        }`}
      >
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colorClasses}`}>
              {notification.avatar ? (
                <span className="text-sm font-medium">{notification.avatar}</span>
              ) : (
                <Icon className="h-5 w-5" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <p className={`text-sm ${!notification.isRead ? 'font-medium' : ''}`}>
                    {notification.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {notification.description}
                  </p>
                </div>
                <div className="flex items-center gap-2 ml-2">
                  {notification.priority === 'high' && (
                    <Badge variant="destructive" className="text-xs">High</Badge>
                  )}
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {notification.timeAgo}
                  </span>
                </div>
              </div>
              {!notification.isRead && (
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const unreadCount = mockNotifications.filter(n => !n.isRead).length;
  const mentionsCount = filterNotifications(mockNotifications, 'mentions').filter(n => !n.isRead).length;
  const systemCount = filterNotifications(mockNotifications, 'system').filter(n => !n.isRead).length;
  const sosCount = filterNotifications(mockNotifications, 'sos').filter(n => !n.isRead).length;

  return (
    <div className="h-full bg-background">
      <div className="flex items-center justify-between p-4 border-b">
        <div>
          <h2>Notifications</h2>
          {unreadCount > 0 && (
            <p className="text-sm text-muted-foreground">
              {unreadCount} unread notifications
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Mark all read
          </Button>
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
        <TabsList className="grid w-full grid-cols-4 mx-4 mt-4">
          <TabsTrigger value="all">
            All
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-1 text-xs">
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="mentions">
            Mentions
            {mentionsCount > 0 && (
              <Badge variant="destructive" className="ml-1 text-xs">
                {mentionsCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="system">
            System
            {systemCount > 0 && (
              <Badge variant="destructive" className="ml-1 text-xs">
                {systemCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="sos">
            SOS
            {sosCount > 0 && (
              <Badge variant="destructive" className="ml-1 text-xs">
                {sosCount}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="px-4 mt-4">
          <ScrollArea className="h-[calc(100vh-200px)]">
            {mockNotifications.length > 0 ? (
              mockNotifications.map(renderNotification)
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Bell className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No notifications yet</p>
              </div>
            )}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="mentions" className="px-4 mt-4">
          <ScrollArea className="h-[calc(100vh-200px)]">
            {filterNotifications(mockNotifications, 'mentions').map(renderNotification)}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="system" className="px-4 mt-4">
          <ScrollArea className="h-[calc(100vh-200px)]">
            {filterNotifications(mockNotifications, 'system').map(renderNotification)}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="sos" className="px-4 mt-4">
          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="mb-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                <h4>SOS Notifications</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Emergency alerts and system status updates for your SOS feature
              </p>
            </div>
            {filterNotifications(mockNotifications, 'sos').map(renderNotification)}
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}