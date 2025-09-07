// src/features/chat-create/ui/SelectFriends/index.tsx
import { useState } from "react";

import { useCategorizedFriends } from "@/features/friend-categorize";
import { Friend } from "@/entities/friend";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/overlays";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion";
import { Button } from "@/shared/ui/button";
import { Checkbox } from "@/shared/ui/checkbox";

import { Icons } from "@/shared/ui/icon";
import { ProfileCard } from "@/entities/profile/ui";

import styles from "./index.module.scss";
import useFriendSearch from "@/features/friend-search";
import SearchInput from "@/shared/ui/search-input";
import useCreateChat from "@/features/channel-create/model/useCreateChannel";
import { getProfileThumbnailUrl } from "@/entities/profile";

export interface SelectFriendsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SelectFriends({
  open,
  onOpenChange,
}: SelectFriendsProps) {
  const { favoriteFriends, allFriends } = useCategorizedFriends();
  const [selectedFriends, setSelectedFriends] = useState<Friend[]>([]);

  const { handleStartChat } = useCreateChat({});

  const onStartChat = () => {
    const friendIds = selectedFriends.map((friend) => friend.accountId);
    handleStartChat(
      friendIds,
      selectedFriends.length === 1 ? "DIRECT" : "GROUP"
    );
    setSelectedFriends([]);
    favoriteSearch.clearSearch();
    allFriendsSearch.clearSearch();
    onOpenChange(false);
  };

  // 검색 결과 필터링
  const favoriteSearch = useFriendSearch({ friends: favoriteFriends });
  const allFriendsSearch = useFriendSearch({ friends: allFriends });

  // 다이얼로그 닫기 시 상태 초기화
  const handleClose = () => {
    setSelectedFriends([]);
    favoriteSearch.clearSearch();
    allFriendsSearch.clearSearch();
    onOpenChange(false);
  };

  // 친구 선택/해제 핸들러
  const handleFriendSelect = (friend: Friend, checked: boolean) => {
    if (checked) {
      setSelectedFriends((prev) => [...prev, friend]);
    } else {
      setSelectedFriends((prev) =>
        prev.filter((f) => f.accountId !== friend.accountId)
      );
    }
  };

  // 선택된 친구 제거
  const removeSelectedFriend = (friendId: number) => {
    setSelectedFriends((prev) => prev.filter((f) => f.accountId !== friendId));
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>대화방 만들기</DialogTitle>
          <DialogDescription>대화할 친구 선택하세요</DialogDescription>
        </DialogHeader>

        {/* 검색 입력 */}
        <SearchInput
          value={favoriteSearch.searchQuery}
          onChange={(value) => {
            favoriteSearch.setSearchQuery(value);
            allFriendsSearch.setSearchQuery(value);
          }}
          placeholder="친구 이름으로 검색"
        />

        {/* 선택된 친구들 */}
        {selectedFriends.length > 0 && (
          <div>
            <h3 className={styles.title}>
              선택된 친구 <strong>{selectedFriends.length}</strong>
            </h3>
            <div className={styles.selectedList}>
              {selectedFriends.map((friend) => (
                <div className={styles.selected} key={friend.accountId}>
                  <ProfileCard
                    profile={friend.profile}
                    profileImageUrl={getProfileThumbnailUrl(friend?.profile)}
                    horizon
                  />

                  <button
                    onClick={() => removeSelectedFriend(friend.accountId)}
                    className={styles.removeBtn}
                  >
                    <Icons name="x" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 친구 목록 */}
        <div className={styles.friendsList}>
          <Accordion type="multiple" defaultValue={["favorite", "all"]}>
            {/* 즐겨찾는 친구 */}
            {favoriteSearch.filteredFriends.length > 0 && (
              <AccordionItem value="favorite">
                <AccordionTrigger>
                  <h3 className={styles.title}>
                    즐겨찾는 친구{" "}
                    <strong>{favoriteSearch.filteredFriends.length}</strong>
                  </h3>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {favoriteSearch.filteredFriends.map((friend) => (
                      <FriendSelectItem
                        key={friend.accountId}
                        friend={friend}
                        isSelected={selectedFriends.some(
                          (f) => f.accountId === friend.accountId
                        )}
                        onSelect={handleFriendSelect}
                      />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}

            {/* 전체 친구 */}
            {allFriendsSearch.filteredFriends.length > 0 ? (
              <AccordionItem value="all">
                <AccordionTrigger>
                  <h3 className={styles.title}>
                    전체 친구{" "}
                    <strong>{allFriendsSearch.filteredFriends.length}</strong>
                  </h3>
                </AccordionTrigger>
                <AccordionContent>
                  <div>
                    {allFriendsSearch.filteredFriends.map((friend) => (
                      <FriendSelectItem
                        key={friend.accountId}
                        friend={friend}
                        isSelected={selectedFriends.some(
                          (f) => f.accountId === friend.accountId
                        )}
                        onSelect={handleFriendSelect}
                      />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ) : (
              <div className={styles.nodata}>
                <Icons name="mood-cry" />
                <p>
                  <strong>{allFriendsSearch.searchQuery}</strong>라는 이름의
                  친구가 없어요
                </p>
              </div>
            )}
          </Accordion>
        </div>

        <DialogFooter className={styles.dialogFooter}>
          <DialogClose asChild>
            <Button variant="outline" size="lg">
              닫기
            </Button>
          </DialogClose>
          <Button onClick={onStartChat} disabled={selectedFriends.length === 0}>
            대화 시작하기 {selectedFriends.length > 0 && selectedFriends.length}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// 친구 선택 아이템 컴포넌트
interface FriendSelectItemProps {
  friend: Friend;
  isSelected: boolean;
  onSelect: (friend: Friend, checked: boolean) => void;
}

function FriendSelectItem({
  friend,
  isSelected,
  onSelect,
}: FriendSelectItemProps) {
  const handleToggle = () => {
    onSelect(friend, !isSelected);
  };
  return (
    <div className={styles.item}>
      <ProfileCard
        profile={friend.profile}
        profileImageUrl={getProfileThumbnailUrl(friend?.profile)}
        onClick={handleToggle}
      />

      <Checkbox
        id={`friend-${friend.accountId}`}
        checked={isSelected}
        onCheckedChange={(checked) => onSelect(friend, !!checked)}
      />
    </div>
  );
}
