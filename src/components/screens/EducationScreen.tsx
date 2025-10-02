import React, { useState } from 'react';
import { Plus, Play, Star, Trophy, BookOpen, Target, TrendingUp } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { ScrollArea } from '../ui/scroll-area';

interface WordItem {
  id: string;
  word: string;
  category: string;
  accuracy: number;
  streak: number;
  lastPracticed: string;
}

interface Course {
  id: string;
  title: string;
  language: string;
  level: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
}

const mockPersonalLibrary: WordItem[] = [
  { id: '1', word: 'Hello', category: 'Greetings', accuracy: 95, streak: 12, lastPracticed: '2 days ago' },
  { id: '2', word: 'Thank you', category: 'Courtesy', accuracy: 88, streak: 8, lastPracticed: '1 day ago' },
  { id: '3', word: 'Meeting', category: 'Business', accuracy: 76, streak: 5, lastPracticed: '3 days ago' },
  { id: '4', word: 'Computer', category: 'Technology', accuracy: 82, streak: 7, lastPracticed: '1 day ago' },
];

const mockCourses: Course[] = [
  { id: '1', title: 'ASL Fundamentals', language: 'ASL', level: 'Beginner', progress: 75, totalLessons: 20, completedLessons: 15 },
  { id: '2', title: 'Business Signs', language: 'ASL', level: 'Intermediate', progress: 45, totalLessons: 16, completedLessons: 7 },
  { id: '3', title: 'Medical Terminology', language: 'ASL', level: 'Advanced', progress: 20, totalLessons: 25, completedLessons: 5 },
];

interface EducationScreenProps {
  onNavigate?: (screen: any) => void;
}

