import { MessageType } from "../constants/messageTypes";
import { BaseMessage } from "@sendbird/chat/message";

// 기본 커스텀 메시지 인터페이스
export interface CustomMessageData {
  messageType: MessageType;
  timestamp: number;
  senderId: string;
  senderName: string;
  channelUrl: string;
}

// 텍스트 메시지 데이터
export interface TextMessageData extends CustomMessageData {
  messageType: "text" | "text_long";
  content: string;
  isLongText: boolean; // 500자 이상 여부
}

// 파일 메시지 데이터
export interface FileMessageData extends CustomMessageData {
  messageType: "file" | "image" | "video";
  fileUrl: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  thumbnailUrl?: string; // 이미지/비디오용
  duration?: number; // 비디오용 (초 단위)
  resources?: Array<{
    originalUrl: string;
    originalFileName: string;
    originalFileSize: number;
    fileType: string;
    thumbUrl?: string;
  }>; // 이미지 그룹용 리소스 배열
}

// 연락처 메시지 데이터
export interface ContactMessageData extends CustomMessageData {
  messageType: "contact";
  contact: {
    name: string;
    phoneNumber: string;
    email?: string;
    organization?: string;
    avatar?: string;
  };
}

// 공지사항 메시지 데이터
export interface NoticeMessageData extends CustomMessageData {
  messageType: "notice";
  notice: {
    title: string;
    content: string;
    priority: "low" | "medium" | "high";
    expiresAt?: number; // 만료 시간 (timestamp)
    attachments?: Array<{
      name: string;
      url: string;
      size: number;
    }>;
  };
}

// 답글 메시지 데이터
export interface ReplyMessageData extends CustomMessageData {
  messageType: "reply";
  content: string;
  isLongText?: boolean; // 긴 텍스트 여부
  parentMessage: {
    messageId: string;
    content: string;
    sendBirdId: string;
    senderName: string;
    messageType: MessageType;
    // 파일 메시지인 경우 추가 속성
    resource?: {
      originalUrl: string;
      originalFileName: string;
      originalFileSize: number;
      fileType: string;
      thumbUrl?: string;
    };
    fileCount?: number;
  };
}

// 관리자 메시지 데이터
export interface AdminMessageData extends CustomMessageData {
  messageType: "admin";
  content: string;
  adminAction?: {
    type: "user_join" | "user_leave" | "channel_update" | "announcement";
    data?: Record<string, any>;
  };
}

// 통합 메시지 데이터 타입
export type CustomMessage =
  | TextMessageData
  | FileMessageData
  | ContactMessageData
  | NoticeMessageData
  | ReplyMessageData
  | AdminMessageData;

// Sendbird 메시지와 커스텀 메시지 통합 타입
export interface EnhancedMessage extends BaseMessage {
  customData?: CustomMessage;
  messageTypeEnum: MessageType;
}
