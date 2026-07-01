"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function useGsapHoverLift<T extends HTMLElement>(
  selected = false,
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || selected) return;

    const onEnter = () => {
      gsap.to(element, {
        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        y: -2,
        duration: 0.25,
        ease: "power2.out",
      });
    };

    const onLeave = () => {
      gsap.to(element, {
        boxShadow: "0 0px 0px rgba(0,0,0,0)",
        y: 0,
        duration: 0.25,
        ease: "power2.out",
      });
    };

    element.addEventListener("mouseenter", onEnter);
    element.addEventListener("mouseleave", onLeave);

    return () => {
      element.removeEventListener("mouseenter", onEnter);
      element.removeEventListener("mouseleave", onLeave);
    };
  }, [selected]);

  return ref;
}
