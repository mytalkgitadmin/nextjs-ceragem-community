import React from "react";
import { ChatMemberAvatars } from "../ChatMemberAvatars";
// import { PreviewContent } from "./components/ChannelPreview.Content";
// import { PreviewMeta } from "./components/ChannelPreview.Meta";
import { ChannelPreviewContent } from "./components/ChannelPreview.Content";
import styles from "./ChannelPreview.module.css";
import { GroupChannel } from "@sendbird/chat/groupChannel";

export interface ChannelPreviewProps {
  channel: GroupChannel;
}

export const ChannelPreview: React.FC<ChannelPreviewProps> = ({ channel }) => {
  return (
    <div style={{ width: "100%" }}>
      <div className={`${styles.chat_list_item}`}>
        <ChatMemberAvatars channel={channel} />
        <ChannelPreviewContent channel={channel} />

        {/* <PreviewContent
          channelInfo={channelInfo}
          channelName={channelName}
          memberCount={memberCount}
          channel={channel}
          pinnedChannels={pinnedChannels}
          myPushTriggerOption={myPushTriggerOption}
          lastMessage={lastMessage}
          home={home}
          pin={pin}
          nosound={nosound}
        /> */}

        {/* <PreviewMeta channel={channel} isYesterday={isYesterday} /> */}
      </div>
    </div>
  );
};

ChannelPreview.displayName = "ChannelPreview";
