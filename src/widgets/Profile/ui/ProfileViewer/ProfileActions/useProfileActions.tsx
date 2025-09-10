import { useCallback } from 'react';
import { toast } from 'sonner';

export interface ApiErrorResponse {
  status: number;
  message: string;
  data: {
    timestamp: string;
    status: number;
    error: string;
    path: string;
    requestId: string;
    errorCode: string;
    localeMessage: string;
    errorDetails: Record<string, unknown>;
  };
}

import Icons from '@/shared/ui/Icons';
import { useUIStore } from '@/shared/store/useUIStore';
import {
  useFriendBlock,
  useFriendBlockCancel,
  useFriendDelete,
  useFriendFavorite,
  useFriendHide,
  useFriendHideCancel,
  useFriendJoin,
  useFriendReject,
  useFriendRequest,
} from '@/features/friend/api';
import { RelationType } from '@/features/chat/model';

import styles from './ProfileActions.module.scss';
import { useAuth } from '@/features/auth';

interface UseProfileActionsProps {
  friendId: number;
  relationType?: RelationType;
}
export default function useProfileActions({
  friendId,
  relationType,
}: UseProfileActionsProps) {
  const { closeAllModals, openAlertDialog } = useUIStore();
  const { userProfile } = useAuth();
  const favoriteMutation = useFriendFavorite();
  const hideMutation = useFriendHide();
  const hideCancel = useFriendHideCancel();
  const blockMutation = useFriendBlock();
  const blockCancel = useFriendBlockCancel();
  const deleteMutation = useFriendDelete();

  const joinMutation = useFriendJoin();
  const rejectMutation = useFriendReject();
  const requestMutation = useFriendRequest();

  const groupId = userProfile?.profile.groupId || 0;
  // 즐겨찾기 토글
  const handleFavoriteToggle = useCallback(() => {
    favoriteMutation.mutate({
      friendId,
      isFavorite: relationType !== 'FAVORITE',
    });
  }, [favoriteMutation, friendId, relationType]);

  // 친구 숨김
  const handleHide = useCallback(() => {
    openAlertDialog({
      title: (
        <>
          <Icons name="mood-sad" />
          친구 숨김
        </>
      ),
      description: (
        <div className={styles.alertMsg}>
          <p>이 친구를 숨기시겠습니까?</p>
          <ul>
            <li>더이상 친구 목록에 보이지 않아요</li>
          </ul>
        </div>
      ),

      confirmText: '숨김',
      onConfirm: () => hideMutation.mutate(friendId),
    });
  }, [openAlertDialog, hideMutation, friendId]);

  // 친구 숨김 해제
  const handleHideCancel = useCallback(() => {
    openAlertDialog({
      title: '친구 숨김 해제',
      description: '이 친구의 숨김을 해제하시겠습니까?',
      confirmText: '해제',
      onConfirm: () => hideCancel.mutate(friendId),
    });
  }, [openAlertDialog, hideCancel, friendId]);

  // 친구 차단
  const handleBlock = useCallback(() => {
    openAlertDialog({
      title: (
        <>
          <Icons name="mood-off" /> 친구 차단
        </>
      ),
      description: (
        <div className={styles.alertMsg}>
          <p>정말로 이 친구를 차단하시겠습니까?</p>
          <ul>
            <li>차단하면, 친구가 보내는 메시지를 받을 수 없어요.</li>
            <li>친구 목록에서 사라져요.</li>
            <li>차단 여부는 상대방이 알 수 없어요.</li>
          </ul>
        </div>
      ),
      confirmText: '차단하기',
      onConfirm: () => {
        blockMutation.mutate(friendId, {
          onSuccess: () => {
            toast('친구가 차단되었습니다');
            closeAllModals();
          },
          onError: (error) => {
            console.error('차단 처리 중 오류:', error);
          },
        });
      },
    });
  }, [openAlertDialog, blockMutation, friendId, closeAllModals]);

  // 친구 차단 해제
  const handleBlockCancel = useCallback(() => {
    openAlertDialog({
      title: '친구 차단 해제',
      description: '이 친구의 차단을 해제하시겠습니까?',
      confirmText: '해제',
      onConfirm: () => blockCancel.mutate(friendId),
    });
  }, [openAlertDialog, blockCancel, friendId]);

  // 친구 삭제
  const handleDelete = useCallback(() => {
    openAlertDialog({
      title: (
        <>
          <Icons name="user-minus" /> 친구 삭제
        </>
      ),
      description: (
        <div className={styles.alertMsg}>
          <p>정말로 이 친구를 삭제하시겠습니까?</p>
          <ul>
            <li>친구 목록에서 삭제되요.</li>
            <li>상대방이 보낸 메시지는 받을 수 있어요.</li>
          </ul>
        </div>
      ),
      confirmText: '삭제하기',
      onConfirm: () => {
        deleteMutation.mutate(friendId, {
          onSuccess: () => {
            toast('친구가 삭제되었습니다');
            closeAllModals();
          },
          onError: (error) => {
            console.error('차단 처리 중 오류:', error);
          },
        });
      },
    });
  }, [openAlertDialog, deleteMutation, friendId, closeAllModals]);

  // 친구 수락
  const handleAccept = useCallback(() => {
    joinMutation.mutate(
      { friendId, groupId },
      {
        onSuccess: () => {
          toast('친구 요청을 수락했습니다');
          closeAllModals();
        },
        onError: (error) => {
          console.error('차단 처리 중 오류:', error);
          toast('친구 수락에 실패했습니다');
        },
      },
    );
  }, [joinMutation, friendId, groupId, closeAllModals]);

  // 친구 삭제
  const handleReject = useCallback(() => {
    openAlertDialog({
      title: '친구 거절',
      description: (
        <div className={styles.alertMsg}>
          <p>이 친구 요청을 거절하시겠습니까?</p>
          <ul>
            <li>거절한 요청은 되돌릴 수 없어요.</li>
            <li>상대방에게 거절 알림이 가지 않아요.</li>
          </ul>
        </div>
      ),
      confirmText: '거절하기',
      onConfirm: () => {
        rejectMutation.mutate(friendId, {
          onSuccess: () => {
            toast('친구 요청을 거절했습니다');
            closeAllModals();
          },
          onError: (error) => {
            console.error('차단 처리 중 오류:', error);
            toast('친구 거절에 실패했습니다');
          },
        });
      },
    });
  }, [openAlertDialog, rejectMutation, friendId, closeAllModals]);

  // 친구 신청
  const handleRequest = useCallback(
    ({
      phoneNumber,
      editedName,
      syncName,
    }: {
      phoneNumber: string;
      editedName: string;
      syncName: string;
    }) => {
      const data = {
        friends: [
          {
            editedName: editedName,
            friendId: friendId,
            nationalNumber: '82',
            phoneNumber: phoneNumber,
            syncName: syncName,
          },
        ],
        groupId: groupId,
        isSync: false,
      };

      requestMutation.mutate(data, {
        onSuccess: () => {
          toast('친구 요청을 하였습니다');
          closeAllModals();
        },
        onError: (error: Error | ApiErrorResponse) => {
          // 102028: "친구가 먼저 나를 초대했어요. '친구 메뉴 > 나를 초대한 친구'에서 수락해주세요."

          // [!] 앱확인 후 처리
          if ('data' in error && error.data?.errorCode === '102028') {
            handleAccept();
            return;
          }
          console.error('친구 요청 처리 중 오류:', error);
          toast('친구 요청에 실패했습니다');
        },
      });
    },
    [],
  );

  return {
    handleFavoriteToggle,
    handleHide,
    handleHideCancel,
    handleBlock,
    handleBlockCancel,

    handleDelete,

    handleAccept,
    handleReject,
    handleRequest,
  };
}
