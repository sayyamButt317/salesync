"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function useGsapCounter(
  targetValue: number,
  duration = 1.2,
  enabled = true,
  formatValue?: (value: number) => string,
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
        const rounded = Math.round(obj.value);
        element.textContent = formatValue
          ? formatValue(rounded)
          : String(rounded);
      },
    });

    animatedRef.current = true;
    return () => {
      tween.kill();
    };
  }, [targetValue, duration, enabled, formatValue]);

  return ref;
}
