import { Badge } from "@/shared-ui";
import { BaseMessage } from "@sendbird/chat/message";
import styles from "./Message.Unread.module.css";
import { useChannelMembers } from "@/domains/channel";
import { useGroupChannelContext } from "@sendbird/uikit-react/GroupChannel/context";

export interface MessageUnreadProps {
  message: BaseMessage;
}

export const MessageUnread = ({ message }: MessageUnreadProps) => {
  const channelMembers = useChannelMembers(message.channelUrl);
  const { currentChannel } = useGroupChannelContext();
  const unreadCount = currentChannel?.getUnreadMemberCount?.(message as any);

  if (!(message?.sendingStatus === "succeeded") || unreadCount === 0) {
    return null;
  }

  const isDot = channelMembers.length <= 2;

  return (
    <div className={`${styles.unRead} ${isDot ? styles.dot : ""}`}>
      <span>{unreadCount}</span>
    </div>
  );
};
