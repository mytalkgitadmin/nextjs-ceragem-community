// Auth API DTO types (백엔드 응답 형태 그대로)

// 로그인 요청 DTO
export interface LoginRequestDTO {
  nationalNumber: string;
  phoneNumber: string;
  password: string;
}

// 백엔드 프로필 응답 DTO (API 전용)
export interface ApiAccountProfileDTO {
  accountId: number;
  accountType: "ADMIN" | "USER";
  editedName: string;
  syncName: string;
  sendbirdId: string;
  status: "BAN" | "ACTIVE";
  profile: {
    emoticonId: number;
    groupId: number;
    lastModifiedDate: string;
    profileId: number;
    profileKind: "normal" | "basic" | "emoticon";
    profileMessage: string;
    profileName: string;
    profileOriginal: string;
    profileOrigin: string;
    profileSmallThumbnail: string;
    profileThumbnail: string;
  };
}

// 로그인 응답 데이터 DTO
export interface LoginResultDTO {
  accountProfile: ApiAccountProfileDTO;
  accessToken: string;
  refreshToken: string;
  sendBirdId: string;
  sessionToken: string;
}

// 로그인 API 응답 DTO
export interface LoginResponseDTO {
  result: boolean;
  resultData: LoginResultDTO;
}

// 토큰 갱신 요청 DTO
export interface RefreshTokenRequestDTO {
  refreshToken: string;
}

// 토큰 갱신 응답 데이터 DTO
export interface RefreshTokenResultDTO {
  accessToken: string;
  refreshToken: string;
  sessionToken: string;
}

// 토큰 갱신 API 응답 DTO
export interface RefreshTokenResponseDTO {
  result: boolean;
  resultData: RefreshTokenResultDTO;
}

// 프로필 조회 API 응답 DTO
export interface GetProfileResponseDTO {
  result: boolean;
  resultData: {
    accountProfile: ApiAccountProfileDTO;
  };
}
