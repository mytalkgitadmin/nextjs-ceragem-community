import { API_ENDPOINTS, apiRequest, RequestParams } from "@/shared/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { FriendStatus } from "@/entities/friend";

export interface FriendListResponse {
  result: boolean;
  resultData: {
    friends: Friend[];
    groups: Group[];
    invitableUsers: InvitableUser[];
  };
}

import type { ApiFriendProfile } from "@/entities/friend";

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

import type { Friend, Group, InvitableUser } from "@/entities/friend";

// Re-export for backward compatibility
export type { Friend, Group, InvitableUser, FriendStatus, ApiFriendProfile };

export interface FriendListParams extends RequestParams {
  friendType: FriendStatus[];
  count?: number;
  groupId?: number;
  isNew?: boolean;
  offset?: number;
}

export const getFriendListApi = async (params: FriendListParams) => {
  const response = await apiRequest<FriendListResponse>(
    API_ENDPOINTS.FRIEND.GET_FRIENDS_LIST,
    undefined,
    params
  );

  return response.resultData;
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
    mutationFn: async (data: { friendId: number; isFavorite: boolean }) =>
      await apiRequest<FriendListResponse>(
        API_ENDPOINTS.FRIEND.PUT_FRIEND_FAVORITE,
        data
      ),
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
      await apiRequest<FriendListResponse>(
        API_ENDPOINTS.FRIEND.PUT_FRIEND_HIDE,
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
      await apiRequest<FriendListResponse>(
        API_ENDPOINTS.FRIEND.PUT_FRIEND_HIDE_CANCEL,
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
      await apiRequest<FriendListResponse>(
        API_ENDPOINTS.FRIEND.PUT_FRIEND_BLOCK,
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
      await apiRequest<FriendListResponse>(
        API_ENDPOINTS.FRIEND.PUT_FRIEND_BLOCK_CANCEL,
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
      await apiRequest<FriendListResponse>(
        API_ENDPOINTS.FRIEND.DELETE_FRIEND,
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
      await apiRequest<FriendListResponse>(
        API_ENDPOINTS.FRIEND.PUT_FRIEND_JOIN,
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
      await apiRequest<FriendListResponse>(
        API_ENDPOINTS.FRIEND.PUT_FRIEND_REJECT,
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
      await apiRequest<FriendListResponse>(
        API_ENDPOINTS.FRIEND.POST_FRIEND,
        data
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
};
