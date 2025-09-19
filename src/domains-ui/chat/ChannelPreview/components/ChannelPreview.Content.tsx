import React from "react";
import styles from "./components.module.css";
import { GroupChannel } from "@sendbird/chat/groupChannel";
import { ChannelPreviewMessage } from "./ChannelPreview.Message";
import {
  useChannelInfo,
  useChannelName,
  useChannelMembers,
} from "@/domains/chat";

export interface ChannelPreviewContentProps {
  channel: GroupChannel;

  className?: string;
}

export const ChannelPreviewContent: React.FC<ChannelPreviewContentProps> = ({
  channel,

  className,
}) => {
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
          <span className={`${styles.chat_list_content_name}`}>
            {renderChannelName()}
          </span>
          {/* {renderIcons()} */}
        </div>
      </div>
      <div className={`${styles.chat_list_content_down}`}>
        <span className={styles.chat_list_content_message}>
          <ChannelPreviewMessage channel={channel} />
        </span>
      </div>
    </div>
  );
};

ChannelPreviewContent.displayName = "ChannelPreviewContent";
