"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function useGsapRocketHover<T extends Element = HTMLElement>(
  disabled = false,
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || disabled) return;

    const onEnter = () => {
      gsap.to(element, {
        x: 3,
        y: -3,
        rotation: 12,
        duration: 0.25,
        ease: "power2.out",
      });
    };

    const onLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        rotation: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const parent = element.parentElement;
    if (!parent) return;

    parent.addEventListener("mouseenter", onEnter);
    parent.addEventListener("mouseleave", onLeave);

    return () => {
      parent.removeEventListener("mouseenter", onEnter);
      parent.removeEventListener("mouseleave", onLeave);
    };
  }, [disabled]);

  return ref;
}
