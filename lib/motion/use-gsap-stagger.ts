"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface UseGsapStaggerOptions {
  selector?: string;
  y?: number;
  duration?: number;
  stagger?: number;
  delay?: number;
}

export function useGsapStagger<T extends HTMLElement>(
  options: UseGsapStaggerOptions = {},
) {
  const containerRef = useRef<T>(null);
  const { selector = "[data-animate]", y = 24, duration = 0.5, stagger = 0.08, delay = 0.1 } = options;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll(selector);
    if (!elements.length) return;

    const tween = gsap.fromTo(
      elements,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration,
        stagger,
        delay,
        ease: "power3.out",
      },
    );

    return () => {
      tween.kill();
    };
  }, [selector, y, duration, stagger, delay]);

  return containerRef;
}
