// 프로필 업데이트 API DTO 타입

// 프로필 업데이트 요청 DTO
export interface UpdateProfileRequestDTO {
  nickname?: string;
  introduction?: string;
  interests?: string;
  birthday?: string;
  solar?: boolean;
  profileImageUrl?: string;
  profileKind?: string;
}

// 프로필 업데이트 응답 DTO
export interface UpdateProfileResponseDTO {
  success: boolean;
  message?: string;
  profile?: {
    accountId: number;
    nickname: string;
    profileImageUrl: string;
  };
}

// 그룹 프로필 파라미터 DTO
export interface GroupProfileParamsDTO {
  groupId: string;
  profileData: UpdateProfileRequestDTO;
}

// 그룹 프로필 업데이트 응답 DTO
export interface UpdateGroupProfileResponseDTO {
  success: boolean;
  message?: string;
  groupProfile?: {
    groupId: string;
    profileImageUrl: string;
  };
}
