import dayjs from "dayjs";

/**
 * 주어진 날짜가 어제인지 확인
 * @param targetDate - 확인할 날짜
 * @returns 어제인지 여부
 */

export const isYesterday = (targetDate: string | Date | number): boolean => {
  const target = dayjs(targetDate);
  const yesterday = dayjs().subtract(1, "day").startOf("day");
  const today = dayjs().startOf("day");

  return target.isAfter(yesterday) && target.isBefore(today);
};

/**
 * 날짜 포맷팅
 * @param date - 포맷팅할 날짜
 * @returns 포맷팅된 날짜 : 어제, 오늘[a HH:mm], 날짜[YYYY-MM-DD]
 */

export const formatDate = (date: string | Date | number): string => {
  const target = dayjs(date);

  if (isYesterday(date)) {
    return "어제";
  }

  const daysDiff = dayjs().diff(target, "day");

  if (daysDiff < 1) {
    return target.format("a HH:mm");
  }

  return target.format("YYYY-MM-DD");
};
