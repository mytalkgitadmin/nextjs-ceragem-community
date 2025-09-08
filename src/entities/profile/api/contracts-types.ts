// 프로필 API 계약 타입
import type {
  ExtendedProfileEntity,
  ProfileImgEntity,
} from "../model/entity-types";

// 프로필 히스토리 응답
export interface ProfileHistory extends ProfileImgEntity {
  historyId: number | null;
}

// Sendbird 프로필 응답
export interface UserSendbirdProfileResponse {
  result: boolean;
  resultData: {
    accountProfile: {
      accountId: number;
      profile: ExtendedProfileEntity;
      editedName: string;
      syncName: string;
    };
  };
}

export interface UserProfileResponse {
  result: boolean;
  resultData: ProfileUserData;
}

// 프로필 사용자 데이터 응답
export interface ProfileUserData {
  accountProfile: {
    accountId: number;
    profile: ExtendedProfileEntity;
    editedName: string;
    syncName: string;
  };
  histories: ProfileHistory[];
}

// 프로필 상세 API (레거시, 추후 제거 예정)
export interface ProfileDetailApi {
  emoticonId: number;
  groupId: number;
  lastModifiedDate: string;
  profileId: number;
  profileKind: "normal" | "basic" | "emoticon";
  profileMessage: string;
  profileName: string;
  profileOriginal: string;
  profileSmallThumbnail: string;
  profileThumbnail: string;
}

// 계정 프로필 API (레거시, 추후 제거 예정)
export interface AccountProfileApi {
  accountId: number | string;
  editedName?: string;
  syncName?: string;
  profile: ProfileDetailApi;
}
