"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function useGsapButtonGlow<T extends HTMLElement>(disabled = false) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || disabled) return;

    const onEnter = () => {
      gsap.to(element, {
        boxShadow: "0 4px 20px rgba(99,102,241,0.45)",
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const onLeave = () => {
      gsap.to(element, {
        boxShadow: "0 2px 8px rgba(99,102,241,0.2)",
        duration: 0.3,
        ease: "power2.out",
      });
    };

    gsap.set(element, { boxShadow: "0 2px 8px rgba(99,102,241,0.2)" });

    element.addEventListener("mouseenter", onEnter);
    element.addEventListener("mouseleave", onLeave);

    return () => {
      element.removeEventListener("mouseenter", onEnter);
      element.removeEventListener("mouseleave", onLeave);
    };
  }, [disabled]);

  return ref;
}
