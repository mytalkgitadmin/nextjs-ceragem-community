import React from "react";
import { useAuth } from "@/domains/auth";
import { getMessageType, getMessageData } from "@/domains/chat/utils";
import { MESSAGE_TYPES } from "@/domains/chat/constants";
import styles from "./components.module.css";

export interface ChannelPreviewMessageProps {
  channel: any;
  className?: string;
}

const IMG_SRC = {
  photo: "/assets/images/message/List_Photo_Solid.png",
  video: "/assets/images/message/List_Video_Solid.png",
  file: "/assets/images/message/List_File_Solid.png",
  emoji: "/assets/images/message/List_Emoji_Solid.png",
  phone: "/assets/images/message/List_PhoneBook_Solid.png",
};

export const ChannelPreviewMessage = ({
  channel,
  className,
}: ChannelPreviewMessageProps) => {
  const { sendBirdId } = useAuth();
  const lastMessage = channel?.lastMessage;

  console.log(lastMessage);

  if (!lastMessage) return null;

  const messageData = getMessageData(lastMessage);
  const deleteUserIds = messageData?.deleteUsers?.map(
    (user: any) => user.user_id
  );

  // 메시지가 내 화면에서 삭제처리 되었는지 확인
  if (deleteUserIds?.includes(sendBirdId))
    return (
      <span className={styles.chat_list_content_message}>
        메시지가 삭제되었습니다.
      </span>
    );

  const messageType = getMessageType(lastMessage);

  switch (messageType) {
    case MESSAGE_TYPES.IMAGE || MESSAGE_TYPES.IMAGES: {
      return (
        <span className={styles.chat_list_content_message}>
          <img src={IMG_SRC.photo} className={styles.message_img} />
          사진 메시지
        </span>
      );
    }

    case MESSAGE_TYPES.VIDEO: {
      return (
        <span className={styles.chat_list_content_message}>
          <img src={IMG_SRC.video} className={styles.message_img} />
          비디오 메시지
        </span>
      );
    }
    case MESSAGE_TYPES.FILE: {
      const fileName = messageData?.resource?.[0]?.originalFileName;
      return (
        <span className={styles.chat_list_content_message}>
          <img src={IMG_SRC.file} className={styles.message_img} />
          {fileName} 파일 메시지
        </span>
      );
    }
    case MESSAGE_TYPES.CONTACT: {
      const contactName = messageData?.contact?.[0]?.name;
      return (
        <span className={styles.chat_list_content_message}>
          <img src={IMG_SRC.phone} className={styles.message_img} />
          {contactName} 연락처 메시지
        </span>
      );
    }

    default:
      break;
  }

  return (
    <span className={styles.chat_list_content_message}>
      {lastMessage.message}
    </span>
  );
};
