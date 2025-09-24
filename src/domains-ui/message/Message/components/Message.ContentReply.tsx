import { BaseMessage } from "@sendbird/chat/message";
import styles from "./Message.ContentReply.module.css";
import {
  isLongTextMessage,
  getReplyMessageThumbUrl,
  getReplyMessageContents,
} from "@/domains/message";
import { useGroupChannelContext } from "@sendbird/uikit-react/GroupChannel/context";
import { Reply } from "lucide-react";
import { useAuth } from "@/domains/auth/hooks";
import { useMessageSenderProfile } from "@/domains/profile";

export interface MessageContentReplyProps {
  message: BaseMessage;
  children: React.ReactNode;
}

export const MessageContentReply = ({
  message,
  children,
}: MessageContentReplyProps) => {
  const groupChannelContext = useGroupChannelContext();
  const { sendBirdId } = useAuth();
  const { nickname: toName } = useMessageSenderProfile(message.parentMessage);

  const toMe = sendBirdId === message.parentMessage?.sender?.userId;
  const isMyMessage = sendBirdId === message.sender?.userId;

  const isLongText = isLongTextMessage(message);
  const thumbUrl = getReplyMessageThumbUrl(message);
  const contents = getReplyMessageContents(message);

  const handleClick = () => {
    if (
      !!groupChannelContext?.scrollToMessage ||
      !!groupChannelContext?.setAnimatedMessageId
    ) {
      groupChannelContext.scrollToMessage(message.createdAt, message.messageId);
      groupChannelContext.setAnimatedMessageId(message.messageId);
      // channelContext.setHighLightedMessageId(message.messageId)
    }
  };

  return (
    <>
      <div
        className={`${styles.chat_message_replay_wrap} ${
          isLongText ? styles.long : styles.short
        }`}
        onClick={handleClick}
      >
        {thumbUrl ? (
          <div className={styles.chat_message_replay_file}>
            <img width={40} height={40} src={thumbUrl} alt="replay_img" />
          </div>
        ) : null}
        <div>
          <div className={styles.flexWrap}>
            <Reply
              className={styles.icon}
              color={isMyMessage ? "#fff" : "#000"}
              size={24}
            />

            {toMe ? "나에게 답장" : `${toName}(님)에게 답장`}
          </div>
          <div
            className={styles.chat_message_replay_contents}
            style={{
              color: isMyMessage ? "rgb(186, 169, 247)" : "#afadad",
            }}
          >
            {contents}
          </div>
        </div>
      </div>
      {children}
    </>
  );
};
