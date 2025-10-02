import React, { useState } from 'react';
import { Search, UserPlus, MessageCircle, Users } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import type { Screen } from '../../App';

interface ConnectionsScreenProps {
  onNavigate?: (screen: Screen) => void;
}

interface Connection {
  id: string;
  name: string;
  role: string;
  company: string;
  mutualConnections: number;
  avatar: string;
  isConnected: boolean;
  hasPendingRequest: boolean;
}

const mockSuggestions: Connection[] = [
  { id: '1', name: 'Emma Wilson', role: 'Sign Language Interpreter', company: 'City Hospital', mutualConnections: 5, avatar: 'EW', isConnected: false, hasPendingRequest: false },
  { id: '2', name: 'David Chen', role: 'Accessibility Engineer', company: 'Google', mutualConnections: 12, avatar: 'DC', isConnected: false, hasPendingRequest: false },
  { id: '3', name: 'Lisa Rodriguez', role: 'Deaf Education Specialist', company: 'ASL Academy', mutualConnections: 8, avatar: 'LR', isConnected: false, hasPendingRequest: false },
];

const mockRequests: Connection[] = [
  { id: '4', name: 'Michael Johnson', role: 'UX Researcher', company: 'Microsoft', mutualConnections: 3, avatar: 'MJ', isConnected: false, hasPendingRequest: true },
  { id: '5', name: 'Sarah Kim', role: 'Product Manager', company: 'Meta', mutualConnections: 7, avatar: 'SK', isConnected: false, hasPendingRequest: true },
];

const mockConnections: Connection[] = [
  { id: '6', name: 'Alex Thompson', role: 'Deaf Community Advocate', company: 'NAD', mutualConnections: 15, avatar: 'AT', isConnected: true, hasPendingRequest: false },
  { id: '7', name: 'Dr. Maya Patel', role: 'ASL Linguist', company: 'Stanford University', mutualConnections: 22, avatar: 'MP', isConnected: true, hasPendingRequest: false },
];

export function ConnectionsScreen({ onNavigate }: ConnectionsScreenProps = {}) {
  const [activeTab, setActiveTab] = useState('suggestions');
  const [searchQuery, setSearchQuery] = useState('');

  const handleConnect = (connectionId: string) => {
    console.log('Connecting to:', connectionId);
  };

  const handleMessage = (connectionId: string) => {
    console.log('Messaging:', connectionId);
  };

  const renderConnectionCard = (connection: Connection, showActions: boolean = true) => (
    <Card 
      key={connection.id} 
      className="mb-3 glass-card liquid-hover cursor-pointer"
      onClick={() => onNavigate?.('user-profile')}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#183543] rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white text-sm font-medium">{connection.avatar}</span>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium truncate">{connection.name}</h4>
            <p className="text-sm text-muted-foreground truncate">{connection.role}</p>
            <p className="text-sm text-muted-foreground truncate">{connection.company}</p>
            {connection.mutualConnections > 0 && (
              <p className="text-xs text-[#183543] mt-1">
                {connection.mutualConnections} mutual connections
              </p>
            )}
          </div>
          {showActions && (
            <div className="flex flex-col gap-2">
              {connection.isConnected ? (
                <Button size="sm" variant="outline" onClick={() => handleMessage(connection.id)}>
                  <MessageCircle className="h-3 w-3 mr-1" />
                  Message
                </Button>
              ) : connection.hasPendingRequest ? (
                <div className="space-y-1">
                  <Button size="sm" onClick={() => handleConnect(connection.id)}>
                    Accept
                  </Button>
                  <Button size="sm" variant="outline">
                    Ignore
                  </Button>
                </div>
              ) : (
                <Button size="sm" onClick={() => handleConnect(connection.id)}>
                  <UserPlus className="h-3 w-3 mr-1" />
                  Connect
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="h-full">
      <div className="p-4 glass-header">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search connections..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
        <TabsList className="grid w-full grid-cols-4 mx-4 mt-4">
          <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
          <TabsTrigger value="requests">
            Requests
            {mockRequests.length > 0 && (
              <Badge variant="destructive" className="ml-1 text-xs">
                {mockRequests.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="connections">My Network</TabsTrigger>
          <TabsTrigger value="communities">Groups</TabsTrigger>
        </TabsList>

        <TabsContent value="suggestions" className="px-4 mt-4">
          <div className="mb-4">
            <h3>People you may know</h3>
            <p className="text-sm text-muted-foreground">Based on your profile and connections</p>
          </div>
          <ScrollArea className="h-[calc(100vh-250px)]">
            {mockSuggestions.map(connection => renderConnectionCard(connection))}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="requests" className="px-4 mt-4">
          <div className="mb-4">
            <h3>Connection Requests</h3>
            <p className="text-sm text-muted-foreground">{mockRequests.length} pending requests</p>
          </div>
          <ScrollArea className="h-[calc(100vh-250px)]">
            {mockRequests.length > 0 ? (
              mockRequests.map(connection => renderConnectionCard(connection))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No pending requests</p>
              </div>
            )}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="connections" className="px-4 mt-4">
          <div className="mb-4">
            <h3>Your Connections</h3>
            <p className="text-sm text-muted-foreground">{mockConnections.length} connections</p>
          </div>
          <ScrollArea className="h-[calc(100vh-250px)]">
            {mockConnections.map(connection => renderConnectionCard(connection))}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="communities" className="px-4 mt-4">
          <div className="mb-4">
            <h3>Communities & Groups</h3>
            <p className="text-sm text-muted-foreground">Connect with like-minded professionals</p>
          </div>
          <ScrollArea className="h-[calc(100vh-250px)]">
            <div className="space-y-3">
              <Card className="glass-card liquid-hover">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4>ASL Professionals Network</h4>
                      <p className="text-sm text-muted-foreground">1,247 members</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Connect with ASL interpreters, educators, and advocates
                      </p>
                    </div>
                    <Button size="sm">Join</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4>Accessibility Tech Leaders</h4>
                      <p className="text-sm text-muted-foreground">892 members</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Discussing the latest in accessibility technology
                      </p>
                    </div>
                    <Button size="sm" variant="outline">Requested</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4>Deaf Community Advocates</h4>
                      <p className="text-sm text-muted-foreground">2,156 members</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Advocating for deaf rights and accessibility
                      </p>
                    </div>
                    <Button size="sm">Join</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}