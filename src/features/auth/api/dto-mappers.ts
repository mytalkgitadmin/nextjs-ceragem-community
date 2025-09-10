// Auth DTO to Domain mappers

import type { AccountProfile } from "@/entities/profile";
import type { ApiResponse } from "@/shared/api";
import type {
  ApiAccountProfileDTO,
  LoginResultDTO,
  LoginResponseDTO,
  RefreshTokenResultDTO,
  RefreshTokenResponseDTO,
  GetProfileResponseDTO,
} from "./dto-types";

// DTO Profile을 Domain Profile로 매핑
export const mapApiAccountProfileToAccountProfile = (
  dto: ApiAccountProfileDTO
): AccountProfile => ({
  accountId: dto.accountId,
  accountType: dto.accountType,
  editedName: dto.editedName,
  syncName: dto.syncName,
  sendbirdId: dto.sendbirdId,
  status: dto.status,
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
  resultData: {
    accountProfile: mapApiAccountProfileToAccountProfile(
      dtoResponse.resultData.accountProfile
    ),
  },
});
