// ⚠️  DEPRECATED: 이 파일의 타입들은 entities로 이동되었습니다.
// 새로운 import 경로를 사용해주세요:
// - Profile 관련: @/entities/profile
// - Member: @/entities/chat
// - RelationType: @/entities/friend

import { ApiResponse } from "@/shared/api";

// 하위 호환성을 위한 재export (단계적 마이그레이션용)
export type {
  Profile,
  User,
  AccountProfile,
  GroupUserProfile,
  ProfileImage,
  EditableProfile,
  PersonalInfo,
} from "@/entities/profile";

export type { Member } from "@/entities/chat";
export type { RelationType } from "@/entities/friend";

// 채널 응답
export type ResponseChannel = ApiResponse<Channel[]>;

export interface Channel {
  channelId: number;
  channelUrl: string;
  channelName: null;
  channelType: "GROUP" | string;
  createdDate: number;
  hasTimer: boolean;
  timerSecond: null;
  lastModifiedDate: null;
  isAdminChannel: number;
  // exitLogs: [];
  isChatEncrypted: boolean;

  members: Member[];
}

export interface ChannelState {
  currentChannelUrl: string | undefined;
  setCurrentChannelUrl: (url: string | undefined) => void;
}

import { BaseMessage } from "@sendbird/chat/message";

export type UnreadCountState = {
  totalUnreadCount: number;
  setTotalUnreadCount: (count: number) => void;
};

// 타입 확장
export interface ExtendedBaseMessage extends BaseMessage {
  sender?: {
    nickname?: string;
    [key: string]: unknown;
  };
}

export interface ContactData {
  name: string;
  phone: string;
}

export interface DDayEvent {
  subject: string;
  id: number;
  previewLabel: string;
  subjectDate: number;
}

export interface CalendarEvent {
  subject: string;
  isAllDay: boolean;
  recordStartDate: number;
  recordEndDate: number;
  recordId: number;
}

// 파일 업로드
export type ResponseFileUploadAcceptList = ApiResponse<FileUploadAcceptList>;

export interface FileUploadAcceptList {
  accept: string;
  enabledImage: string[];
  enabledVideo: string[];
}
