import dayjs from "@/shared/lib/dayjs";
import { DATE_FORMATS } from "@/shared/lib/date";

export function formatChatListTime(timestamp: number): string {
  if (!timestamp) return "";
  const messageTime = dayjs(timestamp);
  const now = dayjs();
  const diffMinutes = now.diff(messageTime, "minute");
  const diffHours = now.diff(messageTime, "hour");
  const diffDays = now.diff(messageTime, "day");
  const diffYears = now.diff(messageTime, "year");
  if (diffMinutes < 1) return "방금";
  if (diffMinutes < 60) return `${diffMinutes}분 전`;
  if (diffHours < 24) return messageTime.format(DATE_FORMATS.TIME_12);
  if (diffDays === 1) return "어제";
  if (diffYears < 1) return messageTime.format(DATE_FORMATS.MONTH_DAY);
  return messageTime.format(DATE_FORMATS.DOT_SHORT);
}
