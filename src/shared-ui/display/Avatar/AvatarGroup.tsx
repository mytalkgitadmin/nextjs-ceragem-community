import React, { Children, cloneElement, isValidElement } from "react";
import { Avatar } from "./Avatar";

export interface AvatarGroupProps {
  children: React.ReactNode;
  className?: string;
  isActive?: boolean;
  size?: number;
}

const MAX_COUNT = 4;

// AvatarGroup 컴포넌트
export const AvatarGroup = ({
  children,
  size = 56,
  className = "",
}: AvatarGroupProps) => {
  const validChildren = Children.toArray(children).filter(
    (child) => isValidElement(child) && child.type === Avatar
  );

  const memberCount = Math.min(validChildren.length, MAX_COUNT);
  const containerSize = `${size * 0.625 * 0.1}rem`;

  if (memberCount === 0) {
    return null;
  }

  const getLayoutClasses = () => {
    const baseClasses = `relative flex-shrink-0 bg-white`;

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

  const getChildSize = () => {
    switch (memberCount) {
      case 1:
        return size;
      case 2:
        return 36;
      case 3:
        return 32;
      case 4:
        return 30;
      default:
        return size;
    }
  };

  const containerStyle = {
    width: containerSize,
    height: containerSize,
  };

  const childSize = getChildSize();

  if (memberCount === 1) {
    const child = validChildren[0];
    return (
      <div
        className={`${getLayoutClasses()} ${className}`}
        style={containerStyle}
      >
        {cloneElement(child as React.ReactElement, {
          size: childSize,
          isGroupMember: true,
          className: "w-full h-full ring-0",
        })}
      </div>
    );
  }

  return (
    <div
      className={`${getLayoutClasses()} ${className}`}
      style={containerStyle}
    >
      {validChildren.slice(0, MAX_COUNT).map((child: any, index: number) => (
        <div
          key={child.key || index}
          className={getChildPositionClasses(index)}
          style={{
            width: `${childSize * 0.625 * 0.1}rem`,
            height: `${childSize * 0.625 * 0.1}rem`,
          }}
        >
          {cloneElement(child as React.ReactElement, {
            size: childSize,
            isGroupMember: true,
            className: "w-full h-full ring-0",
          })}
        </div>
      ))}
    </div>
  );
};
