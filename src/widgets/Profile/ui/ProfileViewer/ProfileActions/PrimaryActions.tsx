import { Button } from "@/shared/ui/button";
import { RelationType } from "@/entities/friend";
import Icons from "@/shared/ui/Icons";
import { memo, useState } from "react";
import useProfileActions from "./useProfileActions";
import { EditProfileModal } from "@/features/profile/ui/EditProfileModal";

interface PrimaryActionsProps {
  userData: {
    phoneNumber?: string;
    editName?: string;
    syncName?: string;
  };
  friendId: number;
  phoneNumber?: string;
  relationType?: RelationType;
  onPhoneCall: (phoneNumber: string) => void;
  onStartChat: (type: "MY" | "DIRECT") => void;
}

const PrimaryActions = memo<PrimaryActionsProps>(
  ({
    userData,
    friendId,
    relationType,
    phoneNumber,
    onPhoneCall,
    onStartChat,
  }) => {
    const {
      handleHideCancel,
      handleBlockCancel,
      handleDelete,
      handleReject,
      handleRequest,
      handleAccept,
    } = useProfileActions({
      friendId,
      relationType,
    });

    const [isOpen, setIsOpen] = useState(false);
    // 나
    if (relationType === "ME") {
      return (
        <>
          {/* 프로필 편집 */}
          <>
            <Button
              className="grow-1"
              size="lg"
              variant="outline"
              onClick={() => setIsOpen(true)}
            >
              <Icons name="edit" />
              프로필 편집
            </Button>
            <EditProfileModal
              open={isOpen}
              onOpenChange={() => setIsOpen(false)}
            />
          </>

          <Button
            className="grow-1"
            size="lg"
            onClick={() => onStartChat("MY")}
          >
            <Icons name="message" />
            MY 메모
          </Button>
        </>
      );
    }

    // 친구 사이 아님
    if (relationType === "NONE") {
      return (
        <Button
          className="grow-1"
          size="lg"
          onClick={() =>
            handleRequest({
              phoneNumber: userData.phoneNumber || "",
              editedName: userData.editName || "",
              syncName: userData.syncName || "",
            })
          }
        >
          <Icons name="user-plus" />
          친구 신청
        </Button>
      );
    }

    // 친구상태, 즐겨찾기
    if (relationType === "NORMAL" || relationType === "FAVORITE") {
      return (
        <>
          {phoneNumber && (
            <Button
              onClick={() => onPhoneCall(phoneNumber)}
              className="grow-1"
              variant="outline"
              size="lg"
            >
              <Icons name="phone" />
              전화걸기
            </Button>
          )}
          <Button
            className="grow-1"
            size="lg"
            onClick={() => onStartChat("DIRECT")}
          >
            <Icons name="message" />
            1:1 대화
          </Button>
        </>
      );
    }

    // 탈퇴한 사용자
    if (relationType === "LEAVE") {
      return <>사용자를 찾을 수 없습니다</>;
    }

    // 삭제
    if (relationType === "DELETE") {
      return (
        <Button className="grow-1" variant="outline" size="lg">
          친구 추가
        </Button>
      );
    }

    // 친구 요청 함
    if (relationType === "REQUEST") {
      return (
        <Button className="grow-1" variant="outline" size="lg" disabled>
          친구 요청됨
        </Button>
      );
    }

    // 친구 요청 받음
    if (relationType === "REQUESTED") {
      return (
        <>
          <Button
            className="grow-1"
            variant="outline"
            size="lg"
            onClick={handleReject}
          >
            거절
          </Button>
          <Button className="grow-1" size="lg" onClick={handleAccept}>
            수락
          </Button>
        </>
      );
    }

    // 숨김
    if (relationType === "HIDE") {
      return (
        <>
          <Button
            className="grow-1"
            variant="outline"
            size="lg"
            onClick={handleDelete}
          >
            <Icons name="user-minus" /> 친구 삭제
          </Button>
          <Button className="grow-1" size="lg" onClick={handleHideCancel}>
            숨김 해제
          </Button>
        </>
      );
    }

    // 차단
    if (relationType === "BLOCK") {
      return (
        <>
          <Button
            className="grow-1"
            variant="outline"
            size="lg"
            onClick={handleDelete}
          >
            <Icons name="user-minus" /> 친구 삭제
          </Button>
          <Button className="grow-1" size="lg" onClick={handleBlockCancel}>
            차단 해제
          </Button>
        </>
      );
    }
  }
);

PrimaryActions.displayName = "PrimaryActions";

export default PrimaryActions;
