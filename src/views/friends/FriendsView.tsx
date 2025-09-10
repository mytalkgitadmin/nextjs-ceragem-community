"use client";
import { useAuth } from "@/features/auth";
import { Accordion } from "@/shared/ui/accordion";

import { ProfileItem } from "@/widgets/Profile/ui/ProfileItem";

import FriendsList from "./FriendsList";
import styles from "./Friends.module.scss";
import { useNotiList } from "@/features/notifications/api";
import { NotificationList } from "@/widgets/Notifications/ui/NotificationList";
import { useCategorizedFriends } from "@/features/friend/hooks/useCategorizedFriends";
import { IconButton } from "@/shared/ui/IconButton";

export default function FriendsPage() {
  const { userProfile } = useAuth();
  const { data: notiList } = useNotiList();
  const {
    allFriends,
    favoriteFriends,
    newFriends,
    updatedFriends,
    requestFriends,
  } = useCategorizedFriends();

  return (
    <div className="pageContainer">
      <header className="header">
        <h2>친구</h2>
        <div>
          <IconButton name="user-plus" text="친구 친구추가" />
          <IconButton name="search" text="친구 검색" />
          <IconButton name="settings" text="친구 설정" />
        </div>
      </header>
      <div className={styles.pageWrap}>
        <div className={styles.friends}>
          {/* [TODO] 프로필 업데이트 */}

          <h2 className={styles.title}>
            👋 반가워요! <strong>{userProfile?.profile.profileName}</strong>님
          </h2>
          <div className={styles.box}>
            {userProfile && (
              <ProfileItem
                profile={userProfile?.profile}
                accountId={userProfile?.accountId}
                editedName={userProfile.editedName}
                syncName={userProfile.syncName}
                isMyProfile
              />
            )}
          </div>

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
