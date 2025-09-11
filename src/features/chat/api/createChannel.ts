import { apiRequest } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";

// DTO와 계약 타입 import
import type {
  CreateChannelRequestDTO,
  CreateChannelResponseDTO,
} from "./dto-types";
import type {
  CreateChannelRequest,
  CreateChannelResponse,
} from "./contracts-types";
import { mapCreateChannelResponse } from "./dto-mappers";
import { CHAT_ENDPOINTS } from "./endpoints";

// 하위 호환성을 위한 기존 타입 re-export
export type {
  CreateChannelRequest,
  CreateChannelResponse as CreateChannelApiResponse,
};

export const createChannelApi = async (
  data: CreateChannelRequest
): Promise<CreateChannelResponse> => {
  // DTO로 변환 (이 경우 구조가 동일함)
  const dtoRequest: CreateChannelRequestDTO = {
    accountIds: data.accountIds,
    channelName: data.channelName,
    channelType: data.channelType,
  };

  // DTO로 API 호출
  const dtoResponse = await apiRequest<CreateChannelResponseDTO>(
    CHAT_ENDPOINTS.POST_CREATE_CHANNEL,
    dtoRequest
  );

  // DTO를 도메인 모델로 변환
  return mapCreateChannelResponse(dtoResponse);
};

export const useCreateChannel = () => {
  return useMutation({
    mutationFn: createChannelApi,
  });
};
