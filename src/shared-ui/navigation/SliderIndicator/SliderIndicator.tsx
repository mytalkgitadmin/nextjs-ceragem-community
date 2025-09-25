import React from "react";

interface SliderIndicatorProps {
  total: number;
  current: number;
  onIndicatorClick?: (index: number) => void;
  size?: "sm" | "md" | "lg";
  variant?: "dots" | "bars";
  className?: string;
}

export const SliderIndicator: React.FC<SliderIndicatorProps> = ({
  total,
  current,
  onIndicatorClick,
  size = "md",
  variant = "dots",
  className = "",
}) => {
  const sizeClasses = {
    sm: variant === "dots" ? "w-1.5 h-1.5" : "w-4 h-1",
    md: variant === "dots" ? "w-2 h-2" : "w-6 h-1.5",
    lg: variant === "dots" ? "w-3 h-3" : "w-8 h-2",
  };

  const shapeClass = variant === "dots" ? "rounded-full" : "rounded-sm";
  const spacing =
    size === "sm" ? "space-x-1" : size === "md" ? "space-x-2" : "space-x-3";

  return (
    <div className={`flex ${spacing} ${className}`}>
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          onClick={() => onIndicatorClick?.(index)}
          disabled={!onIndicatorClick}
          className={`
            ${sizeClasses[size]} 
            ${shapeClass}
            transition-colors
            ${index === current ? "bg-white" : "bg-white/50 hover:bg-white/70"}
            ${onIndicatorClick ? "cursor-pointer" : "cursor-default"}
          `}
        />
      ))}
    </div>
  );
};
