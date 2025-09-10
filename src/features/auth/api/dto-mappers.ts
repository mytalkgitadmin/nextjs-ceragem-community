// Auth DTO to Domain mappers

import type { AccountProfile } from "@/entities/profile";
import type { ApiResponse } from "@/shared/api";
import { RelationType } from "@/entities/friend";
import type {
  ApiAccountProfileDTO,
  LoginResponseDTO,
  RefreshTokenResponseDTO,
  GetProfileResponseDTO,
} from "./dto-types";

// DTO Profile을 Domain Profile로 매핑
export const mapApiAccountProfileToAccountProfile = (
  dto: ApiAccountProfileDTO
): AccountProfile => ({
  accountId: dto.accountId,
  editedName: dto.editedName,
  syncName: dto.syncName,
  relationType: RelationType.NONE, // 기본값 설정
  nationalNumber: "", // 기본값 - DTO에서 제공되지 않음
  phoneNumber: "", // 기본값 - DTO에서 제공되지 않음
  birthday: undefined,
  solar: null,
  introduction: "",
  interests: null,
  email: "", // 기본값 - DTO에서 제공되지 않음
  isEmailCertification: false,
  status: dto.status,
  friendRelationMode: "PUBLIC", // 기본값
  cardNumber: "", // 기본값
  agreementMarketing: false,
  agreementModifiedDate: 0,
  profile: {
    emoticonId: dto.profile.emoticonId,
    groupId: dto.profile.groupId,
    lastModifiedDate: dto.profile.lastModifiedDate,
    profileId: dto.profile.profileId,
    profileKind: dto.profile.profileKind,
    profileMessage: dto.profile.profileMessage,
    profileName: dto.profile.profileName,
    profileOriginal: dto.profile.profileOriginal,
    profileOrigin: dto.profile.profileOrigin,
    profileSmallThumbnail: dto.profile.profileSmallThumbnail,
    profileThumbnail: dto.profile.profileThumbnail,
  },
});

// Login DTO를 Domain 응답으로 매핑
export const mapLoginResponse = (
  dtoResponse: LoginResponseDTO
): ApiResponse<{
  accountProfile: AccountProfile;
  accessToken: string;
  refreshToken: string;
  sendBirdId: string;
  sessionToken: string;
}> => ({
  result: dtoResponse.result,
  data: {
    accountProfile: mapApiAccountProfileToAccountProfile(
      dtoResponse.resultData.accountProfile
    ),
    accessToken: dtoResponse.resultData.accessToken,
    refreshToken: dtoResponse.resultData.refreshToken,
    sendBirdId: dtoResponse.resultData.sendBirdId,
    sessionToken: dtoResponse.resultData.sessionToken,
  }, // ApiResponse 타입 호환성
  status: 200, // 기본 상태값
  resultData: {
    accountProfile: mapApiAccountProfileToAccountProfile(
      dtoResponse.resultData.accountProfile
    ),
    accessToken: dtoResponse.resultData.accessToken,
    refreshToken: dtoResponse.resultData.refreshToken,
    sendBirdId: dtoResponse.resultData.sendBirdId,
    sessionToken: dtoResponse.resultData.sessionToken,
  },
});

// RefreshToken DTO를 Domain 응답으로 매핑
export const mapRefreshTokenResponse = (
  dtoResponse: RefreshTokenResponseDTO
): ApiResponse<{
  accessToken: string;
  refreshToken: string;
  sessionToken: string;
}> => ({
  result: dtoResponse.result,
  data: {
    accessToken: dtoResponse.resultData.accessToken,
    refreshToken: dtoResponse.resultData.refreshToken,
    sessionToken: dtoResponse.resultData.sessionToken,
  }, // ApiResponse 타입 호환성
  status: 200, // 기본 상태값
  resultData: {
    accessToken: dtoResponse.resultData.accessToken,
    refreshToken: dtoResponse.resultData.refreshToken,
    sessionToken: dtoResponse.resultData.sessionToken,
  },
});

// GetProfile DTO를 Domain 응답으로 매핑
export const mapGetProfileResponse = (
  dtoResponse: GetProfileResponseDTO
): ApiResponse<{
  accountProfile: AccountProfile;
}> => ({
  result: dtoResponse.result,
  data: {
    accountProfile: mapApiAccountProfileToAccountProfile(
      dtoResponse.resultData.accountProfile
    ),
  }, // ApiResponse 타입 호환성
  status: 200, // 기본 상태값
  resultData: {
    accountProfile: mapApiAccountProfileToAccountProfile(
      dtoResponse.resultData.accountProfile
    ),
  },
});
