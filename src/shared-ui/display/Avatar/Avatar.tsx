import React from "react";

export interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: number;
  className?: string;
  isGroupMember?: boolean;
}

// Avatar 컴포넌트
export const Avatar = ({
  src,
  alt = "",
  name = "",
  size = 56,
  className = "",
  isGroupMember = false,
}: AvatarProps) => {
  const [imageError, setImageError] = React.useState(false);

  const getInitials = (name: string) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const containerSize = `${size * 0.625 * 0.1}rem`;

  if (isGroupMember) {
    // 그룹 내부 아바타
    return (
      <div
        className={`rounded-full overflow-hidden bg-gray-300 ${className}`}
        style={{ width: containerSize, height: containerSize }}
      >
        {!imageError && src ? (
          <img
            src={src}
            alt={alt || `${name} 아바타`}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-600 font-medium text-sm">
            {getInitials(name)}
          </div>
        )}
      </div>
    );
  }

  // 일반 아바타 (그룹 외부)
  return (
    <div
      className={`relative ${className}`}
      style={{ width: containerSize, height: containerSize }}
    >
      <div
        className="relative w-full h-full bg-gray-800 rounded-full overflow-hidden"
        style={{ aspectRatio: "1" }}
      >
        {!imageError && src ? (
          <img
            src={src}
            alt={alt || `${name} 아바타`}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white font-medium text-sm">
            {getInitials(name)}
          </div>
        )}
      </div>
    </div>
  );
};
