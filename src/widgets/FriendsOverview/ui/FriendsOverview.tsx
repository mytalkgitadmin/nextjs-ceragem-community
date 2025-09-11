"use client";
import { useAuth } from "@/features/auth";
import { Accordion } from "@/shared/ui/accordion";
import { ProfileItem } from "@/widgets/Profile/ui/ProfileItem";
import { NotificationList } from "@/widgets/Notifications/ui/NotificationList";
import { useCategorizedFriends } from "@/features/friend/hooks/useCategorizedFriends";
import { useNotiList } from "@/features/notifications/api";
import { IconButton } from "@/shared/ui/IconButton";
import FriendsList from "./FriendsList";

import styles from "./FriendsOverview.module.scss";

export default function FriendsOverview() {
  const { userProfile } = useAuth();
  const { data: notiList } = useNotiList();
  const {
    allFriends,
    favoriteFriends,
    newFriends,
    updatedFriends,
    requestFriends,
  } = useCategorizedFriends();

  if (!userProfile) return null;

  return (
    <div className="pageContainer">
      <div className={styles.friendsContainer}>
        {/* 내 프로필 섹션 */}
        <div className={styles.myProfile}>
          <div className={styles.myProfileInner}>
            <div className={styles.edit}>
              <IconButton name="edit" text="편집" size={24} />
            </div>
            <ProfileItem
              profile={userProfile.profile}
              accountId={userProfile.accountId}
              editedName={userProfile.editedName}
              syncName={userProfile.syncName}
              isMyProfile
              type="talk"
            />
          </div>
        </div>

        {/* 친구 목록 섹션 */}
        <div className={styles.friendsList}>
          <h2 className={styles.titleFriend}>친구</h2>
          <Accordion
            type="multiple"
            defaultValue={["item1", "item2", "item3", "item4"]}
            className={styles.AccordionWrap}
          >
            {updatedFriends.length > 0 && (
              <FriendsList
                index={1}
                title="프로필 업데이트한 친구"
                friends={updatedFriends}
                horizon
              />
            )}
            {newFriends.length > 0 && (
              <FriendsList
                index={2}
                title="새로 연결된 친구"
                friends={newFriends}
              />
            )}
            {favoriteFriends && (
              <FriendsList
                index={3}
                title="즐겨찾는 친구"
                friends={favoriteFriends}
              />
            )}
            {allFriends && (
              <FriendsList index={4} title="전체" friends={allFriends} />
            )}
          </Accordion>
        </div>

        {/* 알림 섹션 */}
        <div className={styles.alarmList}>
          <div>
            {requestFriends.length > 0 && (
              <FriendsList
                title="💌 새로운 친구 요청이 도착했어요!"
                friends={requestFriends}
              />
            )}
          </div>

          <NotificationList notiList={notiList || []} />
        </div>
      </div>
    </div>
  );
}
