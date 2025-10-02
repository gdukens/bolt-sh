import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import arkanLogo from 'figma:asset/99b3bedf02fee33c38a846fb7da497383fe8687c.png';

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [showText, setShowText] = useState(false);
  const [textComplete, setTextComplete] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  
  const text = "Bridging abilities, boundlessly!";
  const letters = text.split('');

  useEffect(() => {
    // Show text after 1 second
    const textTimer = setTimeout(() => {
      setShowText(true);
    }, 1000);

    // Mark text as complete and start fade out after text animation
    const completeTimer = setTimeout(() => {
      setTextComplete(true);
      setFadeOut(true);
    }, 1000 + (letters.length * 50) + 500); // 1s delay + letter animations + 0.5s pause

    // Complete loading after fade out
    const finalTimer = setTimeout(() => {
      onComplete();
    }, 1000 + (letters.length * 50) + 500 + 800); // + 0.8s fade out duration

    return () => {
      clearTimeout(textTimer);
      clearTimeout(completeTimer);
      clearTimeout(finalTimer);
    };
  }, [letters.length, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-background flex flex-col items-center justify-center z-[100]"
      initial={{ opacity: 1 }}
      animate={{ opacity: fadeOut ? 0 : 1 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      {/* Logo */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          duration: 0.8, 
          ease: 'easeOut',
          type: 'spring',
          damping: 15
        }}
      >
        <div className="w-72 h-72 flex items-center justify-center">
          <img 
            src={arkanLogo} 
            alt="Arkan Infinity" 
            className="w-64 h-64 object-contain drop-shadow-2xl"
          />
        </div>
      </motion.div>

      {/* Animated Text */}
      <div className="flex flex-wrap justify-center max-w-md text-center">
        {showText && letters.map((letter, index) => (
          <motion.span
            key={index}
            className="text-xl text-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: index * 0.05,
              ease: 'easeOut'
            }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}