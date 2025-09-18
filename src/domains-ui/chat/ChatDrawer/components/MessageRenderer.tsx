import { useMemo } from "react";
import { BaseMessage } from "@sendbird/chat/message";
import { getMessageType } from "../utils/messageTypeUtils";
import { MESSAGE_TYPES } from "../constants/messageTypes";
import {
  TextMessage,
  FileMessage,
  ContactMessage,
  NoticeMessage,
  ReplyMessage,
  AdminMessage,
} from "./messages";

interface MessageRendererProps {
  message: BaseMessage;
  isMine: boolean;
  senderName: string;
}

export function MessageRenderer({
  message,
  isMine,
  senderName,
}: MessageRendererProps) {
  const messageType = getMessageType(message);

  // 메시지 데이터 생성 (기본 구조) - 메모이제이션 적용
  const baseData = useMemo(
    () => ({
      timestamp: message.createdAt,
      senderId: message.sender?.userId || "",
      senderName: senderName,
      channelUrl: message.channelUrl,
    }),
    [message.createdAt, message.sender?.userId, senderName, message.channelUrl]
  );

  // 메시지 타입에 따른 컴포넌트 렌더링
  switch (messageType) {
    case MESSAGE_TYPES.TEXT:
    case MESSAGE_TYPES.TEXT_LONG: {
      const content =
        message.messageType === "user" ? (message as any).message : "";
      const textData = {
        ...baseData,
        messageType,
        content,
        isLongText: messageType === MESSAGE_TYPES.TEXT_LONG,
      };
      return <TextMessage data={textData} isMine={isMine} />;
    }

    case MESSAGE_TYPES.FILE:
    case MESSAGE_TYPES.IMAGE:
    case MESSAGE_TYPES.VIDEO: {
      if (message.messageType === "file") {
        const fileMessage = message as any;

        // message.data에서 커스텀 파일 정보 추출
        let customFileData = null;
        try {
          if (fileMessage.data) {
            customFileData = JSON.parse(fileMessage.data);
          }
        } catch (error) {
          console.warn("파일 데이터 파싱 실패:", error);
        }

        // 커스텀 데이터가 있고 resource 배열이 있는 경우
        if (customFileData?.resource?.length > 0) {
          const resource = customFileData.resource[0];
          const fileData = {
            ...baseData,
            messageType,
            fileUrl: resource.originalUrl || fileMessage.url || "",
            fileName: resource.originalFileName || fileMessage.name || "",
            fileSize: resource.originalFileSize || fileMessage.size || 0,
            mimeType:
              resource.fileType === "image"
                ? "image/jpeg"
                : resource.fileType === "video"
                  ? "video/mp4"
                  : fileMessage.type || "application/octet-stream",
            thumbnailUrl: resource.thumbUrl || fileMessage.thumbnails?.[0]?.url,
            resources: customFileData.resource, // 전체 리소스 배열 전달
          };
          return <FileMessage data={fileData} isMine={isMine} />;
        }

        // 기본 Sendbird 파일 메시지 처리
        const fileData = {
          ...baseData,
          messageType,
          fileUrl: fileMessage.url || "",
          fileName: fileMessage.name || "",
          fileSize: fileMessage.size || 0,
          mimeType: fileMessage.type || "",
          thumbnailUrl: fileMessage.thumbnails?.[0]?.url,
        };
        return <FileMessage data={fileData} isMine={isMine} />;
      }
      break;
    }

    case MESSAGE_TYPES.CONTACT: {
      // 커스텀 데이터에서 연락처 정보 추출
      let contactData = null;
      try {
        if (message.messageType === "user" && (message as any).data) {
          const customData = JSON.parse((message as any).data);
          contactData = customData.contact;
        }
      } catch (error) {
        console.warn("연락처 데이터 파싱 실패:", error);
      }

      if (contactData) {
        const data = {
          ...baseData,
          messageType: MESSAGE_TYPES.CONTACT,
          contact: contactData,
        };
        return <ContactMessage data={data} isMine={isMine} />;
      }
      break;
    }

    case MESSAGE_TYPES.NOTICE: {
      // 공지사항 데이터 추출
      let noticeData = null;
      try {
        if (message.messageType === "user" && (message as any).data) {
          const customData = JSON.parse((message as any).data);
          noticeData = customData.notice;
        }
      } catch (error) {
        console.warn("공지사항 데이터 파싱 실패:", error);
      }

      if (noticeData) {
        const data = {
          ...baseData,
          messageType: MESSAGE_TYPES.NOTICE,
          notice: noticeData,
        };
        return <NoticeMessage data={data} isMine={isMine} />;
      }
      break;
    }

    case MESSAGE_TYPES.REPLY: {
      if (message.messageType === "user") {
        const userMessage = message as any;
        const parentMessage = userMessage.parentMessage;
        if (parentMessage) {
          let parentMessageData = {};

          // parentMessage가 file 타입일 경우 data 파싱
          if (parentMessage.messageType === "file") {
            try {
              const parsedData = JSON.parse(parentMessage.data);
              parentMessageData = {
                resource: parsedData.resource[0],
                fileCount: parsedData.resource.length,
              };
            } catch (error) {
              console.warn("부모 메시지 데이터 파싱 실패:", error);
            }
          }

          const content = userMessage.message || "";
          const replyData = {
            ...baseData,
            messageType: MESSAGE_TYPES.REPLY,
            content,
            isLongText: content.length > 500,
            parentMessage: {
              messageId: parentMessage.messageId,
              content: parentMessage.message || "",
              senderName: parentMessage.sender?.nickname || "",
              messageType: getMessageType(parentMessage),
              ...(parentMessage.messageType === "file" && parentMessageData),
            },
          };
          return <ReplyMessage data={replyData} isMine={isMine} />;
        }
      }
      break;
    }

    case MESSAGE_TYPES.ADMIN: {
      if (message.messageType === "admin") {
        const adminMessage = message as any;
        const adminData = {
          ...baseData,
          messageType: MESSAGE_TYPES.ADMIN,
          content: adminMessage.message || "",
          adminAction: adminMessage.data
            ? {
                type: adminMessage.data.type,
                data: adminMessage.data,
              }
            : undefined,
        };
        return <AdminMessage data={adminData} />;
      }
      break;
    }

    default:
      break;
  }

  // 기본 폴백: 텍스트 메시지로 처리
  const fallbackContent =
    message.messageType === "user"
      ? (message as any).message || "메시지를 불러올 수 없습니다."
      : "지원하지 않는 메시지 타입입니다.";

  const fallbackData = {
    ...baseData,
    messageType: MESSAGE_TYPES.TEXT,
    content: fallbackContent,
    isLongText: false,
  };

  return <TextMessage data={fallbackData} isMine={isMine} />;
}
