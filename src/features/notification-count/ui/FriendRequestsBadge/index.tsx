"use client";

import { memo, ElementType } from "react";
import { useFriendRequestCount } from "../../model/useUnreadCounts";
import { formatCount } from "@/shared/lib/format";
import styles from "./index.module.scss";

export interface FriendRequestBadgeProps {
  as?: ElementType;
  className?: string;
}

function FriendRequestBadgeBase({
  as: Tag = "div",
  className,
}: FriendRequestBadgeProps) {
  const count = useFriendRequestCount();
  if (count <= 0) return null;

  const display = formatCount(count);
  return <Tag className={`${styles.badge} ${className || ""}`}>{display}</Tag>;
}

export const FriendRequestBadge = memo(FriendRequestBadgeBase);
