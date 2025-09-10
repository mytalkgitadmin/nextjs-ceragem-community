import { ApiResponse } from '@/shared/api';

export interface ProfileImg {
  profileKind: 'basic' | 'normal' | 'emoticon';
  profileId: number;
  emoticonId: number;
  profileOriginal: string;
  profileThumbnail: string;
  profileSmallThumbnail: string;
}

// 사용자 프로필 관련
export interface Profile extends ProfileImg {
  groupId?: number;
  profileName: string;
  profileMessage: string | null;
  lastModifiedDate: string | number | null;
}

interface MyAddProfile {
  editedName: string;
  syncName: string;
  relationType: RelationType;
}

interface UserProfileInfo {
  birthday: string | undefined;
  solar: boolean | null;
  introduction: string;
  interests: string | null;
}

export interface User extends Profile {
  groupId: number;
}

export interface Member extends MyAddProfile, UserProfileInfo {
  accountId: number;
  sendbirdId: string;
  accountType: 'USER' | string;
  accountStatus: 'NORMAL' | string;
  profile: Profile;
  participantType: 'MASTER' | string;
  joinDate: number;
}

// 계정 프로필
export interface AccountProfile extends MyAddProfile, UserProfileInfo {
  profile: User;

  accountId: number;
  email: string;
  isEmailCertification: boolean;
  status: 'NORMAL' | 'BAN' | string;
  phoneNumber: string;

  friendRelationMode: 'PUBLIC' | string;

  cardNumber: string;
  agreementMarketing: boolean;
  agreementModifiedDate: number;
}

// 그룹 사용자 프로필
export interface GroupUserProfile extends Profile, MyAddProfile {}

// 채널 응답
export type ResponseChannel = ApiResponse<Channel[]>;

export interface Channel {
  channelId: number;
  channelUrl: string;
  channelName: null;
  channelType: 'GROUP' | string;
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

import { BaseMessage } from '@sendbird/chat/message';
import { RelationType } from './enums';

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
