// 채널 도메인 엔티티 타입
import type { ProfileEntity } from "@/entities/profile/model/entity-types";
import type { ChannelDTO, MemberDTO } from "../api/dto-types";

// 채널 엔티티
export type ChannelEntity = ChannelDTO;

// 멤버 엔티티
export type MemberEntity = MemberDTO;

// 채널 상태 관리
export interface ChannelState {
  currentChannelUrl: string | undefined;
  setCurrentChannelUrl: (url: string | undefined) => void;
}

// 읽지 않은 메시지 상태
export type UnreadCountState = {
  totalUnreadCount: number;
  setTotalUnreadCount: (count: number) => void;
};

// 메시지 관련 엔티티
export interface BaseMessageLite {
  messageId: number;
  createdAt: number;
  message?: string;
  data?: string;
  customType?: string;
  [key: string]: unknown;
}

export interface ExtendedBaseMessage extends BaseMessageLite {
  sender?: {
    nickname?: string;
    [key: string]: unknown;
  };
}

// 연락처 데이터
export interface ContactData {
  name: string;
  phone: string;
}

// 디데이 이벤트
export interface DDayEvent {
  subject: string;
  id: number;
  previewLabel: string;
  subjectDate: number;
}

// 캘린더 이벤트
export interface CalendarEvent {
  subject: string;
  isAllDay: boolean;
  recordStartDate: number;
  recordEndDate: number;
  recordId: number;
}
