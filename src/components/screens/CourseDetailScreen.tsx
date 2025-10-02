import React, { useState } from 'react';
import { ArrowLeft, Play, BookOpen, Users, Clock, Star, Download, Share2, Bookmark } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { motion } from 'motion/react';

interface CourseDetailScreenProps {
  onBack: () => void;
}

const courseData = {
  title: 'Advanced ASL Grammar & Syntax',
  instructor: 'Dr. Sarah Martinez',
  rating: 4.8,
  students: 1247,
  duration: '8 weeks',
  level: 'Advanced',
  progress: 35,
  description: 'Master advanced American Sign Language grammar structures, including classifiers, spatial referencing, and complex sentence constructions.',
  avatar: 'https://sample-videos.com/zip/10/mp4/480/mp4-15.mp4',
};

const lessons = [
  {
    id: '1',
    title: 'Introduction to Advanced Grammar',
    duration: '12 min',
    completed: true,
    hasAvatar: true,
    type: 'video',
  },
  {
    id: '2',
    title: 'Classifier Systems',
    duration: '18 min',
    completed: true,
    hasAvatar: true,
    type: 'video',
  },
  {
    id: '3',
    title: 'Spatial Grammar & Referencing',
    duration: '22 min',
    completed: false,
    hasAvatar: true,
    type: 'video',
    current: true,
  },
  {
    id: '4',
    title: 'Complex Sentence Structures',
    duration: '15 min',
    completed: false,
    hasAvatar: true,
    type: 'video',
  },
  {
    id: '5',
    title: 'Practice Quiz: Grammar Basics',
    duration: '10 min',
    completed: false,
    hasAvatar: false,
    type: 'quiz',
  },
];

const reviews = [
  {
    id: '1',
    author: 'Alex Thompson',
    rating: 5,
    comment: 'Excellent course! The avatar demonstrations make complex grammar concepts much clearer.',
    date: '2 days ago',
    helpful: 12,
  },
  {
    id: '2',
    author: 'Jamie Rivera',
    rating: 5,
    comment: 'Dr. Martinez explains everything so well. The spatial referencing module was particularly helpful.',
    date: '1 week ago',
    helpful: 8,
  },
];

export function CourseDetailScreen({ onBack }: CourseDetailScreenProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <div className="h-full bg-background flex flex-col overflow-hidden">
      {/* Header */}
      <div className="glass-header flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="font-medium">Course Details</h2>
            <p className="text-sm text-muted-foreground">ASL Learning</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setBookmarked(!bookmarked)}
          >
            <Bookmark className={`h-4 w-4 ${bookmarked ? 'fill-current text-yellow-500' : ''}`} />
          </Button>
          <Button variant="ghost" size="sm">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Course Header */}
        <div className="p-4 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="glass-card liquid-border">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#183543] to-[#2a4a5a] rounded-2xl flex items-center justify-center shrink-0">
                    <BookOpen className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">{courseData.level}</Badge>
                      <Badge variant="outline" className="text-blue-600 border-blue-200">
                        🤟 ASL Avatars
                      </Badge>
                    </div>
                    <h1 className="font-bold text-lg mb-2">{courseData.title}</h1>
                    <p className="text-sm text-muted-foreground mb-3">
                      by {courseData.instructor}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-current text-yellow-500" />
                        <span>{courseData.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{courseData.students}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{courseData.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Progress */}
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Course Progress</span>
                    <span className="text-sm text-muted-foreground">{courseData.progress}%</span>
                  </div>
                  <Progress value={courseData.progress} className="h-2" />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-6">
                  <Button className="flex-1 bg-[#183543] hover:bg-[#2a4a5a]">
                    <Play className="h-4 w-4 mr-2" />
                    Continue Learning
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
          <div className="px-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="lessons">Lessons</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="p-4 space-y-4 mt-4">
            <Card className="glass-card liquid-border">
              <CardHeader>
                <h3 className="font-medium">About This Course</h3>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {courseData.description}
                </p>
                <div className="space-y-3">
                  <h4 className="font-medium text-sm">What you'll learn:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>Advanced classifier systems and their applications</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>Spatial grammar and 3D referencing techniques</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>Complex sentence structures and syntax rules</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>Professional ASL communication strategies</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card liquid-border">
              <CardHeader>
                <h3 className="font-medium">Instructor</h3>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#183543] to-[#2a4a5a] rounded-2xl flex items-center justify-center">
                    <span className="text-white font-medium">SM</span>
                  </div>
                  <div>
                    <h4 className="font-medium">{courseData.instructor}</h4>
                    <p className="text-sm text-muted-foreground">Certified ASL Instructor</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">15+ years experience</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">500+ students</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="lessons" className="p-4 space-y-3 mt-4">
            {lessons.map((lesson, index) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`glass-card liquid-border cursor-pointer liquid-hover ${
                  lesson.current ? 'border-blue-200 bg-blue-50/50' : ''
                }`}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        lesson.completed 
                          ? 'bg-green-100 text-green-600' 
                          : lesson.current
                            ? 'bg-blue-100 text-blue-600'
                            : 'bg-gray-100 text-gray-500'
                      }`}>
                        {lesson.completed ? (
                          <span className="text-lg">✓</span>
                        ) : lesson.type === 'quiz' ? (
                          <span className="text-lg">📝</span>
                        ) : (
                          <Play className="h-5 w-5" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-sm">{lesson.title}</h4>
                          {lesson.hasAvatar && (
                            <span className="text-xs">🤟</span>
                          )}
                          {lesson.current && (
                            <Badge variant="secondary" className="text-xs">Current</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span>{lesson.duration}</span>
                          <span>•</span>
                          <span className="capitalize">{lesson.type}</span>
                        </div>
                      </div>
                      {lesson.completed && (
                        <Badge variant="outline" className="text-green-600 border-green-200">
                          Completed
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </TabsContent>

          <TabsContent value="reviews" className="p-4 space-y-4 mt-4">
            <Card className="glass-card liquid-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Student Reviews</h3>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 fill-current text-yellow-500" />
                    <span className="font-medium">{courseData.rating}</span>
                    <span className="text-sm text-muted-foreground">({reviews.length} reviews)</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {reviews.map((review, index) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 border border-border rounded-xl"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#183543] to-[#2a4a5a] rounded-xl flex items-center justify-center">
                        <span className="text-white text-sm">{review.author[0]}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-sm">{review.author}</h4>
                          <div className="flex">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="h-3 w-3 fill-current text-yellow-500" />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {review.comment}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span>{review.date}</span>
                          <span>•</span>
                          <span>👍 {review.helpful} helpful</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}