import { apiRequest } from "@/shared/api";
import { FRIEND_ENDPOINTS } from "./api/endpoints";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// DTO와 계약 타입 import
import type { FriendListResponseDTO } from "./api/dto-types";
import type { FriendListResponse } from "./api/contracts-types";
import { mapFriendListResponse } from "./api/dto-mappers";

// Entities import
import type {
  Friend,
  Group,
  InvitableUser,
  FriendStatus,
} from "@/entities/friend";

// Re-export for backward compatibility
export type { Friend, Group, InvitableUser, FriendStatus };

// API 요청 파라미터 타입
export interface FriendListParams {
  friendType: FriendStatus[];
  count?: number;
  isNew?: boolean;
  offset?: number;
  groupId?: number;
  isSync?: boolean;
  [key: string]:
    | string
    | number
    | boolean
    | (string | number | boolean)[]
    | null
    | undefined; // RequestParams와 호환성을 위한 인덱스 시그니처
}

export interface FriendRequestData {
  friends: Array<{
    editedName: string;
    friendId: number;
    nationalNumber: string;
    phoneNumber: string;
    syncName: string;
  }>;
  groupId: number;
  isSync: boolean;
}

export const getFriendListApi = async (params: FriendListParams) => {
  // DTO로 API 호출
  const dtoResponse = await apiRequest<FriendListResponseDTO>(
    FRIEND_ENDPOINTS.GET_FRIENDS_LIST,
    undefined,
    params
  );

  // DTO를 도메인 모델로 변환
  const domainResponse = mapFriendListResponse(dtoResponse);

  return domainResponse.resultData;
};

//  BLOCK, DELETE, FAVORITE, HIDE, LEAVE, ME, NONE, NORMAL, REJECT, REQUEST, REQUESTED
export const useFriends = (params: FriendListParams) => {
  return useQuery({
    queryKey: ["user", "friends", params],
    queryFn: async () => getFriendListApi(params),
    enabled: params.friendType.length > 0,
  });
};

export const useFriendFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { friendId: number; isFavorite: boolean }) => {
      // DTO 응답을 받지만 도메인 모델 변환은 필요시에만
      const dtoResponse = await apiRequest<FriendListResponseDTO>(
        FRIEND_ENDPOINTS.PUT_FRIEND_FAVORITE,
        data
      );
      return mapFriendListResponse(dtoResponse);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
};

// 친구 숨김
export const useFriendHide = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (friendId: number) =>
      await apiRequest<FriendListResponseDTO>(
        FRIEND_ENDPOINTS.PUT_FRIEND_HIDE,
        { friendId }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
};
// 친구 숨김취소
export const useFriendHideCancel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (friendId: number) =>
      await apiRequest<FriendListResponseDTO>(
        FRIEND_ENDPOINTS.PUT_FRIEND_HIDE_CANCEL,
        { friendId }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
};

// 친구 차단
export const useFriendBlock = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (friendId: number) =>
      await apiRequest<FriendListResponseDTO>(
        FRIEND_ENDPOINTS.PUT_FRIEND_BLOCK,
        { friendId }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
};
// 친구 차단 취소
export const useFriendBlockCancel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (friendId: number) =>
      await apiRequest<FriendListResponseDTO>(
        FRIEND_ENDPOINTS.PUT_FRIEND_BLOCK_CANCEL,
        { friendId }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
};

// 친구 삭제 - friedId
export const useFriendDelete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (friendId: number) =>
      await apiRequest<FriendListResponseDTO>(
        FRIEND_ENDPOINTS.DELETE_FRIEND,
        undefined,
        undefined,
        {
          friendId,
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
};

// 친구 추가 - friendId, groupId
export const useFriendJoin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      friendId,
      groupId,
    }: {
      friendId: number;
      groupId: number;
    }) => {
      await apiRequest<FriendListResponseDTO>(
        FRIEND_ENDPOINTS.PUT_FRIEND_JOIN,
        {
          friendId,
          groupId,
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
};

// 친구 거절 - friendId
export const useFriendReject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (friendId: number) =>
      await apiRequest<FriendListResponseDTO>(
        FRIEND_ENDPOINTS.PUT_FRIEND_REJECT,
        {
          friendId,
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
};

// 친구 요청
export const useFriendRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: FriendRequestData) =>
      await apiRequest<FriendListResponseDTO>(
        FRIEND_ENDPOINTS.POST_FRIEND,
        data
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
};
