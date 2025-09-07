import dayjs from "./dayjs";

export const DATE_FORMATS = {
  // 기본 포맷들
  DEFAULT: "M월 D일(ddd)", // 1월 1일(월)
  MONTH_DAY: "M월 D일",
  YEAR_MONTH_DAY_WEEKDAY: "YYYY년 MM월 DD일 (dd)",

  YEAR_MONTH_DAY: "YYYY년 MM월 DD일",
  DOT_FULL: "YYYY.MM.DD(ddd)",
  DOT_SHORT: "YYYY. M. D.",
  DOT: "YYYY.MM.DD",

  // 시간 포맷들
  TIME_12: "a h:mm",
  TIME_24: "HH:mm",
} as const;

/**
 * 기본 날짜 포맷팅 함수
 * @param timestamp - 타임스탬프 (숫자 또는 문자열)
 * @param format - dayjs 포맷 문자열
 * @returns 포맷된 날짜 문자열
 */
export const formatDate = (
  timestamp: number | string,
  format: string = DATE_FORMATS.DEFAULT
): string => {
  if (!timestamp) return "";
  return dayjs(Number(timestamp)).format(format);
};

export const formatDotFull = (timestamp: number | string): string => {
  return formatDate(timestamp, DATE_FORMATS.DOT_FULL);
};

export const formatScheduleTime = (timestamp: number | string): string => {
  return formatDate(timestamp, DATE_FORMATS.TIME_24);
};
