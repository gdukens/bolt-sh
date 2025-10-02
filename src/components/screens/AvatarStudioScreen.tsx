import React, { useState } from 'react';
import { ArrowLeft, Upload, Play, Save, Settings, Download, Eye } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Input } from '../ui/input';
import { Slider } from '../ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';

interface AvatarStudioScreenProps {
  onBack: () => void;
}

export function AvatarStudioScreen({ onBack }: AvatarStudioScreenProps) {
  const [activeStep, setActiveStep] = useState(1);
  const [testText, setTestText] = useState('Hello, nice to meet you!');
  const [avatarSettings, setAvatarSettings] = useState({
    speed: [100],
    skinTone: 3,
    hairStyle: 1,
    clothing: 2,
    signingStyle: 'formal',
  });

  const steps = [
    { id: 1, title: 'Upload Photo', completed: true },
    { id: 2, title: 'Generate Avatar', completed: true },
    { id: 3, title: 'Customize', completed: false },
    { id: 4, title: 'Test & Save', completed: false },
  ];

  const renderStepIndicator = () => (
    <div className="flex items-center justify-between mb-6 px-4">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            step.completed 
              ? 'bg-[#0A66C2] text-white' 
              : activeStep === step.id 
                ? 'bg-[#0A66C2] text-white' 
                : 'bg-gray-200 text-gray-600'
          }`}>
            {step.id}
          </div>
          <span className={`ml-2 text-sm ${activeStep === step.id ? 'text-[#0A66C2] font-medium' : 'text-gray-600'}`}>
            {step.title}
          </span>
          {index < steps.length - 1 && (
            <div className={`w-8 h-0.5 mx-4 ${step.completed ? 'bg-[#0A66C2]' : 'bg-gray-200'}`}></div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="h-full bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h2>Avatar Studio</h2>
            <p className="text-sm text-muted-foreground">Create and customize your avatar</p>
          </div>
        </div>
        <Badge variant="secondary">Step {activeStep}/4</Badge>
      </div>

      {renderStepIndicator()}

      <div className="flex-1 overflow-hidden">
        {activeStep === 1 && (
          <div className="p-4 space-y-6">
            <Card>
              <CardHeader>
                <h3>Upload Your Photo</h3>
                <p className="text-sm text-muted-foreground">
                  Upload a clear photo of yourself for avatar generation
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-sm text-gray-600 mb-2">Drag and drop your photo here</p>
                  <Button variant="outline">Choose File</Button>
                </div>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>• Use a clear, front-facing photo</p>
                  <p>• Good lighting improves avatar quality</p>
                  <p>• File size should be under 10MB</p>
                </div>
                <Button className="w-full" onClick={() => setActiveStep(2)}>
                  Continue to Generation
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {activeStep === 2 && (
          <div className="p-4 space-y-6">
            <Card>
              <CardHeader>
                <h3>Generate Avatar</h3>
                <p className="text-sm text-muted-foreground">
                  AI is creating your personalized avatar
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-8 text-center">
                  <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Generating your avatar...</p>
                  <p className="text-xs text-muted-foreground">This may take 30-60 seconds</p>
                </div>
                <Button className="w-full" onClick={() => setActiveStep(3)}>
                  Avatar Ready - Customize
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {activeStep === 3 && (
          <div className="h-full flex">
            {/* Preview Panel */}
            <div className="w-1/2 p-4 border-r">
              <Card className="h-full">
                <CardHeader>
                  <h3>Avatar Preview</h3>
                </CardHeader>
                <CardContent className="flex-1 flex items-center justify-center">
                  <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg aspect-square w-48 flex items-center justify-center">
                    <span className="text-6xl">👤</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Customization Panel */}
            <div className="w-1/2 p-4">
              <Tabs defaultValue="appearance" className="h-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="appearance">Appearance</TabsTrigger>
                  <TabsTrigger value="style">Style</TabsTrigger>
                  <TabsTrigger value="motion">Motion</TabsTrigger>
                </TabsList>

                <TabsContent value="appearance" className="space-y-4 mt-4">
                  <div>
                    <label className="text-sm font-medium">Skin Tone</label>
                    <div className="flex gap-2 mt-2">
                      {[1, 2, 3, 4, 5].map((tone) => (
                        <button
                          key={tone}
                          className={`w-8 h-8 rounded-full border-2 ${
                            avatarSettings.skinTone === tone ? 'border-[#0A66C2]' : 'border-gray-300'
                          }`}
                          style={{ backgroundColor: `hsl(${30 + tone * 10}, 50%, ${70 - tone * 5}%)` }}
                          onClick={() => setAvatarSettings({...avatarSettings, skinTone: tone})}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Hair Style</label>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {['Short', 'Medium', 'Long'].map((style, index) => (
                        <Button
                          key={style}
                          variant={avatarSettings.hairStyle === index + 1 ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setAvatarSettings({...avatarSettings, hairStyle: index + 1})}
                        >
                          {style}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Clothing</label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {['Casual', 'Formal', 'Business', 'Creative'].map((style, index) => (
                        <Button
                          key={style}
                          variant={avatarSettings.clothing === index + 1 ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setAvatarSettings({...avatarSettings, clothing: index + 1})}
                        >
                          {style}
                        </Button>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="style" className="space-y-4 mt-4">
                  <div>
                    <label className="text-sm font-medium">Signing Style</label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {['Formal', 'Casual', 'Expressive', 'Minimal'].map((style) => (
                        <Button
                          key={style}
                          variant={avatarSettings.signingStyle === style.toLowerCase() ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setAvatarSettings({...avatarSettings, signingStyle: style.toLowerCase()})}
                        >
                          {style}
                        </Button>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="motion" className="space-y-4 mt-4">
                  <div>
                    <label className="text-sm font-medium">Signing Speed</label>
                    <div className="mt-2">
                      <Slider
                        value={avatarSettings.speed}
                        onValueChange={(value) => setAvatarSettings({...avatarSettings, speed: value})}
                        max={150}
                        min={50}
                        step={10}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>Slow</span>
                        <span>{avatarSettings.speed[0]}%</span>
                        <span>Fast</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-6">
                <Button className="w-full" onClick={() => setActiveStep(4)}>
                  Preview & Test
                </Button>
              </div>
            </div>
          </div>
        )}

        {activeStep === 4 && (
          <div className="p-4 space-y-6">
            <Card>
              <CardHeader>
                <h3>Test Your Avatar</h3>
                <p className="text-sm text-muted-foreground">
                  Enter text to see how your avatar signs it
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg aspect-video flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl">👤</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Avatar will sign your text here</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Test Text</label>
                  <Input
                    value={testText}
                    onChange={(e) => setTestText(e.target.value)}
                    placeholder="Enter text for avatar to sign..."
                  />
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1">
                    <Play className="h-4 w-4 mr-2" />
                    Play Avatar
                  </Button>
                  <Button variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                </div>

                <div className="flex gap-2 mt-6">
                  <Button variant="outline" className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button className="flex-1">
                    <Save className="h-4 w-4 mr-2" />
                    Save Avatar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}