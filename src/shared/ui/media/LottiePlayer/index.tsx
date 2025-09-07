"use client";

import React, { CSSProperties, useEffect, useRef } from "react";
import lottie from "lottie-web";

type LottiePlayerProps = {
  src: string;
  autoplay?: boolean;
  loop?: boolean | number;
  speed?: number;
  width?: number | string;
  height?: number | string;
  style?: CSSProperties;
  className?: string;
  preserveAspectRatio?: "xMidYMid meet" | "xMidYMid slice" | "none" | string;
};

export function LottiePlayer({
  src,
  autoplay = true,
  loop = true,
  speed = 1,
  width = 160,
  height = 160,
  style,
  className,
  preserveAspectRatio = "xMidYMid meet",
}: LottiePlayerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const anim = lottie.loadAnimation({
      container: containerRef.current,
      renderer: "svg",
      loop,
      autoplay,
      path: src,
      rendererSettings: {
        preserveAspectRatio,
        progressiveLoad: true,
        hideOnTransparent: true,
      },
    });

    if (speed && typeof speed === "number") {
      anim.setSpeed(speed);
    }

    return () => {
      anim.destroy();
    };
  }, [src, autoplay, loop, speed, preserveAspectRatio]);

  const wrapperStyle: CSSProperties = {
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
    lineHeight: 0,
    ...style,
  };

  return <div ref={containerRef} className={className} style={wrapperStyle} />;
}

export default LottiePlayer;
