import React from "react";
import type { MessageContentProps } from "@/entities/message";
import { useGroupChannelContext } from "@sendbird/uikit-react/GroupChannel/context";

import { DATE_FORMATS, formatDate } from "@/shared/lib/date";
import { useAuth } from "@/features/auth";
import { checkEditMessage, decryptData } from "@/entities/message/lib";
import MessageAvatar from "./MessageAvatar";

import OgCard from "./OgCard";
import Reactions from "./Reactions";

import styles from "./MessageLayout.module.scss";

interface MessageLayoutProps {
  messageContent: MessageContentProps;
  children: React.ReactNode;
  className?: string;
}

export default function MessageLayout({
  messageContent,
  children,
  className,
}: MessageLayoutProps) {
  const { currentChannel } = useGroupChannelContext();
  const { userId } = useAuth();
  const isCalendar = false;
  if (!messageContent) {
    return <>{children}</>;
  }

  const { message: _messageContent, chainBottom, chainTop } = messageContent;
  const {
    message,
    // @ts-expect-error - BaseMessage에 sender 속성이 런타임에는 존재함
    sender: { userId: senderUserId, nickname },
    createdAt,
    reactions,
    ogMetaData,
  } = _messageContent;

  const unreadMemberCount =
    currentChannel.getUnreadMemberCount(_messageContent);

  const isMyMessage = senderUserId === userId;

  const { isEdit } = checkEditMessage(decryptData(message));

  return (
    <div
      className={`${styles.layout} 
      ${isMyMessage ? styles.my_message : styles.receiver_message} 
      ${!chainTop ? styles.first : ""}
      ${className ? className : ""}
      ${!isMyMessage && chainTop ? styles.onlyMessage : ""}`}
    >
      {/* 프로필 이미지 + 이름 */}
      {!isMyMessage && !chainTop && <MessageAvatar sendbirdId={senderUserId} />}

      <div className={styles.container}>
        {!isMyMessage && !chainTop && (
          <button type="button" className={styles.nickname}>
            {nickname}
          </button>
        )}
        {/* 메시지 */}
        <div className={`${styles.contents} `}>{children}</div>

        <div className={styles.date_unread}>
          {/* 읽음여부 */}
          {unreadMemberCount !== 0 && (
            <div className={styles.unRead}>
              <span>{unreadMemberCount}</span>
            </div>
          )}

          {/* 시간 */}
          {!chainBottom && (
            <span className={styles.message_date}>
              {createdAt ? formatDate(createdAt, DATE_FORMATS.TIME_12) : ""}
            </span>
          )}
        </div>
        {(reactions.length > 0 || ogMetaData) && (
          <div className={styles.mid}>
            {ogMetaData && <OgCard ogMetaData={ogMetaData} />}
            {reactions.length > 0 && <Reactions reactions={reactions} />}
          </div>
        )}

        {(isEdit || isCalendar) && (
          <div className={styles.bottom}>
            {isEdit && <p className={styles.edit}>편집됨</p>}
          </div>
        )}
      </div>
    </div>
  );
}
