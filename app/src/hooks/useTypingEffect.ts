import { useState, useEffect, useRef, useCallback } from 'react';

interface UseTypingEffectOptions {
  text: string;
  speed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
  restartDelay?: number;
}

export function useTypingEffect({
  text,
  speed = 100,
  deleteSpeed = 50,
  pauseDuration = 3000,
  restartDelay = 500,
}: UseTypingEffectOptions) {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const phaseRef = useRef<'typing' | 'pausing' | 'deleting' | 'restarting'>('typing');
  const indexRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const runCycle = useCallback(() => {
    const typeNext = () => {
      if (indexRef.current < text.length) {
        indexRef.current++;
        setDisplayedText(text.slice(0, indexRef.current));
        setIsTyping(true);
        timeoutRef.current = setTimeout(typeNext, speed);
      } else {
        setIsTyping(false);
        phaseRef.current = 'pausing';
        timeoutRef.current = setTimeout(() => {
          phaseRef.current = 'deleting';
          deleteNext();
        }, pauseDuration);
      }
    };

    const deleteNext = () => {
      if (indexRef.current > 0) {
        indexRef.current--;
        setDisplayedText(text.slice(0, indexRef.current));
        timeoutRef.current = setTimeout(deleteNext, deleteSpeed);
      } else {
        phaseRef.current = 'restarting';
        timeoutRef.current = setTimeout(() => {
          phaseRef.current = 'typing';
          indexRef.current = 0;
          typeNext();
        }, restartDelay);
      }
    };

    typeNext();
  }, [text, speed, deleteSpeed, pauseDuration, restartDelay]);

  useEffect(() => {
    indexRef.current = 0;
    setDisplayedText('');
    phaseRef.current = 'typing';
    runCycle();

    return () => {
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    };
  }, [runCycle]);

  // Cursor blink
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(blinkInterval);
  }, []);

  return { displayedText, showCursor, isTyping };
}
