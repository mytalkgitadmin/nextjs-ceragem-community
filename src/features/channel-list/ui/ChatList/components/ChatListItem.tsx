import type { GroupChannel } from "@sendbird/chat/groupChannel";

import { Icons } from "@/shared/ui/icon";
import { formatChatListTime } from "@/features/channel-list/lib/format-chat-list-time";
import { GroupAvatar } from "@/entities/profile/ui";

import { MESSAGE_LIMITS } from "@/entities/message/config/chat";

import { renderMessageContent } from "@/widgets/message-render";
import { useChatLayoutStore } from "@/features/channel-view/model/useChatLayoutStore";

import styles from "./ChatListItem.module.scss";
import useChannelInfo from "@/features/channel-member-list/model/useChannelInfo";

export default function ChatListItem({
  channel,
  isSelected,
}: {
  channel: GroupChannel;
  isSelected: boolean;
}) {
  const { customType, memberCount, lastMessage } = channel;
  const { isChatListVisible, closeChatList } = useChatLayoutStore();
  const channelInfo = useChannelInfo(channel);

  const handleClick = () => {
    const isMobile = window.innerWidth <= 640;

    if (isMobile && isChatListVisible) {
      closeChatList();
    }
  };
  return (
    <div
      className={`${styles.item} ${isSelected ? styles.active : ""}`}
      data-channel-type={customType}
      onClick={handleClick}
    >
      <div className={styles.flexWrap}>
        {/* 프로필 이미지 */}
        <GroupAvatar
          members={channelInfo.membersList}
          customType={customType}
        />

        <div className={styles.texts}>
          <p className={styles.title}>
            {customType === "FAMILY" && (
              <Icons name="homeFilled" color={"var(--primary)"} />
            )}
            <strong className={`${styles.channelTitle}`}>
              {channelInfo.channelName}
            </strong>

            {/* 참여자 수 표시 */}
            {(customType === "GROUP" || customType === "FAMILY") && (
              <span className={styles.count}>{memberCount}</span>
            )}
          </p>
          <p className={styles.lastMsg}>
            {lastMessage &&
              renderMessageContent(lastMessage, MESSAGE_LIMITS.PREVIEW)}
          </p>
        </div>
        <div className={styles.right}>
          {/* 날짜 */}
          {lastMessage?.createdAt && (
            <p className={styles.date}>
              {formatChatListTime(lastMessage.createdAt)}
            </p>
          )}
          {channel.unreadMessageCount > 0 && (
            <p className={styles.unread}>
              <span className="a11y-hidden">읽지 않은 메시지 개수</span>
              {channel.unreadMessageCount > 999
                ? "999+"
                : channel.unreadMessageCount}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
