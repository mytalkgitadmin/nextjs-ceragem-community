import { useEffect, useState } from 'react';
import { useTotalNotificationStore } from '../store/useTotalNotificationStore';
import { useNotiList } from '../api';
import { Notification } from '../model';

export default function useInitialNotificationLoader() {
  const { setFriendRequestCount } = useTotalNotificationStore();
  const { data: notiData, isSuccess, isError, isLoading } = useNotiList();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isSuccess || !notiData || isLoaded) {
      return;
    }

    try {
      const notifications = notiData;

      // 읽지 않은 알림만 필터링
      const unreadNotifications = notifications.filter(
        (message: Notification) => !message.isRead,
      );

      const friendRequests = unreadNotifications.filter(
        (msg: Notification) => msg.category === 'FRIEND',
      );

      setFriendRequestCount(friendRequests.length);
      setIsLoaded(true);
    } catch (error) {
      console.error('친구 신청 알림 초기 로딩 실패:', error);
    }
  }, [notiData, isSuccess, setFriendRequestCount, isLoaded]);

  // 에러 처리
  useEffect(() => {
    if (isError) {
      setIsLoaded(true); // 에러 상태에서도 로딩 완료로 처리
    }
  }, [isError]);

  return {
    isLoaded,
    isLoading,
    isError,
    friendRequestCount:
      notiData?.filter(
        (msg: Notification) => msg.category === 'FRIEND' && !msg.isRead,
      ).length || 0,
  };
}
