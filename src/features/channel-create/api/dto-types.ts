// 채널 생성 API DTO 타입

// 채널 생성 요청 DTO
export interface CreateChannelRequestDTO {
  userIds: string[];
  isDistinct?: boolean;
  channelUrl?: string;
}

// 채널 생성 응답 DTO
export interface CreateChannelResponseDTO {
  channelUrl: string;
  name: string;
  createdAt: number;
}
