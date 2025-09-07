import { CoreMessageType } from "./FileMessage";

import BubbleMessage from "./BubbleMessage";
import CombinationMessage from "./CombinationMessage";
import FileMessage from "./FileMessage";
import ReplyMessage from "./ReplyMessage";
import TextMessage from "./TextMessage";
import { parseData } from "@/entities/message/lib";
import {
  MessageCustomType,
  MessageInDataType,
  MessageType,
} from "@/entities/message";

export default function MessageContent({
  messageContent,
}: {
  messageContent: CoreMessageType;
}) {
  const { message, messageType, customType, data, parentMessage } =
    messageContent;
  const { type: messageInDataType } = parseData(data);

  if (parentMessage) {
    return <ReplyMessage messageContent={messageContent} />;
  }

  if (
    messageType === MessageType.FILE ||
    messageInDataType === MessageInDataType.MESSAGE_FILE
  ) {
    return <FileMessage messageContent={messageContent} />;
  }

  if (customType === MessageCustomType.BEFAMILY) {
    if (messageInDataType === MessageInDataType.MESSAGE_BUBBLE) {
      return <BubbleMessage messageContent={messageContent} />;
    }

    const isCombinationMessage =
      [
        MessageInDataType.MESSAGE_CONTACT,
        MessageInDataType.MESSAGE_AFFILIATE,
        MessageInDataType.MESSAGE_FAMILY_EVENT,
        MessageInDataType.MESSAGE_CALENDAR_EVENT,
        MessageInDataType.MESSAGE_DDAY_EVENT,
      ].indexOf(messageInDataType) !== -1;

    if (isCombinationMessage) {
      return <CombinationMessage messageContent={messageContent} />;
    }
  }

  return <TextMessage message={message} />;
}
