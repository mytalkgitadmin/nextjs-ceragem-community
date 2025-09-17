import React from "react";
import { Avatar as AntdAvatar } from "antd";
import type { AvatarProps as AntdAvatarProps } from "antd";

export interface AvatarProps extends AntdAvatarProps {
  src?: string;
  alt?: string;
  fallback?: React.ReactNode;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  fallback,
  className,
  ...props
}) => {
  return (
    <AntdAvatar src={src} alt={alt} className={className} {...props}>
      {fallback}
    </AntdAvatar>
  );
};

Avatar.displayName = "Avatar";
