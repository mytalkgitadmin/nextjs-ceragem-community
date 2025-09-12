"use client";

export interface UnreadBadgeProps {
  count: number;
  maxCount?: number;
  showZero?: boolean;
  className?: string;
}

export function UnreadBadge({
  count,
  maxCount = 99,
  showZero = false,
  className = "",
}: UnreadBadgeProps) {
  if (!showZero && count === 0) {
    return null;
  }

  const displayCount = count > maxCount ? `${maxCount}+` : count.toString();

  return (
    <span
      className={`
        inline-flex items-center justify-center
        min-w-[20px] h-5 px-1.5
        bg-red-500 text-white text-xs font-medium
        rounded-full
        ${className}
      `}
    >
      {displayCount}
    </span>
  );
}
