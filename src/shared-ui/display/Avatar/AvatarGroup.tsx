import React from "react";
import { Avatar as AntdAvatar } from "antd";
import type { AvatarProps } from "antd";

export interface AvatarGroupProps {
  maxCount?: number;
  size?: AvatarProps["size"];
  prefixCls?: string;
  className?: string;
  children: React.ReactNode;
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  maxCount = 4,
  size = 44,
  prefixCls,
  className,
  children,
  ...props
}) => {
  return (
    <AntdAvatar.Group
      max={{ count: maxCount }}
      size={size}
      prefixCls={prefixCls}
      className={className}
      {...props}
    >
      {children}
    </AntdAvatar.Group>
  );
};

AvatarGroup.displayName = "AvatarGroup";
