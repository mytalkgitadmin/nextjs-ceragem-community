import { BaseMessage } from "@sendbird/chat/message";
import { getUIMessageType, UIMessageType } from "@/domains/message";
import { useAuth } from "@/domains/auth";
import { MessageContentText } from "./Message.ContentText";
import { MessageContentFile } from "./Message.ContentFile";
import { MessageContentImage } from "./Message.ContentImage";
import { MessageContentVideo } from "./Message.ContentVideo";
import { MessageContentContact } from "./Massage.ContentContact";
import { MessageContentReply } from "./Message.ContentReply";

export interface MessageContentProps {
  message: BaseMessage;
}

export const MessageContent = ({ message }: MessageContentProps) => {
  const uiType = getUIMessageType(message);

  return (
    <>
      {uiType === UIMessageType.TEXT && (
        <MessageContentText message={message} />
      )}
      {uiType === UIMessageType.FILE && (
        <MessageContentFile message={message} />
      )}
      {uiType === UIMessageType.IMAGE && (
        <MessageContentImage message={message} />
      )}
      {uiType === UIMessageType.VIDEO && (
        <MessageContentVideo message={message} />
      )}
      {uiType === UIMessageType.CONTACT && (
        <MessageContentContact message={message} />
      )}
      {uiType === UIMessageType.REPLY && (
        <MessageContentReply message={message}>
          <MessageContentText message={message} />
        </MessageContentReply>
      )}
      {/* CHECK: 패밀리타운에서는 구현되어있음 */}
      {uiType === UIMessageType.BUBBLE && <>[미구현 메시지]</>}
      {uiType === UIMessageType.EVENT && <>[미구현 메시지]</>}
    </>
  );
};