export function EducationScreen({ onNavigate }: EducationScreenProps) {
  const [activeTab, setActiveTab] = useState('library');
  const [showAddWord, setShowAddWord] = useState(false);

  return (
    <div className="h-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
        <TabsList className="grid w-full grid-cols-4 mx-4 mt-4 glass-card p-1">
          <TabsTrigger 
            value="library" 
            className="relative overflow-hidden transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-0.5 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-950/50 dark:hover:to-indigo-950/50 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#183543] data-[state=active]:to-[#2a4a5a] data-[state=active]:text-white data-[state=active]:shadow-xl"
          >
            <span className="relative z-10">Library</span>
          </TabsTrigger>
          <TabsTrigger 
            value="courses" 
            className="relative overflow-hidden transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg hover:shadow-green-500/20 hover:-translate-y-0.5 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 dark:hover:from-green-950/50 dark:hover:to-emerald-950/50 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#183543] data-[state=active]:to-[#2a4a5a] data-[state=active]:text-white data-[state=active]:shadow-xl"
          >
            <span className="relative z-10">Courses</span>
          </TabsTrigger>
          <TabsTrigger 
            value="practice" 
            className="relative overflow-hidden transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 hover:-translate-y-0.5 hover:bg-gradient-to-r hover:from-purple-50 hover:to-violet-50 dark:hover:from-purple-950/50 dark:hover:to-violet-950/50 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#183543] data-[state=active]:to-[#2a4a5a] data-[state=active]:text-white data-[state=active]:shadow-xl"
          >
            <span className="relative z-10">Practice</span>
          </TabsTrigger>
          <TabsTrigger 
            value="leaderboard" 
            className="relative overflow-hidden transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg hover:shadow-orange-500/20 hover:-translate-y-0.5 hover:bg-gradient-to-r hover:from-orange-50 hover:to-amber-50 dark:hover:from-orange-950/50 dark:hover:to-amber-950/50 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#183543] data-[state=active]:to-[#2a4a5a] data-[state=active]:text-white data-[state=active]:shadow-xl"
          >
            <span className="relative z-10">Stats</span>
          </TabsTrigger>
        </TabsList>

        {/* Personal Library Tab */}
        <TabsContent value="library" className="flex-1 px-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2>Personal Library</h2>
              <p className="text-sm text-muted-foreground">{mockPersonalLibrary.length} words learned</p>
            </div>
            <Button onClick={() => setShowAddWord(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Word
            </Button>
          </div>

          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="space-y-3">
              {mockPersonalLibrary.map((item) => (
                <Card key={item.id} className="glass-card liquid-hover">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Play className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <h4>{item.word}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="secondary" className="text-xs">{item.category}</Badge>
                              <span className="text-xs text-muted-foreground">
                                Last practiced {item.lastPracticed}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="flex items-center gap-1">
                          <Target className="h-3 w-3 text-green-500" />
                          <span className="text-sm">{item.accuracy}%</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-3 w-3 text-orange-500" />
                          <span className="text-sm">{item.streak} streak</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        {/* Courses Tab */}
        <TabsContent value="courses" className="flex-1 px-4">
          <div className="mb-4">
            <h2>Courses</h2>
            <p className="text-sm text-muted-foreground">Structured learning paths</p>
          </div>

          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="space-y-4">
              {mockCourses.map((course) => (
                <Card 
                  key={course.id} 
                  className="glass-card liquid-hover cursor-pointer"
                  onClick={() => onNavigate?.('course-detail')}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4>{course.title}</h4>
                        <p className="text-sm text-muted-foreground">{course.language} • {course.level}</p>
                      </div>
                      <Badge variant={course.level === 'Beginner' ? 'default' : course.level === 'Intermediate' ? 'secondary' : 'destructive'}>
                        {course.level}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                      <Button 
                        className="w-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigate?.('course-detail');
                        }}
                      >
                        {course.progress > 0 ? 'Continue' : 'Start'} Course
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Card className="glass-card border-dashed border-2 hover:border-solid cursor-pointer liquid-hover">
                <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                  <Plus className="h-8 w-8 text-muted-foreground mb-2" />
                  <h4>Explore More Courses</h4>
                  <p className="text-sm text-muted-foreground">Discover new learning paths</p>
                </CardContent>
              </Card>
            </div>
          </ScrollArea>
        </TabsContent>

        {/* Practice Tab */}
        <TabsContent value="practice" className="flex-1 px-4">
          <div className="mb-4">
            <h2>Practice Session</h2>
            <p className="text-sm text-muted-foreground">Improve your skills with guided practice</p>
          </div>

          <div className="space-y-4">
            <Card className="glass-card liquid-hover">
              <CardHeader>
                <h4>Quick Practice</h4>
                <p className="text-sm text-muted-foreground">Practice 5 random words from your library</p>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  <Play className="h-4 w-4 mr-2" />
                  Start Quick Session
                </Button>
              </CardContent>
            </Card>

            <Card className="glass-card liquid-hover">
              <CardHeader>
                <h4>Focus Areas</h4>
                <p className="text-sm text-muted-foreground">Practice words that need improvement</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Target className="h-4 w-4 mr-2" />
                    Low Accuracy Words (3 words)
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Break Streak Recovery (2 words)
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card liquid-hover">
              <CardHeader>
                <h4>Category Practice</h4>
                <p className="text-sm text-muted-foreground">Focus on specific categories</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline">Greetings</Button>
                  <Button variant="outline">Business</Button>
                  <Button variant="outline">Technology</Button>
                  <Button variant="outline">Courtesy</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Leaderboard/Stats Tab */}
        <TabsContent value="leaderboard" className="flex-1 px-4">
          <div className="mb-4">
            <h2>Your Stats</h2>
            <p className="text-sm text-muted-foreground">Track your progress and achievements</p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Card className="glass-card liquid-hover">
                <CardContent className="p-4 text-center">
                  <Trophy className="h-6 w-6 mx-auto mb-2 text-yellow-500" />
                  <p className="text-2xl">127</p>
                  <p className="text-sm text-muted-foreground">Total Score</p>
                </CardContent>
              </Card>
              <Card className="glass-card liquid-hover">
                <CardContent className="p-4 text-center">
                  <TrendingUp className="h-6 w-6 mx-auto mb-2 text-green-500" />
                  <p className="text-2xl">12</p>
                  <p className="text-sm text-muted-foreground">Day Streak</p>
                </CardContent>
              </Card>
            </div>

            <Card className="glass-card liquid-hover">
              <CardHeader>
                <h4>Recent Achievements</h4>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Star className="h-4 w-4 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">Perfect Week</p>
                    <p className="text-xs text-muted-foreground">Completed 7 days in a row</p>
                  </div>
                  <span className="text-xs text-muted-foreground">2 days ago</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <BookOpen className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">Course Master</p>
                    <p className="text-xs text-muted-foreground">Completed ASL Fundamentals</p>
                  </div>
                  <span className="text-xs text-muted-foreground">1 week ago</span>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card liquid-hover">
              <CardHeader>
                <h4>Weekly Goal</h4>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Practice Sessions</span>
                    <span>4/5 complete</span>
                  </div>
                  <Progress value={80} />
                  <p className="text-xs text-muted-foreground">1 more session to reach your weekly goal!</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Add Word Modal */}
      {showAddWord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <h3>Add New Word</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Word or Phrase</label>
                <input 
                  type="text" 
                  className="w-full mt-1 px-3 py-2 border rounded-lg"
                  placeholder="Enter word or phrase"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Category</label>
                <select className="w-full mt-1 px-3 py-2 border rounded-lg">
                  <option>Select category</option>
                  <option>Greetings</option>
                  <option>Business</option>
                  <option>Technology</option>
                  <option>Courtesy</option>
                </select>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1">
                  Record Sign
                </Button>
                <Button variant="outline" className="flex-1">
                  Upload Video
                </Button>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setShowAddWord(false)}
                >
                  Cancel
                </Button>
                <Button className="flex-1">
                  Save Word
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}