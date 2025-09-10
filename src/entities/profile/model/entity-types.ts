// 프로필 이미지 관련 타입
export interface ProfileImage {
  emoticonId: number;
  profileId: number;
  profileKind: "basic" | "normal" | "emoticon";
  profileOrigin: string;
  profileOriginal: string;
  profileThumbnail: string;
  profileSmallThumbnail: string;
}

// 기본 프로필 타입
export interface Profile extends ProfileImage {
  groupId?: number;
  profileName: string;
  profileMessage: string | null;
  lastModifiedDate: string | number | null;
}

// 개인정보 관련 타입
export interface PersonalInfo {
  nationalNumber: string;
  phoneNumber: string;
  birthday: string | undefined;
  solar: boolean | null;
  introduction: string;
  interests: string | null;
}

import type { RelationType } from "@/entities/friend";

// 편집 가능한 프로필 정보
export interface EditableProfile {
  editedName: string;
  syncName: string;
  relationType: RelationType;
}

// 사용자 프로필
export interface User extends Profile {
  groupId: number;
}

// 계정 프로필
export interface AccountProfile extends EditableProfile, PersonalInfo {
  profile: User;
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

// 그룹 사용자 프로필
export interface GroupUserProfile extends Profile, EditableProfile {}
