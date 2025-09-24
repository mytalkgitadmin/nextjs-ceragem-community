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
 * 시간 포맷팅
 * @param at - 포맷팅할 시간
 * @returns 포맷팅된 시간 : a HH:mm
 */

export const formatTime = (timestamp: string | Date | number): string => {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "오후" : "오전";
  const displayHours = hours % 12 || 12;
  return `${ampm} ${displayHours}:${minutes.toString().padStart(2, "0")}`;
};

/**
 * 날짜 포맷팅
 * @param at - 포맷팅할 날짜
 * @returns 포맷팅된 날짜 : 어제, 오늘[a HH:mm], 날짜[YYYY-MM-DD]
 */

export const formatDate = (timestamp: string | Date | number): string => {
  const target = dayjs(timestamp);
  if (isYesterday(timestamp)) {
    return "어제";
  }
  const daysDiff = dayjs().diff(target, "day");
  if (daysDiff < 1) {
    return formatTime(timestamp);
  }
  return target.format("YYYY-MM-DD");
};

/**
 * 한국어 날짜 포맷팅
 * @param timestamp - 포맷팅할 날짜
 * @returns 포맷팅된 날짜 : 어제, 오늘, 날짜[YYYY년 MM월 DD일 (요일)]
 */

export const formatKoreanDate = (timestamp: string | Date | number): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const messageDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  const diffTime = today.getTime() - messageDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return "오늘";
  } else if (diffDays === 1) {
    return "어제";
  } else {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
    const dayName = dayNames[date.getDay()];

    return `${year}년 ${month}월 ${day}일 (${dayName})`;
  }
};
