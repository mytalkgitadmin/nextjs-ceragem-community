import { useState, useRef } from "react";

interface UseSwipeGestureProps {
  onSwipe: (direction: "left" | "right") => void;
  threshold?: number;
}

export const useSwipeGesture = ({
  onSwipe,
  threshold = 50,
}: UseSwipeGestureProps) => {
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleStart = (clientX: number) => {
    setStartX(clientX);
    setCurrentX(clientX);
    setIsDragging(true);
  };

  const handleMove = (clientX: number) => {
    if (!isDragging) return;
    setCurrentX(clientX);
  };

  const handleEnd = () => {
    if (!isDragging) return;

    const diff = startX - currentX;

    if (Math.abs(diff) > threshold) {
      onSwipe(diff > 0 ? "left" : "right");
    }

    setIsDragging(false);
    setStartX(0);
    setCurrentX(0);
  };

  const getSwipeProps = () => ({
    onMouseDown: (e: React.MouseEvent) => {
      e.preventDefault();
      handleStart(e.clientX);
    },
    onMouseMove: (e: React.MouseEvent) => {
      handleMove(e.clientX);
    },
    onMouseUp: handleEnd,
    onMouseLeave: handleEnd,
    onTouchStart: (e: React.TouchEvent) => {
      handleStart(e.touches[0].clientX);
    },
    onTouchMove: (e: React.TouchEvent) => {
      handleMove(e.touches[0].clientX);
    },
    onTouchEnd: handleEnd,
  });

  const getTransform = (baseTransform: string = "") => {
    const swipeOffset = isDragging ? currentX - startX : 0;
    return baseTransform.includes("translateX")
      ? baseTransform.replace(
          /translateX\([^)]*\)/,
          `translateX(calc(${baseTransform.match(/translateX\(([^)]*)\)/)?.[1] || "0px"} + ${swipeOffset}px))`
        )
      : `${baseTransform} translateX(${swipeOffset}px)`.trim();
  };

  const getTransition = () => (isDragging ? "none" : "transform 0.3s ease-out");

  return {
    isDragging,
    getSwipeProps,
    getTransform,
    getTransition,
  };
};
