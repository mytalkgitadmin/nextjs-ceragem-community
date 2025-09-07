import { Icons } from "@/shared/ui/icon";
import { formatDotFull, formatScheduleTime } from "@/shared/lib/date";
import { CalendarEvent, DDayEvent } from "index";

import styles from "./CombinationMessage.module.scss";

interface ScheduleMessageProps {
  event: DDayEvent | CalendarEvent;
  type: "DDAY" | "CALENDAR";
}

const SCHEDULE_TYPE_LABELS = {
  DDAY: "디데이",
  CALENDAR: "캘린더",
} as const;

export default function ScheduleMessage({ event, type }: ScheduleMessageProps) {
  if (!event) return;

  const isDDayEvent = (
    event: DDayEvent | CalendarEvent
  ): event is DDayEvent => {
    return "previewLabel" in event && "subjectDate" in event;
  };

  const isCalendarEvent = (
    event: DDayEvent | CalendarEvent
  ): event is CalendarEvent => {
    return (
      "recordStartDate" in event &&
      "recordEndDate" in event &&
      "isAllDay" in event
    );
  };

  const formatPreviewLabel = (label: string): string => {
    if (label.toLowerCase().includes("d-day")) {
      return "D-day";
    }
    const numberMatch = label.match(/(\d+)/);
    if (!numberMatch) {
      return label;
    }
    const number = numberMatch[1];
    if (label.includes("전")) {
      return `D-${number}`;
    }
    if (label.includes("후") || /^\d+일$/.test(label)) {
      return `D+${number}`;
    }
    return label;
  };

  const getEventData = () => {
    if (type === "DDAY" && isDDayEvent(event)) {
      return {
        titlePrefix: (
          <p className={styles.prefix}>
            {formatPreviewLabel(event.previewLabel)}
          </p>
        ),
        dateText: formatDotFull(event.subjectDate),
        timeText: null as string | null,
      };
    }

    if (type === "CALENDAR" && isCalendarEvent(event)) {
      const timeText = event.isAllDay
        ? "하루종일"
        : `${formatScheduleTime(event.recordStartDate)} ~ ${formatScheduleTime(
            event.recordEndDate
          )}`;

      const startDay = formatDotFull(event.recordStartDate);
      const endDay = formatDotFull(event.recordEndDate);
      return {
        titlePrefix: null as JSX.Element | null,
        dateText: startDay === endDay ? startDay : `${startDay} ~ ${endDay}`,
        timeText,
      };
    }

    return {
      titlePrefix: null as JSX.Element | null,
      dateText: "",
      timeText: null as string | null,
    };
  };

  const { titlePrefix, dateText, timeText } = getEventData();

  return (
    <div className={styles.scheduleWrap}>
      <div className={styles.top}>
        <div className={styles.titleWrap}>
          {titlePrefix}
          <span className={styles.title}>{event.subject}</span>
        </div>
      </div>

      <p className={styles.time}>
        {dateText}
        {timeText && <span>{timeText}</span>}
      </p>

      <button type="button" className={styles.button}>
        <Icons name={type.toLowerCase()} /> 내 {SCHEDULE_TYPE_LABELS[type]}에
        등록
      </button>
    </div>
  );
}
