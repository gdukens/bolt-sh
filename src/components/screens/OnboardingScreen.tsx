import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Check, User, Briefcase, Heart, Globe, MessageCircle, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { Progress } from '../ui/progress';
import { motion, AnimatePresence } from 'motion/react';

interface OnboardingScreenProps {
  onComplete: (data: OnboardingData) => void;
}

export interface OnboardingData {
  fullName: string;
  age: string;
  occupation: string;
  location: string;
  disabilityStatus: string[];
  assistiveTech: string[];
  spokenLanguage: string;
  signLanguage: string;
  signLanguageProficiency: string;
  interests: string[];
  communicationPreferences: string[];
}

const disabilityOptions = [
  { id: 'deaf', label: 'Deaf or Hard of Hearing', icon: '🦻' },
  { id: 'blind', label: 'Blind or Low Vision', icon: '👁️' },
  { id: 'motor', label: 'Motor/Mobility', icon: '🦽' },
  { id: 'cognitive', label: 'Cognitive/Learning', icon: '🧠' },
  { id: 'speech', label: 'Speech/Communication', icon: '💬' },
  { id: 'none', label: 'No disability', icon: '✓' },
  { id: 'prefer-not', label: 'Prefer not to say', icon: '🔒' },
];

const assistiveTechOptions = [
  { id: 'screen-reader', label: 'Screen Reader' },
  { id: 'hearing-aid', label: 'Hearing Aid' },
  { id: 'cochlear', label: 'Cochlear Implant' },
  { id: 'captions', label: 'Live Captions' },
  { id: 'voice-control', label: 'Voice Control' },
  { id: 'switch-access', label: 'Switch Access' },
  { id: 'magnifier', label: 'Screen Magnifier' },
  { id: 'none', label: 'None' },
];

const signLanguages = [
  { value: 'ASL', label: 'ASL (American Sign Language)' },
  { value: 'BSL', label: 'BSL (British Sign Language)' },
  { value: 'LSF', label: 'LSF (French Sign Language)' },
  { value: 'Auslan', label: 'Auslan (Australian Sign Language)' },
  { value: 'JSL', label: 'JSL (Japanese Sign Language)' },
  { value: 'CSL', label: 'CSL (Chinese Sign Language)' },
  { value: 'ISL', label: 'ISL (Indian Sign Language)' },
  { value: 'none', label: 'I don\'t use sign language' },
  { value: 'learning', label: 'I\'m learning sign language' },
];

const spokenLanguages = [
  'English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 
  'Korean', 'Portuguese', 'Arabic', 'Hindi', 'Russian', 'Italian'
];

const proficiencyLevels = [
  { value: 'native', label: 'Native/Fluent' },
  { value: 'advanced', label: 'Advanced' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'beginner', label: 'Beginner' },
  { value: 'learning', label: 'Just Learning' },
];

