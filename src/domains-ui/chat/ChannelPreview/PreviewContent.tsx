import React from "react";
import styles from "./ChannelPreview.module.css";

export interface PreviewContentProps {
  channelInfo?: any;
  channelName: string;
  memberCount: number;
  channel: any;
  pinnedChannels: any[];
  myPushTriggerOption: string;
  lastMessage: (message: any) => string;
  home?: string;
  pin?: string;
  nosound?: string;
  className?: string;
}

export const PreviewContent: React.FC<PreviewContentProps> = ({
  channelInfo,
  channelName,
  memberCount,
  channel,
  pinnedChannels,
  myPushTriggerOption,
  lastMessage,
  home,
  pin,
  nosound,
  className,
}) => {
  const renderChannelName = () => {
    if (channelInfo?.channelType === "FAMILY") {
      return (
        <div className={styles.me_wrap}>
          {home && <img src={home} className={styles.me_wrap_img} alt="home" />}
          {channelName}
        </div>
      );
    }

    if (channelInfo?.channelType === "GROUP" && memberCount <= 2) {
      return (
        <>
          {channelName}
          <span className={styles.chat_member_count}>{memberCount}</span>
        </>
      );
    }

    return channelName;
  };

  const renderIcons = () => (
    <div style={{ minWidth: 40 }}>
      {pinnedChannels.includes(channel) && pin && <img src={pin} alt="pin" />}
      {myPushTriggerOption === "off" && nosound && (
        <img src={nosound} alt="nosound" />
      )}
      {memberCount > 2 && (
        <span className={styles.chat_member_count}>{memberCount}</span>
      )}
    </div>
  );

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
          {renderIcons()}
        </div>
      </div>
      <div
        className={`${styles.chat_list_content_down} ${
          memberCount <= 2 ? styles.down_me : ""
        }`}
      >
        <span className={styles.chat_list_content_message}>
          {lastMessage(channel?.lastMessage)}
        </span>
      </div>
    </div>
  );
};

PreviewContent.displayName = "PreviewContent";
