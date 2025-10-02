import React, { useState } from 'react';
import { ArrowLeft, Search, Filter, Users, BookOpen, Video, MessageCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { motion } from 'motion/react';

interface SearchScreenProps {
  onBack: () => void;
  onNavigate: (screen: any) => void;
}

const searchResults = [
  {
    id: '1',
    type: 'person',
    name: 'Dr. Sarah Martinez',
    title: 'ASL Interpreter & Educator',
    avatar: 'SM',
    mutual: 12,
    aslFluent: true,
  },
  {
    id: '2',
    type: 'course',
    name: 'Advanced ASL Grammar',
    instructor: 'Prof. Michael Chen',
    students: 1250,
    rating: 4.8,
    hasAvatars: true,
  },
  {
    id: '3',
    type: 'post',
    author: 'Jamie Rivera',
    content: 'New research on multimodal communication shows...',
    timestamp: '2h ago',
    likes: 89,
    hasASL: true,
  },
  {
    id: '4',
    type: 'person',
    name: 'Alex Thompson',
    title: 'Deaf Community Advocate',
    avatar: 'AT',
    mutual: 8,
    aslFluent: true,
  },
];

const searchCategories = [
  { id: 'all', label: 'All', icon: Search },
  { id: 'people', label: 'People', icon: Users },
  { id: 'courses', label: 'Courses', icon: BookOpen },
  { id: 'videos', label: 'ASL Videos', icon: Video },
  { id: 'posts', label: 'Posts', icon: MessageCircle },
];

export function SearchScreen({ onBack, onNavigate }: SearchScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const handleResultClick = (result: any) => {
    if (result.type === 'person') {
      onNavigate('user-profile');
    } else if (result.type === 'course') {
      onNavigate('course-detail');
    } else if (result.type === 'post') {
      onNavigate('post-detail');
    }
  };

  return (
    <div className="h-full bg-background flex flex-col overflow-hidden">
      {/* Header */}
      <div className="glass-header flex items-center gap-3 p-4 border-b">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search people, courses, ASL content..."
            className="pl-10"
            autoFocus
          />
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {/* Search Categories */}
      <div className="p-4 border-b">
        <div className="flex gap-2 overflow-x-auto">
          {searchCategories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category.id)}
              className={`shrink-0 ${
                activeCategory === category.id 
                  ? 'bg-[#183543] hover:bg-[#2a4a5a] text-white' 
                  : ''
              }`}
            >
              <category.icon className="h-3 w-3 mr-2" />
              {category.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Search Filters */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="border-b bg-muted/30 p-4"
        >
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="cursor-pointer">ASL Fluent</Badge>
            <Badge variant="outline" className="cursor-pointer">Verified</Badge>
            <Badge variant="outline" className="cursor-pointer">Has Avatars</Badge>
            <Badge variant="outline" className="cursor-pointer">Recent</Badge>
            <Badge variant="outline" className="cursor-pointer">Popular</Badge>
          </div>
        </motion.div>
      )}

      {/* Search Results */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {searchQuery ? (
          <>
            <div className="text-sm text-muted-foreground mb-4">
              Found {searchResults.length} results for "{searchQuery}"
            </div>
            {searchResults.map((result, index) => (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  className="glass-card liquid-border cursor-pointer liquid-hover"
                  onClick={() => handleResultClick(result)}
                >
                  <CardContent className="p-4">
                    {result.type === 'person' && (
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#183543] to-[#2a4a5a] rounded-2xl flex items-center justify-center">
                          <span className="text-white font-medium text-sm">{result.avatar}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{result.name}</h3>
                            {result.aslFluent && <span className="text-sm">🤟</span>}
                          </div>
                          <p className="text-sm text-muted-foreground">{result.title}</p>
                          <p className="text-xs text-muted-foreground">{result.mutual} mutual connections</p>
                        </div>
                        <Button variant="outline" size="sm">Connect</Button>
                      </div>
                    )}
                    
                    {result.type === 'course' && (
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{result.name}</h3>
                              {result.hasAvatars && <span className="text-sm">🤟</span>}
                            </div>
                            <p className="text-sm text-muted-foreground">by {result.instructor}</p>
                          </div>
                          <Badge variant="secondary">Course</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>⭐ {result.rating}</span>
                          <span>{result.students} students</span>
                        </div>
                      </div>
                    )}
                    
                    {result.type === 'post' && (
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{result.author}</h3>
                              {result.hasASL && <span className="text-sm">🤟</span>}
                            </div>
                            <p className="text-sm text-muted-foreground">{result.timestamp}</p>
                          </div>
                          <Badge variant="secondary">Post</Badge>
                        </div>
                        <p className="text-sm">{result.content}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>👍 {result.likes}</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-br from-[#183543] to-[#2a4a5a] rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-medium mb-2">Search Arkan Infinity</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Find people, courses, ASL content, and more
            </p>
            <div className="space-y-2 text-left max-w-sm mx-auto">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>🤟</span>
                <span>Try: "ASL grammar" or "deaf community"</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>👥</span>
                <span>Search for verified interpreters</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>📚</span>
                <span>Discover new courses with avatars</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}