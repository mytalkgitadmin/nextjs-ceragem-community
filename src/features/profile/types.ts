import { AccountProfile } from '../chat/model';
import { History } from '../viewer/types';

export interface UserSendbirdProfileResponse {
  result: boolean;
  resultData: {
    accountProfile: AccountProfile;
  };
}

export interface UserProfileResponse {
  result: boolean;
  resultData: ProfileUserData;
}

export interface ProfileUserData {
  accountProfile: AccountProfile;
  histories: History[];
}

export interface ProfileTextData {
  profileName?: string;
  profileMessage?: string;
  interests?: string;
  birthday?: string | undefined;
  introduction?: string;
  solar?: boolean;
}
export interface ProfileFormData {
  profileName: string;
  profileMessage: string;
  interests: string;
  birthday: Date | undefined;
  introduction: string;
  solar: boolean;
}

export interface UpdateProfileRequest {
  birthday?: string | undefined;
  interests?: string;
  introduction?: string;
  profileMessage?: string;
  profileName?: string;
  solar?: boolean; // 양력/음력 구분
}

export interface ProfileFormData {
  profileName: string;
  profileMessage: string;
  interests: string;
  birthday: Date | undefined;
  introduction: string;
  solar: boolean;
}

export interface UpdateProfileResponse {
  result: boolean;
  resultData: {
    accountProfile?: AccountProfile;
    message?: string;
  };
}

export interface GroupProfileParams {
  emoticonId?: number;
  profileId?: number;
  profileKind: 'basic' | 'normal' | 'emoticon';
  profileOriginal?: string | null;
  profileSmallThumbnail?: string | null;
  profileThumbnail?: string | null;
}

export interface UpdateGroupProfileResponse {
  result: boolean;
  resultData: {
    profileId: number;
    profileKind: 'basic' | 'normal' | 'emoticon';
    emoticonId?: number;
    profileOriginal?: string | null;
    profileThumbnail?: string | null;
    profileSmallThumbnail?: string | null;
    lastModifiedDate: number;
  };
}
