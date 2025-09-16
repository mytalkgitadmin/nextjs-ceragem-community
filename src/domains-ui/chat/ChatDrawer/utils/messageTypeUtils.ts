import { BaseMessage, UserMessage, FileMessage, AdminMessage } from '@sendbird/chat/message';
import { MESSAGE_TYPES, MessageType, FILE_TYPE_MAPPING } from '../constants/messageTypes';

// 텍스트 길이 임계값 (2000자)
const LONG_TEXT_THRESHOLD = 2000;

/**
 * Sendbird 메시지에서 커스텀 메시지 타입을 추출
 */
export function getMessageType(message: BaseMessage): MessageType {
  // 관리자 메시지
  if (message.messageType === 'admin') {
    return MESSAGE_TYPES.ADMIN;
  }

  // 파일 메시지
  if (message.messageType === 'file' && message instanceof FileMessage) {
    return getFileMessageType(message.type, message.name);
  }

  // 사용자 메시지
  if (message.messageType === 'user' && message instanceof UserMessage) {
    // 커스텀 데이터에서 타입 확인
    if (message.data) {
      try {
        const customData = JSON.parse(message.data);
        if (customData.messageType) {
          return customData.messageType as MessageType;
        }
      } catch (error) {
        console.warn('메시지 커스텀 데이터 파싱 실패:', error);
      }
    }

    // 답장 메시지 확인
    if (message.parentMessage) {
      return MESSAGE_TYPES.REPLY;
    }

    // 텍스트 길이로 판단
    return message.message.length >= LONG_TEXT_THRESHOLD
      ? MESSAGE_TYPES.TEXT_LONG
      : MESSAGE_TYPES.TEXT;
  }

  // 기본값
  return MESSAGE_TYPES.TEXT;
}

/**
 * 파일 MIME 타입에 따른 메시지 타입 결정
 */
export function getFileMessageType(mimeType: string, fileName: string): MessageType {
  // MIME 타입으로 먼저 확인
  if (mimeType in FILE_TYPE_MAPPING) {
    return FILE_TYPE_MAPPING[mimeType as keyof typeof FILE_TYPE_MAPPING];
  }

  // 파일 확장자로 판단
  const extension = fileName.toLowerCase().split('.').pop();

  if (extension) {
    // 이미지 확장자
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp'].includes(extension)) {
      return MESSAGE_TYPES.IMAGE;
    }

    // 비디오 확장자
    if (['mp4', 'webm', 'ogg', 'avi', 'mov', 'wmv', 'flv'].includes(extension)) {
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
      return '텍스트';
    case MESSAGE_TYPES.TEXT_LONG:
      return '긴 텍스트';
    case MESSAGE_TYPES.FILE:
      return '파일';
    case MESSAGE_TYPES.IMAGE:
      return '이미지';
    case MESSAGE_TYPES.VIDEO:
      return '동영상';
    case MESSAGE_TYPES.CONTACT:
      return '연락처';
    case MESSAGE_TYPES.NOTICE:
      return '공지사항';
    case MESSAGE_TYPES.REPLY:
      return '답장';
    case MESSAGE_TYPES.ADMIN:
      return '시스템 메시지';
    default:
      return '메시지';
  }
}

/**
 * 메시지 타입별 아이콘 반환
 */
export function getMessageTypeIcon(messageType: MessageType): string {
  switch (messageType) {
    case MESSAGE_TYPES.TEXT:
    case MESSAGE_TYPES.TEXT_LONG:
      return '💬';
    case MESSAGE_TYPES.FILE:
      return '📎';
    case MESSAGE_TYPES.IMAGE:
      return '🖼️';
    case MESSAGE_TYPES.VIDEO:
      return '🎥';
    case MESSAGE_TYPES.CONTACT:
      return '👤';
    case MESSAGE_TYPES.NOTICE:
      return '📢';
    case MESSAGE_TYPES.REPLY:
      return '↩️';
    case MESSAGE_TYPES.ADMIN:
      return '⚙️';
    default:
      return '💬';
  }
}

/**
 * 메시지가 미디어 타입인지 확인
 */
export function isMediaMessage(messageType: MessageType): boolean {
  return [MESSAGE_TYPES.IMAGE, MESSAGE_TYPES.VIDEO].includes(messageType);
}

/**
 * 메시지가 파일 타입인지 확인
 */
export function isFileMessage(messageType: MessageType): boolean {
  return [MESSAGE_TYPES.FILE, MESSAGE_TYPES.IMAGE, MESSAGE_TYPES.VIDEO].includes(messageType);
}

/**
 * 메시지가 커스텀 타입인지 확인
 */
export function isCustomMessage(messageType: MessageType): boolean {
  return [MESSAGE_TYPES.CONTACT, MESSAGE_TYPES.NOTICE].includes(messageType);
}