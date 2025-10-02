import React, { useState } from 'react';
import { ArrowLeft, Globe, Hand, Volume2, Settings, ChevronRight, Check, Users, Zap } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';
import { Slider } from '../ui/slider';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { motion } from 'motion/react';

interface LanguageSettingsScreenProps {
  onBack: () => void;
  signLanguage: string;
  onSignLanguageChange: (value: string) => void;
  spokenLanguage: string;
  onSpokenLanguageChange: (value: string) => void;
}

export function LanguageSettingsScreen({ 
  onBack, 
  signLanguage, 
  onSignLanguageChange, 
  spokenLanguage, 
  onSpokenLanguageChange 
}: LanguageSettingsScreenProps) {
  const [signSpeed, setSignSpeed] = useState([75]);
  const [voiceSpeed, setVoiceSpeed] = useState([85]);
  const [autoDetectLanguage, setAutoDetectLanguage] = useState(true);
  const [showCaptions, setShowCaptions] = useState(true);
  const [signComplexity, setSignComplexity] = useState('intermediate');
  const [regionalDialect, setRegionalDialect] = useState('standard');

  const signLanguages = [
    { code: 'ASL', name: 'American Sign Language', region: 'North America', users: '500K+' },
    { code: 'BSL', name: 'British Sign Language', region: 'United Kingdom', users: '150K+' },
    { code: 'LSF', name: 'French Sign Language', region: 'France', users: '100K+' },
    { code: 'DGS', name: 'German Sign Language', region: 'Germany', users: '80K+' },
    { code: 'JSL', name: 'Japanese Sign Language', region: 'Japan', users: '320K+' },
    { code: 'CSL', name: 'Chinese Sign Language', region: 'China', users: '2M+' },
    { code: 'ISL', name: 'Israeli Sign Language', region: 'Israel', users: '10K+' },
    { code: 'Auslan', name: 'Australian Sign Language', region: 'Australia', users: '16K+' }
  ];

  const spokenLanguages = [
    { code: 'en', name: 'English', native: 'English', region: 'Global' },
    { code: 'es', name: 'Spanish', native: 'Español', region: 'Spain, Latin America' },
    { code: 'fr', name: 'French', native: 'Français', region: 'France, Canada' },
    { code: 'de', name: 'German', native: 'Deutsch', region: 'Germany, Austria' },
    { code: 'it', name: 'Italian', native: 'Italiano', region: 'Italy' },
    { code: 'pt', name: 'Portuguese', native: 'Português', region: 'Brazil, Portugal' },
    { code: 'ja', name: 'Japanese', native: '日本語', region: 'Japan' },
    { code: 'ko', name: 'Korean', native: '한국어', region: 'South Korea' },
    { code: 'zh', name: 'Chinese', native: '中文', region: 'China, Taiwan' },
    { code: 'ar', name: 'Arabic', native: 'العربية', region: 'Middle East, North Africa' }
  ];

  const dialects = {
    'en': ['Standard American', 'British', 'Australian', 'Canadian', 'Indian'],
    'es': ['Castilian', 'Mexican', 'Argentinian', 'Colombian', 'Chilean'],
    'fr': ['Metropolitan', 'Canadian', 'Belgian', 'Swiss'],
    'de': ['Standard German', 'Austrian', 'Swiss German'],
    'pt': ['Brazilian', 'European', 'African'],
    'zh': ['Mandarin', 'Cantonese', 'Taiwanese'],
    'ar': ['Modern Standard', 'Egyptian', 'Levantine', 'Maghrebi']
  };

  return (
    <div className="h-full bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b glass-header">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-arkan-primary" />
          <h1>Language & Communication</h1>
        </div>
      </div>

      <div className="p-4 space-y-6 max-h-[calc(100vh-80px)] overflow-y-auto">
        {/* Quick Settings */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-arkan-primary" />
              Quick Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4>Auto-detect Language</h4>
                <p className="text-sm text-muted-foreground">
                  Automatically detect spoken and sign language
                </p>
              </div>
              <Switch 
                checked={autoDetectLanguage} 
                onCheckedChange={setAutoDetectLanguage} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4>Show Captions</h4>
                <p className="text-sm text-muted-foreground">
                  Display text captions for all audio content
                </p>
              </div>
              <Switch 
                checked={showCaptions} 
                onCheckedChange={setShowCaptions} 
              />
            </div>
          </CardContent>
        </Card>

        {/* Sign Language Settings */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Hand className="h-5 w-5 text-arkan-primary" />
              Sign Language
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Current Selection */}
            <div className="p-4 bg-arkan-primary/10 rounded-lg border border-arkan-primary/20">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-arkan-primary">Current Selection</h4>
                <Badge variant="secondary">{signLanguage}</Badge>
              </div>
              {signLanguages.find(lang => lang.code === signLanguage) && (
                <p className="text-sm text-muted-foreground">
                  {signLanguages.find(lang => lang.code === signLanguage)?.name} • 
                  {signLanguages.find(lang => lang.code === signLanguage)?.region} • 
                  {signLanguages.find(lang => lang.code === signLanguage)?.users} users
                </p>
              )}
            </div>

            {/* Language Selection */}
            <div className="space-y-3">
              <h4>Available Sign Languages</h4>
              <div className="grid gap-2 max-h-64 overflow-y-auto">
                {signLanguages.map((lang) => (
                  <motion.div
                    key={lang.code}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      signLanguage === lang.code 
                        ? 'border-arkan-primary bg-arkan-primary/10' 
                        : 'border-border hover:border-arkan-primary/50 hover:bg-accent/50'
                    }`}
                    onClick={() => onSignLanguageChange(lang.code)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{lang.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {lang.code}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{lang.region}</span>
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            <span>{lang.users}</span>
                          </div>
                        </div>
                      </div>
                      {signLanguage === lang.code && (
                        <Check className="h-5 w-5 text-arkan-primary" />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Sign Language Preferences */}
            <div className="space-y-4">
              <h4>Sign Language Preferences</h4>
              
              <div>
                <label className="block text-sm mb-2">
                  Signing Speed: {signSpeed[0]}%
                </label>
                <Slider
                  value={signSpeed}
                  onValueChange={setSignSpeed}
                  max={150}
                  min={25}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Slow</span>
                  <span>Normal</span>
                  <span>Fast</span>
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2">Sign Complexity</label>
                <Select value={signComplexity} onValueChange={setSignComplexity}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner - Simple signs and fingerspelling</SelectItem>
                    <SelectItem value="intermediate">Intermediate - Standard vocabulary</SelectItem>
                    <SelectItem value="advanced">Advanced - Complex expressions and idioms</SelectItem>
                    <SelectItem value="native">Native - Full linguistic complexity</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Spoken Language Settings */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Volume2 className="h-5 w-5 text-arkan-primary" />
              Spoken Language
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Current Selection */}
            <div className="p-4 bg-arkan-primary/10 rounded-lg border border-arkan-primary/20">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-arkan-primary">Current Selection</h4>
                <Badge variant="secondary">{spokenLanguage}</Badge>
              </div>
              {spokenLanguages.find(lang => lang.code === spokenLanguage) && (
                <p className="text-sm text-muted-foreground">
                  {spokenLanguages.find(lang => lang.code === spokenLanguage)?.name} • 
                  {spokenLanguages.find(lang => lang.code === spokenLanguage)?.region}
                </p>
              )}
            </div>

            {/* Language Selection */}
            <div className="space-y-3">
              <h4>Available Languages</h4>
              <div className="grid gap-2 max-h-64 overflow-y-auto">
                {spokenLanguages.map((lang) => (
                  <motion.div
                    key={lang.code}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      spokenLanguage === lang.code 
                        ? 'border-arkan-primary bg-arkan-primary/10' 
                        : 'border-border hover:border-arkan-primary/50 hover:bg-accent/50'
                    }`}
                    onClick={() => onSpokenLanguageChange(lang.code)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-medium">{lang.name}</span>
                          <span className="text-sm text-muted-foreground">{lang.native}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{lang.region}</p>
                      </div>
                      {spokenLanguage === lang.code && (
                        <Check className="h-5 w-5 text-arkan-primary" />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Regional Dialect */}
            <div>
              <label className="block text-sm mb-2">Regional Dialect</label>
              <Select value={regionalDialect} onValueChange={setRegionalDialect}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {dialects[spokenLanguage as keyof typeof dialects]?.map((dialect) => (
                    <SelectItem key={dialect} value={dialect.toLowerCase().replace(' ', '-')}>
                      {dialect}
                    </SelectItem>
                  )) || <SelectItem value="standard">Standard</SelectItem>}
                </SelectContent>
              </Select>
            </div>

            {/* Voice Settings */}
            <div className="space-y-4">
              <h4>Voice & Speech Settings</h4>
              
              <div>
                <label className="block text-sm mb-2">
                  Voice Speed: {voiceSpeed[0]}%
                </label>
                <Slider
                  value={voiceSpeed}
                  onValueChange={setVoiceSpeed}
                  max={200}
                  min={25}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Very Slow</span>
                  <span>Normal</span>
                  <span>Very Fast</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Advanced Settings */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-arkan-primary" />
              Advanced Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted/30 rounded-lg">
              <h4 className="mb-2">Translation Preferences</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Customize how content is translated between sign and spoken language
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm">Real-time translation</span>
                <Switch defaultChecked />
              </div>
            </div>

            <div className="p-4 bg-muted/30 rounded-lg">
              <h4 className="mb-2">Learning Mode</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Show additional context and explanations for language learning
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm">Enable learning mode</span>
                <Switch />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Changes */}
        <div className="pb-6">
          <Button className="w-full" size="lg">
            Save Language Preferences
          </Button>
        </div>
      </div>
    </div>
  );
}