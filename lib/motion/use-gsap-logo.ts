"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function useGsapLogoPulse() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const tween = gsap.fromTo(
      element,
      { scale: 0.8, opacity: 0, rotate: -12 },
      {
        scale: 1,
        opacity: 1,
        rotate: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
      },
    );

    const pulse = gsap.to(element, {
      scale: 1.08,
      duration: 1.2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: 0.8,
    });

    return () => {
      tween.kill();
      pulse.kill();
    };
  }, []);

  return ref;
}
