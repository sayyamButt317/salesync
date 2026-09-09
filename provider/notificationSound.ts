"use client";
import { useCallback, useRef } from "react";

export function useNotificationSound() {
  const contextRef = useRef<AudioContext | null>(null);
  const playSound = useCallback(() => {
    if (typeof window === "undefined") return;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioCtx) return;

      if (!contextRef.current) {
        contextRef.current = new AudioCtx();
      }
      const context = contextRef.current;
      if (context.state === "suspended") {
        void context.resume();
      }

      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = 880;
      gain.gain.value = 0.04;
      oscillator.connect(gain);
      gain.connect(context.destination);
      const now = context.currentTime;
      oscillator.start(now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
      oscillator.stop(now + 0.2);
    } catch {
      // Ignore autoplay / audio failures in production.
    }
  }, []);

  return { playSound };
}
