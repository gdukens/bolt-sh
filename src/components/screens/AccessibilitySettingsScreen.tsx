import React, { useState } from 'react';
import { ArrowLeft, Volume2, Eye, Type, Captions, Hand, Zap } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Switch } from '../ui/switch';
import { Slider } from '../ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { motion } from 'motion/react';

interface AccessibilitySettingsScreenProps {
  onBack: () => void;
}

export function AccessibilitySettingsScreen({ onBack }: AccessibilitySettingsScreenProps) {
  const [captionsEnabled, setCaptionsEnabled] = useState(true);
  const [audioDescriptions, setAudioDescriptions] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [fontSizeLevel, setFontSizeLevel] = useState([100]);
  const [voiceSpeed, setVoiceSpeed] = useState([100]);
  const [hapticFeedback, setHapticFeedback] = useState(true);

  const accessibilityFeatures = [
    {
      title: 'Visual Accessibility',
      icon: Eye,
      items: [
        {
          id: 'captions',
          label: 'Auto Captions',
          description: 'Show captions for all video content',
          value: captionsEnabled,
          onChange: setCaptionsEnabled,
          type: 'switch' as const,
        },
        {
          id: 'high-contrast',
          label: 'High Contrast Mode',
          description: 'Increase contrast for better visibility',
          value: highContrast,
          onChange: setHighContrast,
          type: 'switch' as const,
        },
        {
          id: 'font-size',
          label: 'Font Size',
          description: 'Adjust text size for better readability',
          value: fontSizeLevel,
          onChange: setFontSizeLevel,
          type: 'slider' as const,
          min: 75,
          max: 150,
          unit: '%',
        },
      ],
    },
    {
      title: 'Audio & Speech',
      icon: Volume2,
      items: [
        {
          id: 'audio-descriptions',
          label: 'Audio Descriptions',
          description: 'Detailed audio descriptions for visual content',
          value: audioDescriptions,
          onChange: setAudioDescriptions,
          type: 'switch' as const,
        },
        {
          id: 'voice-speed',
          label: 'Text-to-Speech Speed',
          description: 'Adjust playback speed for voice output',
          value: voiceSpeed,
          onChange: setVoiceSpeed,
          type: 'slider' as const,
          min: 50,
          max: 200,
          unit: '%',
        },
      ],
    },
    {
      title: 'Motor & Interaction',
      icon: Hand,
      items: [
        {
          id: 'reduced-motion',
          label: 'Reduce Motion',
          description: 'Minimize animations and transitions',
          value: reducedMotion,
          onChange: setReducedMotion,
          type: 'switch' as const,
        },
        {
          id: 'haptic-feedback',
          label: 'Haptic Feedback',
          description: 'Vibration feedback for interactions',
          value: hapticFeedback,
          onChange: setHapticFeedback,
          type: 'switch' as const,
        },
      ],
    },
  ];

  return (
    <div className="h-full bg-background flex flex-col overflow-hidden">
      {/* Header */}
      <div className="glass-header flex items-center gap-3 p-4 border-b">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="font-medium">Accessibility Settings</h2>
          <p className="text-sm text-muted-foreground">Customize your experience</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* ASL Quick Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="glass-card liquid-border border-blue-200 bg-blue-50/50">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#183543] to-[#2a4a5a] rounded-xl flex items-center justify-center">
                  <span className="text-white text-lg">🤟</span>
                </div>
                <div>
                  <h3 className="font-medium">ASL Features</h3>
                  <p className="text-sm text-muted-foreground">American Sign Language preferences</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" size="sm" className="h-auto p-3 flex flex-col gap-1">
                  <Captions className="h-4 w-4" />
                  <span className="text-xs">Auto ASL</span>
                </Button>
                <Button variant="outline" size="sm" className="h-auto p-3 flex flex-col gap-1">
                  <Hand className="h-4 w-4" />
                  <span className="text-xs">Avatar Style</span>
                </Button>
                <Button variant="outline" size="sm" className="h-auto p-3 flex flex-col gap-1">
                  <Type className="h-4 w-4" />
                  <span className="text-xs">Sign Speed</span>
                </Button>
                <Button variant="outline" size="sm" className="h-auto p-3 flex flex-col gap-1">
                  <Zap className="h-4 w-4" />
                  <span className="text-xs">Quick Signs</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Accessibility Features */}
        {accessibilityFeatures.map((section, sectionIndex) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: (sectionIndex + 1) * 0.1 }}
          >
            <Card className="glass-card liquid-border">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#183543] to-[#2a4a5a] rounded-xl flex items-center justify-center">
                    <section.icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-medium">{section.title}</h3>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {section.items.map((item) => (
                  <div key={item.id} className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.label}</h4>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                      {item.type === 'switch' && (
                        <Switch
                          checked={item.value as boolean}
                          onCheckedChange={item.onChange as (value: boolean) => void}
                        />
                      )}
                    </div>
                    {item.type === 'slider' && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{item.min}{item.unit}</span>
                          <span className="font-medium">{(item.value as number[])[0]}{item.unit}</span>
                          <span>{item.max}{item.unit}</span>
                        </div>
                        <Slider
                          value={item.value as number[]}
                          onValueChange={item.onChange as (value: number[]) => void}
                          min={item.min}
                          max={item.max}
                          step={5}
                          className="w-full"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {/* Test Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="glass-card liquid-border">
            <CardHeader>
              <h3 className="font-medium">Test Your Settings</h3>
              <p className="text-sm text-muted-foreground">Try out your accessibility preferences</p>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-[#183543] hover:bg-[#2a4a5a]">
                Test Text-to-Speech
              </Button>
              <Button variant="outline" className="w-full">
                Preview Avatar Signing
              </Button>
              <Button variant="outline" className="w-full">
                Test Captions Display
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}