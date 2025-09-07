import { parseData } from "@/entities/message/lib";
import { CoreMessageType } from "./FileMessage";

import ScheduleMessage from "./ScheduleMessage";
import ContactMessage from "./ContactMessage";

export default function CombinationMessage({
  messageContent,
}: {
  messageContent: CoreMessageType;
}) {
  if (!messageContent) return;
  const { data } = messageContent;

  const messageInData = parseData(data);

  switch (messageInData.type) {
    case "MESSAGE_CONTACT":
      return <ContactMessage contact={messageInData.contact[0]} />;
    case "MESSAGE_CALENDAR_EVENT":
      return <ScheduleMessage event={messageInData.event} type="CALENDAR" />;
    case "MESSAGE_DDAY_EVENT":
      return <ScheduleMessage event={messageInData.event} type="DDAY" />;
    default:
      return <>{messageContent.message}</>;
  }
}
