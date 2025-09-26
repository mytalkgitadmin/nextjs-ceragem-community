import React, { Children, cloneElement, isValidElement } from "react";
import { Avatar, AvatarSize } from "./Avatar";

export interface AvatarGroupProps {
  children: React.ReactNode;
  className?: string;
  isActive?: boolean;
  size?: AvatarSize;
}

const MAX_COUNT = 4;

// AvatarGroup 컴포넌트
export const AvatarGroup = ({
  children,
  size = "md",
  className = "",
}: AvatarGroupProps) => {
  const validChildren = Children.toArray(children).filter(
    (child) => isValidElement(child) && child.type === Avatar
  );

  const memberCount = Math.min(validChildren.length, MAX_COUNT);

  // 사이즈별 컨테이너 스타일 매핑
  const sizeConfig = {
    xs: {
      container: "w-6 h-6", // 24px
      childSizes: {
        1: "xs" as AvatarSize,
        2: "xs" as AvatarSize,
        3: "xs" as AvatarSize,
        4: "xs" as AvatarSize,
      },
    },
    sm: {
      container: "w-8 h-8", // 32px
      childSizes: {
        1: "sm" as AvatarSize,
        2: "xs" as AvatarSize,
        3: "xs" as AvatarSize,
        4: "xs" as AvatarSize,
      },
    },
    md: {
      container: "w-12 h-12", // 48px
      childSizes: {
        1: "md" as AvatarSize,
        2: "sm" as AvatarSize,
        3: "xs" as AvatarSize,
        4: "xs" as AvatarSize,
      },
    },
    lg: {
      container: "w-16 h-16", // 64px
      childSizes: {
        1: "lg" as AvatarSize,
        2: "md" as AvatarSize,
        3: "sm" as AvatarSize,
        4: "xs" as AvatarSize,
      },
    },
  };

  const config = sizeConfig[size];

  if (memberCount === 0) {
    return null;
  }

  const getLayoutClasses = () => {
    const baseClasses = `relative flex-shrink-0 bg-white ${config.container}`;

    switch (memberCount) {
      case 1:
        return `${baseClasses} rounded-full ring-2 ring-white`;
      case 2:
      case 3:
      case 4:
        return `${baseClasses} p-0.5`;
      default:
        return baseClasses;
    }
  };

  const getChildPositionClasses = (index: number) => {
    const baseClasses = `absolute rounded-full ring-2 ring-white overflow-hidden`;

    switch (memberCount) {
      case 1:
        return "relative w-full h-full rounded-full ring-2 ring-white overflow-hidden";

      case 2:
        if (index === 0) {
          return `${baseClasses} top-0 left-0 z-10`;
        } else {
          return `${baseClasses} bottom-0 right-0`;
        }

      case 3:
        if (index === 0) {
          return `${baseClasses} top-0 left-1/2 transform -translate-x-1/2 z-10`;
        } else if (index === 1) {
          return `${baseClasses} bottom-0 left-0`;
        } else {
          return `${baseClasses} bottom-0 right-0`;
        }

      case 4:
        return `${baseClasses} ${
          index === 0
            ? "top-0 left-0"
            : index === 1
              ? "top-0 right-0"
              : index === 2
                ? "bottom-0 left-0"
                : "bottom-0 right-0"
        }`;

      default:
        return baseClasses;
    }
  };

  const getChildSize = (): AvatarSize => {
    return config.childSizes[memberCount as keyof typeof config.childSizes];
  };

  const childSize = getChildSize();

  if (memberCount === 1) {
    const child = validChildren[0];
    return (
      <div className={`${getLayoutClasses()} ${className}`}>
        {cloneElement(child as React.ReactElement, {
          size: childSize,
          isGrouping: true,
          className: "w-full h-full ring-0",
        })}
      </div>
    );
  }

  return (
    <div className={`${getLayoutClasses()} ${className}`}>
      {validChildren.slice(0, MAX_COUNT).map((child: any, index: number) => (
        <div
          key={child.key || index}
          className={getChildPositionClasses(index)}
        >
          {cloneElement(child as React.ReactElement, {
            size: childSize,
            isGrouping: true,
            className: "w-full h-full ring-0",
          })}
        </div>
      ))}
    </div>
  );
};
