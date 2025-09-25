import { BaseMessage } from "@sendbird/chat/message";
import {
  MESSAGE_TYPES,
  MessageType,
  FILE_TYPE_MAPPING,
} from "../constants/messageTypes";

// 텍스트 길이 임계값 (500자)
const LONG_TEXT_THRESHOLD = 500;

/**
 * Sendbird 메시지에서 커스텀 메시지 타입을 추출
 */
export function getMessageType(message: BaseMessage): MessageType {
  // 관리자 메시지
  if (message.messageType === "admin") {
    return MESSAGE_TYPES.ADMIN;
  }

  // 파일 메시지
  if (message.messageType === "file") {
    // 커스텀 데이터 확인
    try {
      if ((message as any).data) {
        const customData = JSON.parse((message as any).data);
        if (customData?.resource?.[0]?.fileType) {
          const fileType = customData.resource[0].fileType;
          if (fileType === "image") {
            if (customData.resource.length > 1) {
              return MESSAGE_TYPES.IMAGES;
            } else {
              return MESSAGE_TYPES.IMAGE;
            }
          }
          if (fileType === "video") return MESSAGE_TYPES.VIDEO;
          return MESSAGE_TYPES.FILE;
        }
      }
    } catch (error) {
      console.warn("파일 타입 감지 중 데이터 파싱 실패:", error);
    }

    // 기본 Sendbird 파일 타입 감지
    return getFileMessageType((message as any).type, (message as any).name);
  }

  // 사용자 메시지
  if (message.messageType === "user") {
    // 커스텀 데이터에서 타입 확인
    if (message.data) {
      try {
        const customData = JSON.parse(message.data);
        if (customData.messageType) {
          return customData.messageType as MessageType;
        }
      } catch (error) {
        console.warn("메시지 커스텀 데이터 파싱 실패:", error);
      }
    }

    // 답장 메시지 확인
    if ((message as any).parentMessage) {
      return MESSAGE_TYPES.REPLY;
    }

    // 텍스트 길이로 판단
    const messageText = (message as any).message || "";
    return messageText.length >= LONG_TEXT_THRESHOLD
      ? MESSAGE_TYPES.TEXT_LONG
      : MESSAGE_TYPES.TEXT;
  }

  // 기본값
  return MESSAGE_TYPES.TEXT;
}

/**
 * 파일 MIME 타입에 따른 메시지 타입 결정
 */
export function getFileMessageType(
  mimeType: string,
  fileName: string
): MessageType {
  // MIME 타입으로 먼저 확인
  if (mimeType in FILE_TYPE_MAPPING) {
    return FILE_TYPE_MAPPING[mimeType as keyof typeof FILE_TYPE_MAPPING];
  }

  // 파일 확장자로 판단
  const extension = fileName.toLowerCase().split(".").pop();

  if (extension) {
    // 이미지 확장자
    if (["jpg", "jpeg", "png", "gif", "webp", "bmp"].includes(extension)) {
      return MESSAGE_TYPES.IMAGE;
    }

    // 비디오 확장자
    if (
      ["mp4", "webm", "ogg", "avi", "mov", "wmv", "flv"].includes(extension)
    ) {
      return MESSAGE_TYPES.VIDEO;
    }
  }

  // 기본 파일
  return MESSAGE_TYPES.FILE;
}

/**
 * 메시지 타입에 따른 표시 텍스트 반환
 */
export function getMessageTypeDisplayText(messageType: MessageType): string {
  switch (messageType) {
    case MESSAGE_TYPES.TEXT:
      return "텍스트";
    case MESSAGE_TYPES.TEXT_LONG:
      return "긴 텍스트";
    case MESSAGE_TYPES.FILE:
      return "파일";
    case MESSAGE_TYPES.IMAGE:
      return "이미지";
    case MESSAGE_TYPES.VIDEO:
      return "동영상";
    case MESSAGE_TYPES.CONTACT:
      return "연락처";
    case MESSAGE_TYPES.NOTICE:
      return "공지사항";
    case MESSAGE_TYPES.REPLY:
      return "답장";
    case MESSAGE_TYPES.ADMIN:
      return "시스템 메시지";
    default:
      return "메시지";
  }
}

/**
 * 메시지가 미디어 타입인지 확인
 */
export function isMediaMessage(messageType: MessageType): boolean {
  return (
    messageType === MESSAGE_TYPES.IMAGE || messageType === MESSAGE_TYPES.VIDEO
  );
}

/**
 * 메시지가 파일 타입인지 확인
 */
export function isFileMessage(messageType: MessageType): boolean {
  return (
    messageType === MESSAGE_TYPES.FILE ||
    messageType === MESSAGE_TYPES.IMAGE ||
    messageType === MESSAGE_TYPES.VIDEO
  );
}

/**
 * 메시지가 커스텀 타입인지 확인
 */
export function isCustomMessage(messageType: MessageType): boolean {
  return (
    messageType === MESSAGE_TYPES.CONTACT ||
    messageType === MESSAGE_TYPES.NOTICE
  );
}
