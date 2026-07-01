"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function useGsapStaggerGrid<T extends HTMLElement>(
  itemCount: number,
  enabled = true,
  selector = "[data-stagger-card]",
) {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    if (!enabled || !containerRef.current || itemCount === 0) return;

    const elements = containerRef.current.querySelectorAll(selector);
    if (!elements.length) return;

    const tween = gsap.fromTo(
      elements,
      { opacity: 0, y: 16, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.4,
        stagger: 0.04,
        ease: "power3.out",
        delay: 0.1,
      },
    );

    return () => {
      tween.kill();
    };
  }, [itemCount, enabled, selector]);

  return containerRef;
}
