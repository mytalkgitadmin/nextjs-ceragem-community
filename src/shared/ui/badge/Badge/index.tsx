import React, { ElementType } from "react";

interface BadgeProps {
  count: number | string;
  className?: string;
  as?: ElementType;
}

export function Badge({ count, className, as: Tag = "span" }: BadgeProps) {
  const shouldHide =
    (typeof count === "number" && count <= 0) ||
    (typeof count === "string" && count.trim().length === 0);
  if (shouldHide) return null;
  return <Tag className={className}>{count}</Tag>;
}
