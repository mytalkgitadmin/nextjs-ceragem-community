"use client";

import { UserIcon } from "@heroicons/react/24/solid";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface AvatarProps {
  src?: string;
  alt?: string;
  size?: AvatarSize;
  fallback?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const sizeStyles: Record<AvatarSize, string> = {
  xs: "w-6 h-6",
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12",
  xl: "w-16 h-16",
};

const iconSizeStyles: Record<AvatarSize, string> = {
  xs: "w-3 h-3",
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
  xl: "w-8 h-8",
};

export function Avatar({
  src,
  alt = "Avatar",
  size = "md",
  fallback,
  className = "",
  onClick,
}: AvatarProps) {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.style.display = "none";
  };

  const containerClassName = `
    relative inline-flex items-center justify-center
    ${sizeStyles[size]}
    bg-gray-300 rounded-full overflow-hidden
    ${onClick ? "cursor-pointer hover:opacity-80" : ""}
    ${className}
  `;

  return (
    <div className={containerClassName} onClick={onClick}>
      {src && (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={handleImageError}
        />
      )}

      {(!src || fallback) && (
        <div className="flex items-center justify-center w-full h-full">
          {fallback || (
            <UserIcon className={`${iconSizeStyles[size]} text-gray-500`} />
          )}
        </div>
      )}
    </div>
  );
}
