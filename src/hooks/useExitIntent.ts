"use client";

import { useEffect, useRef } from "react";

interface UseExitIntentOptions {
  onExitIntent: () => void;
  threshold?: number; // Distance from top edge to trigger (default: 10)
  delay?: number; // Delay before showing again (default: 1000ms)
}

export function useExitIntent({ 
  onExitIntent, 
  threshold = 10, 
  delay = 1000 
}: UseExitIntentOptions) {
  const lastTriggerTime = useRef<number>(0);
  const isTriggered = useRef<boolean>(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse is moving towards the top edge
      if (e.clientY <= threshold) {
        const now = Date.now();
        
        // Prevent multiple triggers in quick succession
        if (now - lastTriggerTime.current < delay) {
          return;
        }

        // Only trigger once per session
        if (isTriggered.current) {
          return;
        }

        lastTriggerTime.current = now;
        isTriggered.current = true;
        onExitIntent();
      }
    };

    // Add event listener
    document.addEventListener("mouseleave", handleMouseLeave);

    // Cleanup
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [onExitIntent, threshold, delay]);

  // Reset trigger state (useful for testing or manual reset)
  const resetTrigger = () => {
    isTriggered.current = false;
  };

  return { resetTrigger };
}
