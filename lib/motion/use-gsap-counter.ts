"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function useGsapCounter(
  targetValue: number,
  duration = 1.2,
  enabled = true,
) {
  const ref = useRef<HTMLSpanElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    if (!enabled || !ref.current) return;

    const element = ref.current;
    const obj = { value: animatedRef.current ? targetValue : 0 };

    const tween = gsap.to(obj, {
      value: targetValue,
      duration: animatedRef.current ? 0.4 : duration,
      ease: "power2.out",
      onUpdate: () => {
        element.textContent = String(Math.round(obj.value));
      },
    });

    animatedRef.current = true;
    return () => {
      tween.kill();
    };
  }, [targetValue, duration, enabled]);

  return ref;
}
