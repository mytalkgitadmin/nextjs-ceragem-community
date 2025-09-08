"use client";

import { memo, ElementType } from "react";
import { useUnreadMessageCount } from "../../model/useUnreadCounts";
import { formatCount } from "@/shared/lib/format";
import styles from "./index.module.scss";

export interface UnreadMessageBadgeProps {
  as?: ElementType;
  className?: string;
}

function UnreadMessageBadgeBase({
  as: Tag = "div",
  className,
}: UnreadMessageBadgeProps) {
  const count = useUnreadMessageCount();
  if (count <= 0) return null;

  const display = formatCount(count);
  return <Tag className={`${styles.badge} ${className || ""}`}>{display}</Tag>;
}

export const UnreadMessageBadge = memo(UnreadMessageBadgeBase);
