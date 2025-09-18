import React from "react";
import styles from "./ChannelPreview.Content.module.css";
import { GroupChannel } from "@sendbird/chat/groupChannel";
import {
  useChannelInfo,
  useChannelName,
  useChannelMembers,
  shouldHideMessageForMe,
  renderFileMessage,
  renderMessage,
} from "@/domains/chat";
import { useAuth } from "@/domains/auth";

export interface ChannelPreviewContentProps {
  channel: GroupChannel;

  className?: string;
}

export const ChannelPreviewContent: React.FC<ChannelPreviewContentProps> = ({
  channel,

  className,
}) => {
  const { sendBirdId } = useAuth();
  const channelInfo = useChannelInfo(channel.url);
  const channelName = useChannelName(channel);
  const members = useChannelMembers(channel);

  const memberCount = members.length;

  const renderChannelName = () => {
    if (channelInfo?.channelType === "GROUP" && memberCount > 2) {
      return (
        <>
          {channelName}
          <span className={styles.chat_member_count}>{memberCount}</span>
        </>
      );
    }

    return channelName;
  };

  const renderLastMessage = () => {
    const lastMessage = channel?.lastMessage;

    if (!lastMessage) return "";
    if (shouldHideMessageForMe(sendBirdId, lastMessage)) {
      return "메시지가 삭제되었습니다.";
    }

    if (lastMessage.messageType === "file") {
      return renderFileMessage(lastMessage);
    }

    return renderMessage(lastMessage);
  };

  // const renderIcons = () => ( //TODO : 추후 추가
  //   <div style={{ minWidth: 40 }}>
  //     {pinnedChannels.includes(channel) && pin && <img src={pin} alt="pin" />}
  //     {myPushTriggerOption === "off" && nosound && (
  //       <img src={nosound} alt="nosound" />
  //     )}
  //     {memberCount > 2 && (
  //       <span className={styles.chat_member_count}>{memberCount}</span>
  //     )}
  //   </div>
  // );

  return (
    <div className={`${styles.chat_list_content} ${className || ""}`}>
      <div className={styles.chat_list_content_up}>
        <div className={styles.chat_list_content_name_wrap}>
          <span
            className={`${styles.chat_list_content_name} ${
              memberCount <= 2 ? styles.name_type_1 : styles.name_type_2
            }`}
          >
            {renderChannelName()}
          </span>
          {/* {renderIcons()} */}
        </div>
      </div>
      <div
        className={`${styles.chat_list_content_down} ${
          memberCount <= 2 ? styles.down_me : ""
        }`}
      >
        <span className={styles.chat_list_content_message}>
          {renderLastMessage()}
        </span>
      </div>
    </div>
  );
};

ChannelPreviewContent.displayName = "ChannelPreviewContent";
