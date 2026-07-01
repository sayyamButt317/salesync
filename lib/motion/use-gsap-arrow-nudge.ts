"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function useGsapArrowNudge<T extends Element = HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const onEnter = () => {
      gsap.to(element, { x: 4, duration: 0.2, ease: "power2.out" });
    };

    const onLeave = () => {
      gsap.to(element, { x: 0, duration: 0.2, ease: "power2.out" });
    };

    const parent = element.parentElement;
    if (!parent) return;

    parent.addEventListener("mouseenter", onEnter);
    parent.addEventListener("mouseleave", onLeave);

    return () => {
      parent.removeEventListener("mouseenter", onEnter);
      parent.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return ref;
}
