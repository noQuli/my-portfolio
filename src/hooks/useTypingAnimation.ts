import { useState, useCallback, useEffect, useRef } from 'react';

export interface UseTypingAnimationReturn {
  displayedText: string;
  isAnimating: boolean;
  startAnimation: (text: string) => void;
  skipAnimation: () => void;
  reset: () => void;
}

export function useTypingAnimation(
  delayMs: number = 15 // 10-20ms per character for snappy output
): UseTypingAnimationReturn {
  const [displayedText, setDisplayedText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const fullTextRef = useRef('');
  const indexRef = useRef(0);
  const animationRef = useRef<number | null>(null);
  const animateRef = useRef<(() => void) | null>(null);

  const animate = useCallback(() => {
    if (indexRef.current < fullTextRef.current.length) {
      setDisplayedText(fullTextRef.current.slice(0, indexRef.current + 1));
      indexRef.current++;
      animationRef.current = window.setTimeout(() => animateRef.current?.(), delayMs);
    } else {
      setIsAnimating(false);
    }
  }, [delayMs]);

  // Update the ref whenever animate changes
  useEffect(() => {
    animateRef.current = animate;
  }, [animate]);

  const startAnimation = useCallback((text: string) => {
    // Cancel any existing animation
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }

    fullTextRef.current = text;
    indexRef.current = 0;
    setDisplayedText('');
    setIsAnimating(true);

    // Start animation
    animationRef.current = window.setTimeout(animate, delayMs);
  }, [animate, delayMs]);

  const skipAnimation = useCallback(() => {
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }
    setDisplayedText(fullTextRef.current);
    setIsAnimating(false);
  }, []);

  const reset = useCallback(() => {
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }
    fullTextRef.current = '';
    indexRef.current = 0;
    setDisplayedText('');
    setIsAnimating(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, []);

  return {
    displayedText,
    isAnimating,
    startAnimation,
    skipAnimation,
    reset,
  };
}

export default useTypingAnimation;
