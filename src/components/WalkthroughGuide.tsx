/**
 * WalkthroughGuide Component - Spotlight Tour Style
 * 
 * A focused 10-step interactive Shepherd-style tour covering key Arkan Infinity features:
 * 1. Welcome - Introduction
 * 2. Accessibility Hub (FAB) - 4 core accessibility modes
 * 3. Home Feed - Accessible posts
 * 4. Avatar Studio - Custom signing avatars
 * 5. Messages - Multimodal communication
 * 6. Education - Sign language learning
 * 7. Navigation - App sections
 * 8. ModuSign Mini - Hardware pairing
 * 9. Emergency SOS - Safety features
 * 10. Complete - Getting started
 * 
 * Features a backdrop overlay with spotlight highlighting and on-screen explanations
 * Fully responsive for screens as small as 320px (iPhone SE, small Android devices)
 */

import React, { useState, useEffect } from 'react';
import { X, ArrowRight, ArrowLeft, Check, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { motion, AnimatePresence } from 'motion/react';

interface WalkthroughStep {
  id: string;
  title: string;
  description: string;
  targetElement?: string;
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center';
  action?: string;
  highlight?: boolean;
  tips?: string[];
  icon?: string;
}

interface WalkthroughGuideProps {
  onComplete: () => void;
  onSkip: () => void;
}

const walkthroughSteps: WalkthroughStep[] = [
  {
    id: 'welcome',
    title: '🎉 Welcome to Arkan!',
    description: 'Let\'s show you the key features that make communication barrier-free for everyone.',
    position: 'center',
    highlight: false,
  },
  {
    id: 'fab-modes',
    title: '♿ Accessibility Hub',
    description: 'This floating button is your gateway to 4 powerful accessibility modes:',
    targetElement: '[data-walkthrough="fab"]',
    position: 'left',
    highlight: true,
    tips: [
      '✋ Sign Capture',
      '👤 Avatar Translation',
      '🎤 Speech-to-Text',
      '🔊 Text-to-Speech'
    ],
  },
  {
    id: 'home-feed',
    title: '📱 Home Feed',
    description: 'Posts support sign language videos, captions, and avatar translations.',
    targetElement: '[data-walkthrough="home-feed"]',
    position: 'bottom',
    highlight: true,
  },
  {
    id: 'avatar-studio',
    title: '🎨 Avatar Studio',
    description: 'Create your personal signing avatar to represent you in translations. Find it in your Profile → Avatar Studio.',
    position: 'center',
    highlight: false,
    tips: [
      'Tap Profile in the bottom navigation',
      'Then select "Avatar Studio" from the menu'
    ],
  },
  {
    id: 'messages',
    title: '💬 Messages',
    description: 'Send messages using text, voice, sign language, or avatar translations. Tap the Messages icon at the bottom to access.',
    targetElement: '[data-walkthrough="messages"]',
    position: 'bottom',
    highlight: true,
  },
  {
    id: 'education',
    title: '📚 Education Hub',
    description: 'Learn sign language with interactive courses and save content to your library. Find it in the bottom navigation bar.',
    targetElement: '[data-walkthrough="education"]',
    position: 'top',
    highlight: true,
  },
  {
    id: 'bottom-nav',
    title: '🧭 Navigation',
    description: 'Explore: Home, Connections, Infinity Hub, Education, and Notifications.',
    targetElement: '[data-walkthrough="bottom-nav"]',
    position: 'top',
    highlight: true,
  },
  {
    id: 'modsign-device',
    title: '📱 ModuSign Mini',
    description: 'Pair your wearable device for enhanced sign language capture accuracy. Access this from Settings.',
    position: 'center',
    highlight: false,
    tips: [
      'Open Profile menu (top-right)',
      'Go to Settings → Device Pairing',
      'Follow the pairing instructions'
    ],
  },
  {
    id: 'emergency-sos',
    title: '🚨 Emergency SOS',
    description: 'Quick access to emergency services with accessible communication options. Available in Settings.',
    position: 'center',
    highlight: false,
    tips: [
      'Open Profile menu (top-right)',
      'Go to Settings → Emergency SOS',
      'Configure your emergency contacts'
    ],
  },
  {
    id: 'complete',
    title: '✨ All Set!',
    description: 'You\'re ready for barrier-free communication! Restart this tour anytime from Settings.',
    position: 'center',
    highlight: false,
  },
];

export function WalkthroughGuide({ onComplete, onSkip }: WalkthroughGuideProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const step = walkthroughSteps[currentStep];
  const progress = ((currentStep + 1) / walkthroughSteps.length) * 100;

  useEffect(() => {
    const updateTargetRect = () => {
      if (step.targetElement) {
        try {
          const element = document.querySelector(step.targetElement);
          if (element) {
            const rect = element.getBoundingClientRect();
            setTargetRect(rect);
            
            // Scroll element into view
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          } else {
            setTargetRect(null);
          }
        } catch (error) {
          console.warn('Error finding walkthrough element:', error);
          setTargetRect(null);
        }
      } else {
        setTargetRect(null);
      }
    };

    // Initial update with delay
    const timeoutId = setTimeout(updateTargetRect, 100);

    // Update on window resize
    window.addEventListener('resize', updateTargetRect);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', updateTargetRect);
    };
  }, [currentStep, step.targetElement]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
        case 'Enter':
          e.preventDefault();
          handleNext();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          handleBack();
          break;
        case 'Escape':
          e.preventDefault();
          handleSkip();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStep]);

  // Touch/swipe gestures for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handleBack();
    }
  };

  const handleNext = () => {
    if (currentStep < walkthroughSteps.length - 1) {
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
    setIsVisible(false);
    setTimeout(() => {
      localStorage.setItem('arkan_walkthrough_completed', 'true');
      onComplete();
    }, 300);
  };

  const handleSkip = () => {
    setIsVisible(false);
    setTimeout(() => {
      localStorage.setItem('arkan_walkthrough_completed', 'true');
      onSkip();
    }, 300);
  };

  const getTooltipPosition = () => {
    if (!targetRect || step.position === 'center') {
      return {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      };
    }

    try {
      const isMobile = window.innerWidth < 768;
      const isTinyMobile = window.innerWidth <= 320;
      const isSmallMobile = window.innerWidth <= 375;
      const margin = isTinyMobile ? 8 : isSmallMobile ? 12 : 16;
      const padding = isMobile ? (isTinyMobile ? 12 : 16) : 24;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      const position: React.CSSProperties = {};
      
      // Calculate available space
      const spaceAbove = targetRect.top;
      const spaceBelow = viewportHeight - targetRect.bottom;
      const spaceLeft = targetRect.left;
      const spaceRight = viewportWidth - targetRect.right;
      
      // On mobile, prefer top or bottom positioning
      if (isMobile) {
        // Decide vertical position
        if (spaceBelow > 200 || (step.position === 'bottom' && spaceBelow > 100)) {
          // Position below
          position.top = `${targetRect.bottom + padding}px`;
        } else if (spaceAbove > 200 || (step.position === 'top' && spaceAbove > 100)) {
          // Position above
          position.bottom = `${viewportHeight - targetRect.top + padding}px`;
        } else {
          // Center vertically if not enough space
          position.top = '50%';
          position.transform = 'translateY(-50%)';
        }
        
        // Center horizontally
        position.left = '50%';
        if (!position.transform) {
          position.transform = 'translateX(-50%)';
        } else {
          position.transform = 'translate(-50%, -50%)';
        }
      } else {
        // Desktop positioning
        const centerX = targetRect.left + targetRect.width / 2;
        const centerY = targetRect.top + targetRect.height / 2;
        
        switch (step.position) {
          case 'top':
            position.bottom = `${viewportHeight - targetRect.top + padding}px`;
            position.left = `${Math.max(margin, Math.min(centerX, viewportWidth - 300))}px`;
            position.transform = 'translateX(-50%)';
            break;
          case 'bottom':
            position.top = `${targetRect.bottom + padding}px`;
            position.left = `${Math.max(margin, Math.min(centerX, viewportWidth - 300))}px`;
            position.transform = 'translateX(-50%)';
            break;
          case 'left':
            position.right = `${viewportWidth - targetRect.left + padding}px`;
            position.top = `${Math.max(margin, Math.min(centerY, viewportHeight - 200))}px`;
            position.transform = 'translateY(-50%)';
            break;
          case 'right':
            position.left = `${targetRect.right + padding}px`;
            position.top = `${Math.max(margin, Math.min(centerY, viewportHeight - 200))}px`;
            position.transform = 'translateY(-50%)';
            break;
          default:
            position.top = '50%';
            position.left = '50%';
            position.transform = 'translate(-50%, -50%)';
        }
      }

      return position;
    } catch (error) {
      // Fallback to center
      return {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      };
    }
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="walkthrough-title"
        aria-describedby="walkthrough-description"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Dark Backdrop with Spotlight */}
        <div className="absolute inset-0 bg-black/70 transition-all duration-300">
          {step.highlight && targetRect && (
            <>
              {/* Spotlight cutout effect */}
              <div
                className="absolute pointer-events-none transition-all duration-300"
                style={{
                  left: Math.max(0, targetRect.left - 8),
                  top: Math.max(0, targetRect.top - 8),
                  width: targetRect.width + 16,
                  height: targetRect.height + 16,
                }}
              >
                <div
                  className="absolute inset-0 rounded-xl"
                  style={{
                    boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.7)',
                  }}
                />
                {/* Highlight border with pulse */}
                <div className="absolute inset-0 rounded-xl border-4 border-[#183543] shadow-lg shadow-[#183543]/50">
                  <div className="absolute inset-0 rounded-xl border-2 border-white/30 animate-pulse" />
                </div>
                {/* Glow effect */}
                <div className="absolute -inset-4 rounded-2xl bg-[#183543]/10 blur-xl animate-pulse" />
              </div>
            </>
          )}
        </div>

        {/* Progress Bar - Fixed Top */}
        <div className="absolute top-0 left-0 right-0 z-20 p-3 xs:p-4 sm:p-6">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-2 xs:mb-3">
              <div className="flex items-center gap-2 xs:gap-3">
                <span className="text-xs xs:text-sm text-white/90 font-medium">
                  {currentStep + 1} / {walkthroughSteps.length}
                </span>
                {/* Dot indicators for mobile */}
                <div className="flex sm:hidden gap-1">
                  {walkthroughSteps.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1.5 rounded-full transition-all ${
                        idx === currentStep
                          ? 'bg-white w-6'
                          : idx < currentStep
                          ? 'bg-white/60 w-1.5'
                          : 'bg-white/30 w-1.5'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSkip}
                className="h-auto p-1.5 xs:p-2 hover:bg-white/10 text-white touch-manipulation"
                aria-label="Close walkthrough"
              >
                <X className="h-4 w-4 xs:h-5 xs:w-5" />
              </Button>
            </div>
            <Progress value={progress} className="h-1 xs:h-1.5 bg-white/20" />
          </div>
        </div>

        {/* Content Tooltip - Positioned Near Element */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="absolute z-10 max-w-[calc(100vw-1rem)] xs:max-w-[calc(100vw-1.5rem)] sm:max-w-md md:max-w-lg"
          style={getTooltipPosition()}
        >
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-4 xs:p-5 sm:p-6 mx-2 xs:mx-3 sm:mx-0">
            {/* Icon for special steps */}
            {(step.id === 'welcome' || step.id === 'complete') && (
              <div className="w-10 h-10 xs:w-12 xs:h-12 rounded-full bg-gradient-to-br from-[#183543] to-[#2a4a5a] flex items-center justify-center mb-3 xs:mb-4">
                <Sparkles className="w-5 h-5 xs:w-6 xs:h-6 text-white" />
              </div>
            )}

            {/* Title */}
            <h3 
              id="walkthrough-title" 
              className="text-base xs:text-lg sm:text-xl mb-2 xs:mb-3 text-gray-900 dark:text-white leading-tight"
            >
              {step.title}
            </h3>

            {/* Description */}
            <p 
              id="walkthrough-description" 
              className="text-sm xs:text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-3 xs:mb-4"
            >
              {step.description}
            </p>

            {/* Tips list */}
            {step.tips && step.tips.length > 0 && (
              <ul className="space-y-1.5 xs:space-y-2 mb-3 xs:mb-4 pl-1">
                {step.tips.map((tip, index) => (
                  <li key={index} className="text-xs xs:text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2">
                    <span className="text-[#183543] dark:text-[#4a9eff] mt-0.5 flex-shrink-0 text-base">•</span>
                    <span className="flex-1">{tip}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between gap-2 xs:gap-3 pt-2 xs:pt-3 border-t border-gray-200 dark:border-gray-700">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 0}
                className="text-xs xs:text-sm px-3 xs:px-4 h-8 xs:h-9 sm:h-10 touch-manipulation border-gray-300 dark:border-gray-600 disabled:opacity-50"
                size="sm"
              >
                <ArrowLeft className="w-3 h-3 xs:w-4 xs:h-4 mr-1 xs:mr-2" />
                Back
              </Button>

              <div className="flex items-center gap-2">
                {currentStep > 0 && currentStep < walkthroughSteps.length - 1 && (
                  <Button
                    variant="ghost"
                    onClick={handleSkip}
                    className="text-xs xs:text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 h-8 xs:h-9 sm:h-10 px-2 xs:px-3 touch-manipulation"
                  >
                    Skip
                  </Button>
                )}

                {currentStep === walkthroughSteps.length - 1 ? (
                  <Button
                    onClick={handleComplete}
                    className="bg-[#183543] hover:bg-[#183543]/90 text-white text-xs xs:text-sm px-4 xs:px-5 sm:px-6 h-8 xs:h-9 sm:h-10 touch-manipulation"
                    size="sm"
                  >
                    Get Started
                    <Check className="w-3 h-3 xs:w-4 xs:h-4 ml-1 xs:ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    className="bg-[#183543] hover:bg-[#183543]/90 text-white text-xs xs:text-sm px-4 xs:px-5 sm:px-6 h-8 xs:h-9 sm:h-10 touch-manipulation"
                    size="sm"
                  >
                    Next
                    <ArrowRight className="w-3 h-3 xs:w-4 xs:h-4 ml-1 xs:ml-2" />
                  </Button>
                )}
              </div>
            </div>

            {/* Keyboard/Swipe hints */}
            <p className="text-xs text-gray-400 dark:text-gray-500 text-center mt-3 xs:mt-4 pt-2 xs:pt-3 border-t border-gray-200 dark:border-gray-700">
              <span className="sm:hidden">← Swipe to navigate →</span>
              <span className="hidden sm:inline">Use arrow keys or ESC to close</span>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
