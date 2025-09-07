import type { ProfileDTO } from "../api/dto-types";

// 프로필 엔티티 (DTO와 동일)
export type ProfileEntity = ProfileDTO;

// 프로필 이미지 엔티티
export interface ProfileImgEntity {
  profileKind: "basic" | "normal" | "emoticon";
  profileId: number;
  emoticonId: number;
  profileOriginal: string;
  profileThumbnail: string;
  profileSmallThumbnail: string;
}

// 확장된 프로필 엔티티
export interface ExtendedProfileEntity extends ProfileImgEntity {
  groupId?: number;
  profileName: string;
  profileMessage: string | null;
  lastModifiedDate: string | number | null;
}

// 계정 프로필 엔티티
export interface AccountProfileEntity {
  accountId: number;
  editedName: string;
  syncName: string;
  profile: ProfileEntity;
}
