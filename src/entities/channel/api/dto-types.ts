// 채널 API DTO 타입
import type { ProfileDTO } from "@/entities/profile/api/dto-types";

// 관계 타입 열거형
export type RelationType = "ME" | "FRIEND" | "FAMILY" | string;

// 추가 프로필 정보
export interface MyAddProfileDTO {
  editedName: string;
  syncName: string;
  relationType: RelationType;
}

// 사용자 프로필 정보
export interface UserProfileInfoDTO {
  birthday: string | undefined;
  solar: boolean | null;
  introduction: string;
  interests: string | null;
}

// 사용자 DTO
export interface UserDTO extends ProfileDTO {
  groupId: number;
}

// 멤버 DTO
export interface MemberDTO extends MyAddProfileDTO, UserProfileInfoDTO {
  accountId: number;
  sendbirdId: string;
  accountType: "USER" | string;
  accountStatus: "NORMAL" | string;
  profile: ProfileDTO;
  participantType: "MASTER" | string;
  joinDate: number;
}

// 계정 프로필 DTO
export interface AccountProfileDTO extends MyAddProfileDTO, UserProfileInfoDTO {
  profile: UserDTO;
  accountId: number;
  email: string;
  isEmailCertification: boolean;
  status: "NORMAL" | "BAN" | string;
  phoneNumber: string;
  friendRelationMode: "PUBLIC" | string;
  cardNumber: string;
  agreementMarketing: boolean;
  agreementModifiedDate: number;
}

// 그룹 사용자 프로필 DTO
export interface GroupUserProfileDTO extends ProfileDTO, MyAddProfileDTO {}

// 채널 DTO
export interface ChannelDTO {
  channelId: number;
  channelUrl: string;
  channelName: null;
  channelType: "GROUP" | string;
  createdDate: number;
  hasTimer: boolean;
  timerSecond: null;
  lastModifiedDate: null;
  isAdminChannel: number;
  isChatEncrypted: boolean;
  members: MemberDTO[];
}
