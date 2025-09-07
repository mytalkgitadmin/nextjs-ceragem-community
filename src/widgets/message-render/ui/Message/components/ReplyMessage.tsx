"use client";

import { CoreMessageType } from "./FileMessage";

import { Icons } from "@/shared/ui/icon";
import { useAuth } from "@/features/auth";
import { useGroupChannel } from "@sendbird/uikit-react/GroupChannel/context";
import { MessageInDataType } from "@/entities/message";
import { parseData } from "@/shared/lib/chat";
import { renderMessageContent } from "../utils/render-message-content";
import TextMessage from "./TextMessage";
import BubbleInner from "./BubbleInner";

import styles from "./ReplyMessage.module.scss";

export default function ReplyMessage({
  messageContent,
}: {
  messageContent: CoreMessageType;
}) {
  const { userId } = useAuth();

  const {
    actions: { scrollToMessage, setAnimatedMessageId },
  } = useGroupChannel();

  if (!messageContent) return;
  const { data, messageType, message, parentMessage, parentMessageId } =
    messageContent;

  if (!parentMessageId || !messageType || !parentMessage || !message) return;

  // @ts-expect-error - BaseMessage에 sender 속성이 런타임에는 존재함
  const isMyMessage = userId === parentMessage.sender.userId;
  let nickname = (
    <>
      {/* @ts-expect-error - BaseMessage에 sender 속성이 런타임에는 존재함 */}
      <strong>{parentMessage.sender?.nickname}</strong>(님)
    </>
  );
  if (isMyMessage) {
    nickname = <strong>나</strong>;
  }

  const handleScrollToMessage = () => {
    if (scrollToMessage && setAnimatedMessageId) {
      scrollToMessage(parentMessage.createdAt, parentMessage.messageId);
      setAnimatedMessageId(parentMessage.messageId);
    }
  };

  return (
    <>
      <div className={`reply ${styles.messageWrap}`}>
        <div className={styles.top}>
          <button
            type="button"
            className={styles.sender}
            onClick={handleScrollToMessage}
          >
            <span className={styles.right}>
              <span className={styles.nickname}>
                <Icons name="reply" />
                {nickname}에게 답장
              </span>

              <span className={styles.parent}>
                <span>{renderMessageContent(parentMessage, 50)}</span>
              </span>
            </span>
          </button>
        </div>

        <div className={styles.child}>
          {parseData(data).type === MessageInDataType.MESSAGE_BUBBLE ? (
            <BubbleInner messageContent={messageContent} />
          ) : (
            <TextMessage message={message} />
          )}
        </div>
      </div>
    </>
  );
}
