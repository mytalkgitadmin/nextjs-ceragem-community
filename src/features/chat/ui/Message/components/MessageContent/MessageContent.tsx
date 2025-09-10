import { CoreMessageType } from "../FileMessage/FileMessage";

import { BubbleMessage } from "../BubbleMessage";
import { CombinationMessage } from "../CombinationMessage";
import { FileMessage } from "../FileMessage";
import { ReplyMessage } from "../ReplyMessage";
import { TextMessage } from "../TextMessage";
import { parseData } from "@/features/chat/lib";
import {
  MessageCustomType,
  MessageInDataType,
  MessageType,
} from "@/features/chat/model";

export default function MessageContent({
  messageContent,
}: {
  messageContent: CoreMessageType;
}) {
  const { message, messageType, customType, data, parentMessage } =
    messageContent;
  const { type: messageInDataType } = parseData(data as string);

  // 답장 메시지
  if (parentMessage) {
    return <ReplyMessage messageContent={messageContent} />;
  }

  // 파일 메시지
  if (
    messageType === MessageType.FILE ||
    messageInDataType === MessageInDataType.MESSAGE_FILE
  ) {
    return <FileMessage messageContent={messageContent} />;
  }

  // 커스텀 메시지
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

  // 기본 텍스트 메시지
  return <TextMessage message={message as string} />;
}
