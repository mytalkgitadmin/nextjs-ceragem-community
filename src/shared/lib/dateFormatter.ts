import dayjs from 'dayjs';
import 'dayjs/locale/ko';
dayjs.locale('ko');

export const DATE_FORMATS = {
  // 기본 포맷들
  DEFAULT: 'M월 D일(ddd)', // 1월 1일(월)
  MONTH_DAY: 'M월 D일',
  YEAR_MONTH_DAY_WEEKDAY: 'YYYY년 MM월 DD일 (dd)',

  YEAR_MONTH_DAY: 'YYYY년 MM월 DD일',
  DOT_FULL: 'YYYY.MM.DD(ddd)',
  DOT_SHORT: 'YYYY. M. D.',
  DOT: 'YYYY.MM.DD',

  // 시간 포맷들
  TIME_12: 'a h:mm',
  TIME_24: 'HH:mm',
} as const;

/**
 * 기본 날짜 포맷팅 함수
 * @param timestamp - 타임스탬프 (숫자 또는 문자열)
 * @param format - dayjs 포맷 문자열
 * @returns 포맷된 날짜 문자열
 */
export const formatDate = (
  timestamp: number | string,
  format: string = DATE_FORMATS.DEFAULT,
): string => {
  if (!timestamp) return '';
  return dayjs(Number(timestamp)).format(format);
};

export const formatDotFull = (timestamp: number | string): string => {
  return formatDate(timestamp, DATE_FORMATS.DOT_FULL);
};

export const formatScheduleTime = (timestamp: number | string): string => {
  return formatDate(timestamp, DATE_FORMATS.TIME_24);
};

export const isUpdatedProfile = (timeStamp: number | string): boolean => {
  const now = new Date();

  return dayjs(now).diff(timeStamp, 'hour') < 24;
};
export const formatChatListTime = (timestamp: number): string => {
  if (!timestamp) return '';

  const messageTime = dayjs(timestamp);
  const now = dayjs();
  const diffMinutes = now.diff(messageTime, 'minute');
  const diffHours = now.diff(messageTime, 'hour');
  const diffDays = now.diff(messageTime, 'day');
  const diffYears = now.diff(messageTime, 'year');

  if (diffMinutes < 1) return '방금';
  if (diffMinutes < 60) return `${diffMinutes}분 전`;
  if (diffHours < 24) return messageTime.format(DATE_FORMATS.TIME_12);
  if (diffDays === 1) return '어제';
  if (diffYears < 1) return messageTime.format(DATE_FORMATS.MONTH_DAY);

  return messageTime.format(DATE_FORMATS.DOT_SHORT);
};
