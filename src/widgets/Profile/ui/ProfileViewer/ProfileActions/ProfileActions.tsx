import { memo } from "react";
import Icons from "@/shared/ui/Icons";
import { Button } from "@/shared/ui/button";

import { RelationType } from "@/entities/friend";
import styles from "./ProfileActions.module.scss";
import useProfileActions from "./useProfileActions";
import PrimaryActions from "./PrimaryActions";
import useCreateChat from "@/features/chat/hooks/useCreateChat";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { IconButton } from "@/shared/ui/IconButton";

interface ProfileActionsProps {
  userData: {
    phoneNumber?: string;
    editName?: string;
    syncName?: string;
  };
  friendId: number;
  isMyProfile: boolean;
  phoneNumber?: string;
  relationType?: RelationType;
  onPhoneCall: (phoneNumber: string) => void;
}
const ProfileActions = memo<ProfileActionsProps>(
  ({
    userData,
    friendId,
    isMyProfile,
    phoneNumber,
    relationType,
    onPhoneCall,
  }) => {
    const {
      handleFavoriteToggle,
      handleHide,
      handleHideCancel,
      handleBlock,
      handleBlockCancel,
      handleDelete,
    } = useProfileActions({ friendId, relationType });

    const { handleStartChat } = useCreateChat({});

    const onStartChat = (friendId: number) => {
      handleStartChat([friendId], isMyProfile ? "MY" : "DIRECT");
    };

    return (
      <>
        <div className="w-full flex gap-2">
          <PrimaryActions
            userData={userData}
            friendId={friendId}
            relationType={relationType}
            phoneNumber={phoneNumber}
            onPhoneCall={onPhoneCall}
            onStartChat={() => onStartChat(friendId)}
          />
        </div>

        {relationType !== "DELETE" &&
          relationType !== "NONE" &&
          relationType !== "REQUESTED" &&
          relationType !== "REQUEST" &&
          !isMyProfile && (
            <div className={styles.buttons}>
              {/* 즐겨찾기 */}
              <Button
                size="icon"
                variant="ghost"
                onClick={handleFavoriteToggle}
              >
                {relationType === "FAVORITE" ? (
                  <>
                    <Icons name="star-filled" color="var(--warning)" />
                    <span className="sr-only">즐겨찾기 해제</span>
                  </>
                ) : (
                  <>
                    <Icons name="star" />
                    <span className="sr-only">즐겨찾기</span>
                  </>
                )}
              </Button>

              {/* 더보기 */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <IconButton
                    name="dots"
                    text="더보기"
                    className={styles.more}
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent className={styles.popover}>
                  {relationType === "HIDE" ? (
                    <>
                      <DropdownMenuItem onClick={handleHideCancel}>
                        친구 숨김 해제
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleDelete}>
                        친구 삭제
                      </DropdownMenuItem>
                    </>
                  ) : relationType === "BLOCK" ? (
                    <>
                      <DropdownMenuItem onClick={handleBlockCancel}>
                        친구 차단 해제
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleDelete}>
                        친구 삭제
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem onClick={handleHide}>
                        친구 숨김
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleBlock}>
                        친구 차단
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
      </>
    );
  }
);

ProfileActions.displayName = "ProfileActions";

export default ProfileActions;
