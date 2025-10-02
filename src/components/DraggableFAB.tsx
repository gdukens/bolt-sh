import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Hand, User, Mic, Volume2, Infinity, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { FABMode } from '../App';

interface DraggableFABProps {
  activeFABMode: FABMode;
  onModeChange: (mode: FABMode) => void;
}

interface Position {
  x: number;
  y: number;
}

const snapPoints = [
  { x: 0.85, y: 0.75, label: 'bottom-right' },
  { x: 0.5, y: 0.75, label: 'bottom-center' },
  { x: 0.15, y: 0.75, label: 'bottom-left' },
  { x: 0.85, y: 0.5, label: 'mid-right' },
  { x: 0.15, y: 0.5, label: 'mid-left' },
];

const modes = [
  { id: 'sign-capture' as FABMode, icon: Hand, label: 'Sign Capture', description: 'Capture sign language' },
  { id: 'avatar' as FABMode, icon: User, label: 'Avatar', description: 'Avatar translation' },
  { id: 'speech-to-text' as FABMode, icon: Mic, label: 'Speech→Text', description: 'Speech to text conversion' },
  { id: 'text-to-speech' as FABMode, icon: Volume2, label: 'Text→Speech', description: 'Text to speech conversion' },
];

export function DraggableFAB({ activeFABMode, onModeChange }: DraggableFABProps) {
  const [position, setPosition] = useState<Position>({ x: 0.85, y: 0.75 });
  const [isDragging, setIsDragging] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const [dragStart, setDragStart] = useState<Position>({ x: 0, y: 0 });
  const [initialMousePos, setInitialMousePos] = useState<Position>({ x: 0, y: 0 });
  const [dragStartTime, setDragStartTime] = useState<number>(0);
  const [dragDistance, setDragDistance] = useState<number>(0);
  const [fabState, setFabState] = useState<'idle' | 'pressed' | 'expanded' | 'closing'>('idle');
  const fabRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Calculate responsive radius based on viewport
  const getRadius = useCallback(() => {
    const viewport = Math.min(window.innerWidth, window.innerHeight);
    const isTablet = window.innerWidth >= 768;
    const isMobile = window.innerWidth < 640;
    
    if (isMobile) {
      return Math.min(100, viewport * 0.22);
    } else if (isTablet) {
      return Math.min(140, viewport * 0.18);
    } else {
      return Math.min(160, viewport * 0.2);
    }
  }, []);

  const getPixelPosition = useCallback((relativePos: Position) => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    return {
      x: relativePos.x * viewportWidth - 32, // 32 = half of FAB width (64px)
      y: relativePos.y * viewportHeight - 32,
    };
  }, []);

  const getRelativePosition = useCallback((pixelPos: Position) => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    return {
      x: (pixelPos.x + 32) / viewportWidth,
      y: (pixelPos.y + 32) / viewportHeight,
    };
  }, []);

  const findNearestSnapPoint = (pos: Position) => {
    let minDistance = Infinity;
    let nearestPoint = snapPoints[0];

    snapPoints.forEach(point => {
      const distance = Math.sqrt(
        Math.pow(pos.x - point.x, 2) + Math.pow(pos.y - point.y, 2)
      );
      if (distance < minDistance) {
        minDistance = distance;
        nearestPoint = point;
      }
    });

    return nearestPoint;
  };

  // Calculate option positions with screen-edge awareness
  const getOptionPositions = () => {
    const radius = getRadius();
    const pixelPos = getPixelPosition(position);
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const margin = 20;

    // Check if we need to reflow due to screen edges
    const needsReflow = 
      pixelPos.x - radius < margin || 
      pixelPos.x + radius > viewportWidth - margin ||
      pixelPos.y - radius < margin ||
      pixelPos.y + radius > viewportHeight - margin;

    const totalOptions = modes.length;
    let startAngle = -Math.PI / 2; // Start at top (12 o'clock)
    let arcSpan = 2 * Math.PI; // Full circle by default

    if (needsReflow) {
      // Determine which edge we're near and adjust arc
      const nearLeft = pixelPos.x - radius < margin;
      const nearRight = pixelPos.x + radius > viewportWidth - margin;
      const nearTop = pixelPos.y - radius < margin;
      const nearBottom = pixelPos.y + radius > viewportHeight - margin;

      if (nearLeft && nearTop) {
        startAngle = 0; // Start at right
        arcSpan = Math.PI / 2; // 90 degrees
      } else if (nearRight && nearTop) {
        startAngle = Math.PI / 2; // Start at bottom
        arcSpan = Math.PI / 2; // 90 degrees
      } else if (nearRight && nearBottom) {
        startAngle = Math.PI; // Start at left
        arcSpan = Math.PI / 2; // 90 degrees
      } else if (nearLeft && nearBottom) {
        startAngle = -Math.PI / 2; // Start at top
        arcSpan = Math.PI / 2; // 90 degrees
      } else if (nearLeft || nearRight) {
        startAngle = nearLeft ? -Math.PI / 4 : Math.PI / 4;
        arcSpan = Math.PI; // 180 degrees
      } else if (nearTop || nearBottom) {
        startAngle = nearTop ? Math.PI / 4 : -3 * Math.PI / 4;
        arcSpan = Math.PI; // 180 degrees
      }
    }

    return modes.map((_, index) => {
      const angle = startAngle + (index * arcSpan) / (totalOptions - 1);
      const x = pixelPos.x + 32 + Math.cos(angle) * radius;
      const y = pixelPos.y + 32 + Math.sin(angle) * radius;
      return { x, y, angle };
    });
  };

  // Haptic feedback
  const triggerHaptic = useCallback((type: 'light' | 'medium' | 'heavy' = 'light') => {
    if ('vibrate' in navigator) {
      const patterns = { light: 10, medium: 50, heavy: 100 };
      navigator.vibrate(patterns[type]);
    }
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isExpanded) {
      // If expanded, clicking the cross should close
      handleClose();
      return;
    }
    
    setIsDragging(true);
    setFabState('pressed');
    setDragStartTime(Date.now());
    setDragDistance(0);
    
    const pixelPos = getPixelPosition(position);
    setDragStart({
      x: e.clientX - pixelPos.x,
      y: e.clientY - pixelPos.y,
    });
    setInitialMousePos({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isExpanded) {
      // If expanded, touching the cross should close
      handleClose();
      return;
    }
    
    setIsDragging(true);
    setFabState('pressed');
    setDragStartTime(Date.now());
    setDragDistance(0);
    
    const touch = e.touches[0];
    const pixelPos = getPixelPosition(position);
    setDragStart({
      x: touch.clientX - pixelPos.x,
      y: touch.clientY - pixelPos.y,
    });
    setInitialMousePos({
      x: touch.clientX,
      y: touch.clientY,
    });
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || isExpanded) return;
    
    // Calculate drag distance from initial mouse position
    const distance = Math.sqrt(
      Math.pow(e.clientX - initialMousePos.x, 2) + 
      Math.pow(e.clientY - initialMousePos.y, 2)
    );
    setDragDistance(distance);
    
    // Only move if we've dragged far enough to distinguish from a click
    if (distance > 5) {
      const newPixelPos = {
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      };
      
      // Constrain to viewport bounds with some padding
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const fabSize = window.innerWidth < 640 ? 56 : 64; // Responsive FAB size
      const padding = 8; // Small padding from edges
      
      newPixelPos.x = Math.max(padding, Math.min(newPixelPos.x, viewportWidth - fabSize - padding));
      newPixelPos.y = Math.max(padding, Math.min(newPixelPos.y, viewportHeight - fabSize - padding));
      
      setPosition(getRelativePosition(newPixelPos));
    }
  }, [isDragging, isExpanded, initialMousePos.x, initialMousePos.y, dragStart.x, dragStart.y]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging || isExpanded) return;
    e.preventDefault();
    
    const touch = e.touches[0];
    
    // Calculate drag distance from initial touch position
    const distance = Math.sqrt(
      Math.pow(touch.clientX - initialMousePos.x, 2) + 
      Math.pow(touch.clientY - initialMousePos.y, 2)
    );
    setDragDistance(distance);
    
    // Only move if we've dragged far enough to distinguish from a tap
    if (distance > 5) {
      const newPixelPos = {
        x: touch.clientX - dragStart.x,
        y: touch.clientY - dragStart.y,
      };
      
      // Constrain to viewport bounds with some padding
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const fabSize = window.innerWidth < 640 ? 56 : 64; // Responsive FAB size
      const padding = 8; // Small padding from edges
      
      newPixelPos.x = Math.max(padding, Math.min(newPixelPos.x, viewportWidth - fabSize - padding));
      newPixelPos.y = Math.max(padding, Math.min(newPixelPos.y, viewportHeight - fabSize - padding));
      
      setPosition(getRelativePosition(newPixelPos));
    }
  }, [isDragging, isExpanded, initialMousePos.x, initialMousePos.y, dragStart.x, dragStart.y]);

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      const dragDuration = Date.now() - dragStartTime;
      const wasClick = dragDistance <= 5 && dragDuration < 250; // Less than 5px movement and 250ms = click
      
      if (wasClick && !isExpanded) {
        // Treat as click to expand
        setIsExpanded(true);
        setFabState('expanded');
        triggerHaptic('light');
      } else if (dragDistance > 5) {
        // Treat as drag - keep the FAB where it was dragged
        setFabState('idle');
        triggerHaptic('medium');
        // Position is already set during drag, no need to change it
      } else {
        // Reset state for ambiguous movements
        setFabState('idle');
      }
      
      setIsDragging(false);
      setDragDistance(0);
    }
  }, [isDragging, dragStartTime, dragDistance, isExpanded]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Click handling is now done in handleMouseUp to avoid conflicts with dragging
  };

  const handleClose = () => {
    setFabState('closing');
    setTimeout(() => {
      setIsExpanded(false);
      setFabState('idle');
      setFocusedIndex(-1);
    }, 150);
    triggerHaptic('light');
  };

  const handleModeSelect = (mode: FABMode, index: number) => {
    triggerHaptic('medium');
    onModeChange(activeFABMode === mode ? null : mode);
    handleClose();
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isExpanded) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          handleClose();
          break;
        case 'Tab':
          e.preventDefault();
          const nextIndex = e.shiftKey 
            ? (focusedIndex - 1 + modes.length) % modes.length
            : (focusedIndex + 1) % modes.length;
          setFocusedIndex(nextIndex);
          optionRefs.current[nextIndex]?.focus();
          break;
        case 'ArrowUp':
        case 'ArrowLeft':
          e.preventDefault();
          const prevIndex = (focusedIndex - 1 + modes.length) % modes.length;
          setFocusedIndex(prevIndex);
          optionRefs.current[prevIndex]?.focus();
          break;
        case 'ArrowDown':
        case 'ArrowRight':
          e.preventDefault();
          const nextIdx = (focusedIndex + 1) % modes.length;
          setFocusedIndex(nextIdx);
          optionRefs.current[nextIdx]?.focus();
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          if (focusedIndex >= 0) {
            handleModeSelect(modes[focusedIndex].id, focusedIndex);
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isExpanded, focusedIndex]);

  const pixelPosition = getPixelPosition(position);
  const optionPositions = getOptionPositions();

  return (
    <>
      {/* Backdrop scrim */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            onClick={handleClose}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <motion.div
        ref={fabRef}
        className={`fixed liquid-border shadow-2xl flex items-center justify-center cursor-pointer select-none ${
          fabState === 'expanded' 
            ? 'glass-fab bg-gradient-to-br from-[#183543] to-[#2a4a5a] z-[60]' 
            : 'glass-fab bg-gradient-to-br from-[#183543]/80 to-[#2a4a5a]/80 z-[60]'
        } w-14 h-14 sm:w-16 sm:h-16`}
        style={{
          left: `${pixelPosition.x}px`,
          top: `${pixelPosition.y}px`,
          transition: isDragging ? 'none' : 'left 0.18s ease-out, top 0.18s ease-out',
          touchAction: 'none',
        }}
        animate={{
          scale: fabState === 'pressed' ? 1.1 : fabState === 'expanded' ? 1.15 : 1,
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onClick={handleClick}
        role="button"
        aria-label={isExpanded ? 'Close quick actions' : 'Open quick actions'}
        aria-expanded={isExpanded}
        aria-haspopup="menu"
        tabIndex={0}
      >
        <AnimatePresence mode="wait">
          {isExpanded ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="infinity"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.2 }}
            >
              <Infinity className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {activeFABMode && !isExpanded && (
          <motion.div 
            className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2, delay: 0.1 }}
          />
        )}
      </motion.div>

      {/* Radial option buttons */}
      <AnimatePresence>
        {isExpanded && (
          <>
            {modes.map((mode, index) => {
              const pos = optionPositions[index];
              const Icon = mode.icon;
              const isActive = activeFABMode === mode.id;
              const isFocused = focusedIndex === index;

              return (
                <motion.button
                  key={mode.id}
                  ref={(el) => (optionRefs.current[index] = el)}
                  className={`fixed liquid-border flex items-center justify-center z-50 transition-all duration-300 select-none ${
                    isActive 
                      ? 'glass-strong bg-gradient-to-br from-[#183543] to-[#2a4a5a] text-white ring-2 ring-white/50 shadow-2xl scale-110' 
                      : 'glass text-foreground hover:glass-strong hover:scale-110 liquid-hover'
                  } ${
                    isFocused ? 'ring-2 ring-[#183543]/50 ring-offset-2' : ''
                  } w-10 h-10 sm:w-12 sm:h-12`}
                  style={{
                    left: `${pos.x - (window.innerWidth < 640 ? 20 : 24)}px`,
                    top: `${pos.y - (window.innerWidth < 640 ? 20 : 24)}px`,
                    touchAction: 'manipulation',
                  }}
                  initial={{
                    scale: 0,
                    opacity: 0,
                    x: -(pos.x - pixelPosition.x - 32),
                    y: -(pos.y - pixelPosition.y - 32),
                  }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                    x: 0,
                    y: 0,
                  }}
                  exit={{
                    scale: 0,
                    opacity: 0,
                    x: -(pos.x - pixelPosition.x - 32),
                    y: -(pos.y - pixelPosition.y - 32),
                  }}
                  transition={{
                    duration: 0.25,
                    delay: fabState === 'closing' ? 0 : index * 0.03,
                    ease: fabState === 'closing' ? 'easeIn' : 'easeOut',
                  }}
                  onClick={() => handleModeSelect(mode.id, index)}
                  onFocus={() => setFocusedIndex(index)}
                  onMouseEnter={() => triggerHaptic('light')}
                  role="menuitem"
                  aria-label={`${mode.label} - ${mode.description}`}
                  tabIndex={0}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.button>
              );
            })}
          </>
        )}
      </AnimatePresence>
    </>
  );
}