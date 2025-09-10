import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { RequestNotification, ResponseNotification } from './model';
import { API_ENDPOINTS, apiRequest } from '@/shared/api';
import { useTotalNotificationStore } from './store/useTotalNotificationStore';

export const getNotiApi = async (params?: { category?: string }) => {
  const response = await apiRequest<ResponseNotification>(
    API_ENDPOINTS.NOTI.GET_NOTI,
    undefined,
    params,
  );

  return response.resultData.notifications;
};

export const useNotiList = (category?: string) => {
  return useQuery({
    queryKey: ['notiList', category],
    queryFn: () => getNotiApi(category ? { category } : undefined),
  });
};

// 알림 메시지 읽음 처리
export const patchNotiApi = (notificationId: string) => {
  return apiRequest<RequestNotification>(
    API_ENDPOINTS.NOTI.PATCH_NOTI,
    {
      isRead: true,
    },
    undefined,
    {
      notification_id: notificationId,
    },
  );
};

// 알림 메시지 삭제
export const deleteNotiApi = (notificationId: string) => {
  return apiRequest<RequestNotification>(
    API_ENDPOINTS.NOTI.DEL_NOTI,
    undefined,
    undefined,
    {
      notification_id: notificationId,
    },
  );
};

export const useMarkNotiAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      notificationId,
    }: {
      notificationId: string;
      category?: string;
    }) => patchNotiApi(notificationId),
    onSuccess: (_, { category }) => {
      queryClient.invalidateQueries({
        queryKey: ['notiList'],
      });

      if (category === 'FRIEND_REQUEST') {
        const { decreaseFriendRequestCount } =
          useTotalNotificationStore.getState();
        decreaseFriendRequestCount();
      }
    },
    onError: (error) => {
      console.error('알림 읽음 처리 실패:', error);
    },
  });
};
export const useDeleteNoti = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      notificationId,
    }: {
      notificationId: string;
      category?: string;
    }) => deleteNotiApi(notificationId),
    onSuccess: (_, { category }) => {
      queryClient.invalidateQueries({
        queryKey: ['notiList'],
      });

      if (category === 'FRIEND_REQUEST') {
        const { decreaseFriendRequestCount } =
          useTotalNotificationStore.getState();
        decreaseFriendRequestCount();
      }
    },
    onError: (error) => {
      console.error('알림 삭제 실패:', error);
    },
  });
};
