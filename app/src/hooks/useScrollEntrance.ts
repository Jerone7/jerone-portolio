import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollEntranceOptions {
  y?: number;
  x?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  triggerStart?: string;
  ease?: string;
  scale?: number;
  childSelector?: string;
}

export function useScrollEntrance<T extends HTMLElement>(
  options: ScrollEntranceOptions = {}
) {
  const ref = useRef<T>(null);

  const {
    y = 40,
    x = 0,
    duration = 0.8,
    delay = 0,
    stagger = 0,
    triggerStart = 'top 85%',
    ease = 'power3.out',
    scale,
    childSelector,
  } = options;

  useGSAP(() => {
    if (!ref.current) return;

    const targets = childSelector
      ? ref.current.querySelectorAll(childSelector)
      : ref.current;

    const fromVars: gsap.TweenVars = {
      opacity: 0,
      y,
      x,
      duration,
      delay,
      ease,
      stagger: stagger || undefined,
      scrollTrigger: {
        trigger: ref.current,
        start: triggerStart,
        toggleActions: 'play none none none',
      },
    };

    if (scale !== undefined) {
      fromVars.scale = scale;
    }

    gsap.from(targets, fromVars);
  }, { scope: ref });

  return ref;
}
