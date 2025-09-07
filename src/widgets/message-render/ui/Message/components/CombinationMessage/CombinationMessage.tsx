import { parseData } from "@/entities/message/lib";
import { CoreMessageType } from "../FileMessage/FileMessage";

import { ScheduleMessage } from "./ScheduleMessage";
import { ContactMessage } from "./ContactMessage";

export default function CombinationMessage({
  messageContent,
}: {
  messageContent: CoreMessageType;
}) {
  if (!messageContent) return;
  const { data } = messageContent;

  const messageInData = parseData(data);

  switch (messageInData.type) {
    // 연락처
    case "MESSAGE_CONTACT":
      return <ContactMessage contact={messageInData.contact[0]} />;

    // 캘린더
    case "MESSAGE_CALENDAR_EVENT":
      return <ScheduleMessage event={messageInData.event} type="CALENDAR" />;

    // 디데이
    case "MESSAGE_DDAY_EVENT":
      return <ScheduleMessage event={messageInData.event} type="DDAY" />;
    default:
      return <>{messageContent.message}</>;
  }
}
