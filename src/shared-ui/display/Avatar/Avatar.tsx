import React from "react";

export type AvatarSize = "xs" | "sm" | "md" | "lg";

export interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: AvatarSize;
  className?: string;
  isGrouping?: boolean;
}

// Avatar 컴포넌트
export const Avatar = ({
  src,
  alt = "",
  name = "",
  size = "md",
  className = "",
  isGrouping = false,
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

  // 사이즈별 스타일 매핑
  const sizeConfig = {
    xs: {
      container: "w-6 h-6", // 24px
      text: "text-xs",
    },
    sm: {
      container: "w-8 h-8", // 32px
      text: "text-sm",
    },
    md: {
      container: "w-14 h-14", // 56px
      text: "text-base",
    },
    lg: {
      container: "w-16 h-16", // 64px
      text: "text-lg",
    },
  };

  const config = sizeConfig[size];

  if (isGrouping) {
    // 그룹 내부 아바타
    return (
      <div
        className={`rounded-full overflow-hidden bg-gray-300 ${config.container} ${className}`}
      >
        {!imageError && src ? (
          <img
            src={src}
            alt={alt || `${name} 아바타`}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div
            className={`w-full h-full flex items-center justify-center text-gray-600 font-medium ${config.text}`}
          >
            {getInitials(name)}
          </div>
        )}
      </div>
    );
  }

  // 일반 아바타 (그룹 외부)
  return (
    <div className={`relative ${config.container} ${className}`}>
      <div className="relative w-full h-full bg-gray-800 rounded-full overflow-hidden">
        {!imageError && src ? (
          <img
            src={src}
            alt={alt || `${name} 아바타`}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div
            className={`w-full h-full flex items-center justify-center text-white font-medium ${config.text}`}
          >
            {getInitials(name)}
          </div>
        )}
      </div>
    </div>
  );
};