const interestOptions = [
  { id: 'accessibility', label: 'Accessibility Advocacy', icon: '♿' },
  { id: 'education', label: 'Sign Language Education', icon: '📚' },
  { id: 'tech', label: 'Assistive Technology', icon: '💻' },
  { id: 'community', label: 'Deaf Community', icon: '👥' },
  { id: 'interpretation', label: 'Interpretation Services', icon: '🤝' },
  { id: 'career', label: 'Career Development', icon: '📈' },
];

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<OnboardingData>({
    fullName: '',
    age: '',
    occupation: '',
    location: '',
    disabilityStatus: [],
    assistiveTech: [],
    spokenLanguage: 'English',
    signLanguage: '',
    signLanguageProficiency: '',
    interests: [],
    communicationPreferences: [],
  });

  const totalSteps = 6;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    // Save onboarding data
    localStorage.setItem('arkan_onboarding_data', JSON.stringify(formData));
    localStorage.setItem('arkan_onboarding_completed', 'true');
    onComplete(formData);
  };

  const updateFormData = (field: keyof OnboardingData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayValue = (field: keyof OnboardingData, value: string) => {
    const currentArray = formData[field] as string[];
    if (currentArray.includes(value)) {
      updateFormData(field, currentArray.filter(item => item !== value));
    } else {
      updateFormData(field, [...currentArray, value]);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0: return true; // Welcome
      case 1: return formData.fullName && formData.age;
      case 2: return formData.disabilityStatus.length > 0;
      case 3: return formData.spokenLanguage && formData.signLanguage;
      case 4: return true; // Interests are optional
      case 5: return true; // Review
      default: return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center space-y-6"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-[#183543] to-[#2a4a5a] rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl">Welcome to Arkan Infinity!</h1>
            <p className="text-muted-foreground text-lg max-w-md mx-auto">
              Let's personalize your experience. We'll ask a few questions to help us better serve your accessibility needs and connect you with the right community.
            </p>
            <div className="flex flex-col gap-3 max-w-sm mx-auto mt-8">
              <div className="flex items-start gap-3 text-left">
                <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  Your information is private and secure
                </p>
              </div>
              <div className="flex items-start gap-3 text-left">
                <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  You can update these preferences anytime
                </p>
              </div>
              <div className="flex items-start gap-3 text-left">
                <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  Takes only 2-3 minutes to complete
                </p>
              </div>
            </div>
          </motion.div>
        );

      case 1:
        return (
          <motion.div
            key="personal"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-[#183543]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-[#183543]" />
              </div>
              <h2 className="text-2xl">Tell us about yourself</h2>
              <p className="text-muted-foreground mt-2">Basic information to get started</p>
            </div>

            <div className="space-y-4 max-w-md mx-auto">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => updateFormData('fullName', e.target.value)}
                  className="glass"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Age *</Label>
                <Select value={formData.age} onValueChange={(value) => updateFormData('age', value)}>
                  <SelectTrigger className="glass">
                    <SelectValue placeholder="Select your age range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-18">Under 18</SelectItem>
                    <SelectItem value="18-24">18-24</SelectItem>
                    <SelectItem value="25-34">25-34</SelectItem>
                    <SelectItem value="35-44">35-44</SelectItem>
                    <SelectItem value="45-54">45-54</SelectItem>
                    <SelectItem value="55-64">55-64</SelectItem>
                    <SelectItem value="65+">65+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="occupation">Occupation</Label>
                <Input
                  id="occupation"
                  placeholder="e.g., Software Engineer, Teacher, Student"
                  value={formData.occupation}
                  onChange={(e) => updateFormData('occupation', e.target.value)}
                  className="glass"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="City, State/Country"
                  value={formData.location}
                  onChange={(e) => updateFormData('location', e.target.value)}
                  className="glass"
                />
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="accessibility"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-[#183543]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-[#183543]" />
              </div>
              <h2 className="text-2xl">Accessibility Needs</h2>
              <p className="text-muted-foreground mt-2">Help us personalize your experience</p>
            </div>

            <div className="max-w-md mx-auto space-y-6">
              <div className="space-y-3">
                <Label>Do you have any disabilities? *</Label>
                <p className="text-sm text-muted-foreground">Select all that apply</p>
                <div className="grid grid-cols-1 gap-3">
                  {disabilityOptions.map((option) => (
                    <Card
                      key={option.id}
                      className={`p-4 cursor-pointer transition-all glass-card ${
                        formData.disabilityStatus.includes(option.id)
                          ? 'ring-2 ring-[#183543] bg-[#183543]/5'
                          : ''
                      }`}
                      onClick={() => toggleArrayValue('disabilityStatus', option.id)}
                    >
                      <div className="flex items-center gap-3">
                        <Checkbox
                          checked={formData.disabilityStatus.includes(option.id)}
                          onCheckedChange={() => toggleArrayValue('disabilityStatus', option.id)}
                        />
                        <span className="text-2xl">{option.icon}</span>
                        <Label className="flex-1 cursor-pointer">{option.label}</Label>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label>Assistive Technologies You Use</Label>
                <p className="text-sm text-muted-foreground">Optional - Select all that apply</p>
                <div className="grid grid-cols-2 gap-3">
                  {assistiveTechOptions.map((option) => (
                    <Card
                      key={option.id}
                      className={`p-3 cursor-pointer transition-all glass-card ${
                        formData.assistiveTech.includes(option.id)
                          ? 'ring-2 ring-[#183543] bg-[#183543]/5'
                          : ''
                      }`}
                      onClick={() => toggleArrayValue('assistiveTech', option.id)}
                    >
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={formData.assistiveTech.includes(option.id)}
                          onCheckedChange={() => toggleArrayValue('assistiveTech', option.id)}
                        />
                        <Label className="flex-1 cursor-pointer text-sm">{option.label}</Label>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="languages"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-[#183543]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-[#183543]" />
              </div>
              <h2 className="text-2xl">Language Preferences</h2>
              <p className="text-muted-foreground mt-2">Choose your preferred languages</p>
            </div>

            <div className="max-w-md mx-auto space-y-6">
              <div className="space-y-2">
                <Label htmlFor="spokenLanguage">Preferred Spoken Language *</Label>
                <Select 
                  value={formData.spokenLanguage} 
                  onValueChange={(value) => updateFormData('spokenLanguage', value)}
                >
                  <SelectTrigger className="glass">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {spokenLanguages.map((lang) => (
                      <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signLanguage">Sign Language *</Label>
                <Select 
                  value={formData.signLanguage} 
                  onValueChange={(value) => updateFormData('signLanguage', value)}
                >
                  <SelectTrigger className="glass">
                    <SelectValue placeholder="Select your sign language" />
                  </SelectTrigger>
                  <SelectContent>
                    {signLanguages.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {formData.signLanguage && !['none', 'learning'].includes(formData.signLanguage) && (
                <div className="space-y-2">
                  <Label htmlFor="proficiency">Sign Language Proficiency</Label>
                  <Select 
                    value={formData.signLanguageProficiency} 
                    onValueChange={(value) => updateFormData('signLanguageProficiency', value)}
                  >
                    <SelectTrigger className="glass">
                      <SelectValue placeholder="Select your proficiency level" />
                    </SelectTrigger>
                    <SelectContent>
                      {proficiencyLevels.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <Card className="p-4 glass-card bg-blue-500/5">
                <div className="flex gap-3">
                  <MessageCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="text-sm mb-1">Why we ask</h4>
                    <p className="text-sm text-muted-foreground">
                      This helps us provide accurate translations, connect you with relevant content, 
                      and enable features like real-time sign language interpretation.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            key="interests"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-[#183543]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-[#183543]" />
              </div>
              <h2 className="text-2xl">Your Interests</h2>
              <p className="text-muted-foreground mt-2">Optional - Help us personalize your feed</p>
            </div>

            <div className="max-w-md mx-auto space-y-4">
              <div className="grid grid-cols-1 gap-3">
                {interestOptions.map((option) => (
                  <Card
                    key={option.id}
                    className={`p-4 cursor-pointer transition-all glass-card ${
                      formData.interests.includes(option.id)
                        ? 'ring-2 ring-[#183543] bg-[#183543]/5'
                        : ''
                    }`}
                    onClick={() => toggleArrayValue('interests', option.id)}
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={formData.interests.includes(option.id)}
                        onCheckedChange={() => toggleArrayValue('interests', option.id)}
                      />
                      <span className="text-2xl">{option.icon}</span>
                      <Label className="flex-1 cursor-pointer">{option.label}</Label>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 5:
        return (
          <motion.div
            key="review"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl">You're all set!</h2>
              <p className="text-muted-foreground mt-2">Review your information</p>
            </div>

            <div className="max-w-md mx-auto space-y-4">
              <Card className="p-4 glass-card">
                <h4 className="mb-3">Personal Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Name:</span>
                    <span>{formData.fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Age:</span>
                    <span>{formData.age}</span>
                  </div>
                  {formData.occupation && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Occupation:</span>
                      <span>{formData.occupation}</span>
                    </div>
                  )}
                  {formData.location && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Location:</span>
                      <span>{formData.location}</span>
                    </div>
                  )}
                </div>
              </Card>

              <Card className="p-4 glass-card">
                <h4 className="mb-3">Accessibility</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-muted-foreground block mb-1">Disability Status:</span>
                    <div className="flex flex-wrap gap-1">
                      {formData.disabilityStatus.map(status => {
                        const option = disabilityOptions.find(o => o.id === status);
                        return option ? (
                          <span key={status} className="px-2 py-1 bg-accent rounded-full text-xs">
                            {option.icon} {option.label}
                          </span>
                        ) : null;
                      })}
                    </div>
                  </div>
                  {formData.assistiveTech.length > 0 && (
                    <div>
                      <span className="text-muted-foreground block mb-1">Assistive Tech:</span>
                      <div className="flex flex-wrap gap-1">
                        {formData.assistiveTech.map(tech => {
                          const option = assistiveTechOptions.find(o => o.id === tech);
                          return option ? (
                            <span key={tech} className="px-2 py-1 bg-accent rounded-full text-xs">
                              {option.label}
                            </span>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </Card>

              <Card className="p-4 glass-card">
                <h4 className="mb-3">Languages</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Spoken:</span>
                    <span>{formData.spokenLanguage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sign Language:</span>
                    <span>
                      {signLanguages.find(l => l.value === formData.signLanguage)?.label || formData.signLanguage}
                    </span>
                  </div>
                </div>
              </Card>

              <Card className="p-4 glass-card bg-gradient-to-r from-blue-500/10 to-purple-500/10">
                <p className="text-sm text-center text-muted-foreground">
                  You can update all these preferences anytime in Settings
                </p>
              </Card>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 glass-strong">
      <div className="w-full max-w-3xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {totalSteps}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Content */}
        <Card className="glass-card p-6 lg:p-8 mb-6">
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between gap-4">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="glass"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={!isStepValid()}
            className="bg-[#183543] hover:bg-[#183543]/90 text-white"
          >
            {currentStep === totalSteps - 1 ? 'Get Started' : 'Continue'}
            {currentStep !== totalSteps - 1 && <ChevronRight className="w-4 h-4 ml-2" />}
          </Button>
        </div>
      </div>
    </div>
  );
}
