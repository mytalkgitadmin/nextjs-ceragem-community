import React from "react";
import { useAuth } from "@/domains/auth";
import { parseJson } from "@/shared/utils";
import { UIMessageType, getUIMessageType } from "@/domains/message";
import styles from "./ChannelPreview.LastMessage.module.css";
import { BaseMessage } from "@sendbird/chat/message";

export interface ChannelPreviewLastMessageProps {
  lastMessage: BaseMessage;
  className?: string;
}

const IMG_SRC = {
  photo: "/assets/images/message/List_Photo_Solid.png",
  video: "/assets/images/message/List_Video_Solid.png",
  file: "/assets/images/message/List_File_Solid.png",
  emoji: "/assets/images/message/List_Emoji_Solid.png",
  phone: "/assets/images/message/List_PhoneBook_Solid.png",
};

export const ChannelPreviewLastMessage = ({
  lastMessage,
  className,
}: ChannelPreviewLastMessageProps) => {
  const { sendBirdId } = useAuth();

  const uiType = getUIMessageType(sendBirdId, lastMessage);

  switch (uiType) {
    case UIMessageType.DELETED: {
      return (
        <span className={styles.chat_list_content_message}>
          메시지가 삭제되었습니다.
        </span>
      );
    }
    case UIMessageType.IMAGE: {
      return (
        <span className={styles.chat_list_content_message}>
          <img src={IMG_SRC.photo} className={styles.message_img} />
          사진 메시지
        </span>
      );
    }

    case UIMessageType.VIDEO: {
      return (
        <span className={styles.chat_list_content_message}>
          <img src={IMG_SRC.video} className={styles.message_img} />
          비디오 메시지
        </span>
      );
    }
    case UIMessageType.FILE: {
      const data = parseJson(lastMessage.data || "");
      const fileName = data?.resource?.[0]?.originalFileName;
      return (
        <span className={styles.chat_list_content_message}>
          <img src={IMG_SRC.file} className={styles.message_img} />
          {fileName} 파일 메시지
        </span>
      );
    }
    case UIMessageType.CONTACT: {
      const data = parseJson(lastMessage.data || "");
      const contactName = data?.contact?.[0]?.name;
      return (
        <span className={styles.chat_list_content_message}>
          <img src={IMG_SRC.phone} className={styles.message_img} />
          {contactName} 연락처 메시지
        </span>
      );
    }

    case UIMessageType.BUBBLE:
    case UIMessageType.EVENT: {
      //TODO : 추후 구현 필요
      return (
        <span className={styles.chat_list_content_message}>
          [미구현 메시지]
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
