import { useCallback, useEffect } from 'react';

import { useSendbird } from '@sendbird/uikit-react';
import UserEventHandler from '@sendbird/uikit-react/handlers/UserEventHandler';
import GroupChannelHandler from '@sendbird/uikit-react/handlers/GroupChannelHandler';
// import type { BaseChannel } from '@sendbird/chat';

import { useFaviconBadge } from '../hooks/useFaviconBadge';
import { useAppBadge } from '../hooks/useAppBadge';
import { useTotalNotificationStore } from '../store/useTotalNotificationStore';

// import { ExtendedBaseMessage } from '../model';
import useInitialNotificationLoader from '../hooks/useInitialNotificationLoader';

const HANDLER_ID = 'UNREAD_COUNT_HANDLER';

export default function NotificationProvider() {
  const {
    state: {
      stores: { sdkStore, userStore },
    },
  } = useSendbird();
  const sdk = sdkStore?.sdk;

  const shouldRun = sdkStore?.initialized && sdk && userStore?.user?.userId;

  // 카운트 관리
  const { totalUnreadCount, setChatUnreadCount } = useTotalNotificationStore();

  // UI 요소
  const { showFaviconBadge, clearFaviconBadge } = useFaviconBadge();
  const { setAppBadge, clearAppBadge } = useAppBadge();
  // 초기 알림 로더
  const { isLoaded } = useInitialNotificationLoader();
  // 읽지 않은 채팅 메시지 업데이트
  const updateChatUnreadCount = useCallback(async () => {
    if (
      !sdk ||
      typeof sdk.groupChannel.getTotalUnreadMessageCount !== 'function'
    ) {
      return;
    }

    try {
      const chatUnreadCount =
        await sdk.groupChannel.getTotalUnreadMessageCount();

      // 읽지 않은 채팅메시지 업데이트
      setChatUnreadCount(chatUnreadCount);
    } catch (error) {
      console.error('읽지 않은 채팅 메시지 개수 업데이트 실패:', error);
    }
  }, [sdk, setChatUnreadCount]);

  // 전체 알림 개수에 따른 UI 업데이트
  const updateNotificationUI = useCallback(
    (totalCount: number) => {
      if (totalCount > 0) {
        setAppBadge(totalCount);
        showFaviconBadge();
      } else {
        clearAppBadge();
        clearFaviconBadge();
      }
    },
    [setAppBadge, clearAppBadge, showFaviconBadge, clearFaviconBadge],
  );

  // 채팅 카운트 초기화
  useEffect(() => {
    if (!shouldRun) {
      return;
    }
    updateChatUnreadCount();
  }, [shouldRun, updateChatUnreadCount]);

  // 배지 초기화
  useEffect(() => {
    if (!isLoaded) return;

    updateNotificationUI(totalUnreadCount);
  }, [isLoaded, totalUnreadCount, updateNotificationUI]);

  // 전체 알림 개수(실시간 업데이트)
  useEffect(() => {
    const unsubscribe = useTotalNotificationStore.subscribe(
      ({ totalUnreadCount }) => updateNotificationUI(totalUnreadCount),
    );

    return unsubscribe;
  }, [updateNotificationUI]);

  // Sendbird 이벤트 핸들러 연결
  useEffect(() => {
    if (!shouldRun) {
      return;
    }

    try {
      const userHandler = new UserEventHandler({
        onTotalUnreadMessageCountChanged() {
          updateChatUnreadCount();
        },
        onTotalUnreadMessageCountUpdated() {
          updateChatUnreadCount();
        },
      });

      const channelHandler = new GroupChannelHandler({
        // onMessageReceived(channel: BaseChannel, message: ExtendedBaseMessage) {
        //   // 브라우저 알림 보내기
        //   // console.log(channel);
        //   // console.log(message);
        // },
      });

      if (typeof sdk.addUserEventHandler === 'function') {
        sdk.groupChannel.addGroupChannelHandler(HANDLER_ID, channelHandler);
        sdk.addUserEventHandler(HANDLER_ID, userHandler);
      }
    } catch (error) {
      console.error('Sendbird 이벤트 핸들러 등록 실패:', error);
    }

    return () => {
      try {
        sdk.groupChannel.removeGroupChannelHandler(HANDLER_ID);
        sdk.removeUserEventHandler(HANDLER_ID);
      } catch (error) {
        console.log('sendbird ', error);
      }
    };
  }, [sdk, shouldRun, updateChatUnreadCount]);

  return null;
}
