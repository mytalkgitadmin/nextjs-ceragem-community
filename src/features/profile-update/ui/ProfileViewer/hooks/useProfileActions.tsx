import { useCallback } from "react";
import { showSuccess, showError } from "@/shared/ui/overlays/toast";

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

import { Icons } from "@/shared/ui/icon";
import { useUIStore } from "@/shared/model/useUIStore";
import { useProfileModalStore } from "@/features/profile-update/model/useProfileModalStore";
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
} from "@/features/friend-manage/model";
import { RelationType } from "@/entities/channel";

import styles from "../components/ProfileActions.module.scss";
import { useProfileStore } from "@/entities/profile/model/useProfileStore";

interface UseProfileActionsProps {
  friendId: number;
  relationType?: RelationType;
}
export default function useProfileActions({
  friendId,
  relationType,
}: UseProfileActionsProps) {
  const { openAlertDialog } = useUIStore();
  const { closeProfileModal } = useProfileModalStore();
  const { userProfile } = useProfileStore();
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
  const handleFavoriteToggle = useCallback(() => {
    favoriteMutation.mutate({
      friendId,
      isFavorite: relationType !== "FAVORITE",
    });
  }, [favoriteMutation, friendId, relationType]);

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
      confirmText: "숨김",
      onConfirm: () => hideMutation.mutate(friendId),
    });
  }, [openAlertDialog, hideMutation, friendId]);

  const handleHideCancel = useCallback(() => {
    openAlertDialog({
      title: "친구 숨김 해제",
      description: "이 친구의 숨김을 해제하시겠습니까?",
      confirmText: "해제",
      onConfirm: () => hideCancel.mutate(friendId),
    });
  }, [openAlertDialog, hideCancel, friendId]);

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
      confirmText: "차단하기",
      onConfirm: () => {
        blockMutation.mutate(friendId, {
          onSuccess: () => {
            showSuccess("친구가 차단되었습니다");
            closeProfileModal();
          },
          onError: (error: unknown) => {
            console.error("차단 처리 중 오류:", error);
          },
        });
      },
    });
  }, [openAlertDialog, blockMutation, friendId, closeProfileModal]);

  const handleBlockCancel = useCallback(() => {
    openAlertDialog({
      title: "친구 차단 해제",
      description: "이 친구의 차단을 해제하시겠습니까?",
      confirmText: "해제",
      onConfirm: () => blockCancel.mutate(friendId),
    });
  }, [openAlertDialog, blockCancel, friendId]);

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
      confirmText: "삭제하기",
      onConfirm: () => {
        deleteMutation.mutate(friendId, {
          onSuccess: () => {
            showSuccess("친구가 삭제되었습니다");
            closeProfileModal();
          },
          onError: (error: unknown) => {
            console.error("차단 처리 중 오류:", error);
          },
        });
      },
    });
  }, [openAlertDialog, deleteMutation, friendId, closeProfileModal]);

  const handleAccept = useCallback(() => {
    joinMutation.mutate(
      { friendId, groupId },
      {
        onSuccess: () => {
          showSuccess("친구 요청을 수락했습니다");
          closeProfileModal();
        },
        onError: (error: unknown) => {
          console.error("차단 처리 중 오류:", error);
          showError("친구 수락에 실패했습니다");
        },
      }
    );
  }, [joinMutation, friendId, groupId, closeProfileModal]);

  const handleReject = useCallback(() => {
    openAlertDialog({
      title: "친구 거절",
      description: (
        <div className={styles.alertMsg}>
          <p>이 친구 요청을 거절하시겠습니까?</p>
          <ul>
            <li>거절한 요청은 되돌릴 수 없어요.</li>
            <li>상대방에게 거절 알림이 가지 않아요.</li>
          </ul>
        </div>
      ),
      confirmText: "거절하기",
      onConfirm: () => {
        rejectMutation.mutate(friendId, {
          onSuccess: () => {
            showSuccess("친구 요청을 거절했습니다");
            closeProfileModal();
          },
          onError: (error: unknown) => {
            console.error("차단 처리 중 오류:", error);
            showError("친구 거절에 실패했습니다");
          },
        });
      },
    });
  }, [openAlertDialog, rejectMutation, friendId, closeProfileModal]);

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
            nationalNumber: "82",
            phoneNumber: phoneNumber,
            syncName: syncName,
          },
        ],
        groupId: groupId,
        isSync: false,
      };

      requestMutation.mutate(data, {
        onSuccess: () => {
          showSuccess("친구 요청을 하였습니다");
          closeProfileModal();
        },
        onError: (error: Error | ApiErrorResponse) => {
          if ("data" in error && error.data?.errorCode === "102028") {
            handleAccept();
            return;
          }
          console.error("친구 요청 처리 중 오류:", error);
          showError("친구 요청에 실패했습니다");
        },
      });
    },
    [requestMutation, friendId, groupId, closeProfileModal, handleAccept]
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
