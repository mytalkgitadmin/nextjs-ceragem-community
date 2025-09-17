import React from "react";
import { ChatMemberAvatars } from "../ChatMemberAvatars";
import { PreviewContent } from "./PreviewContent";
import { PreviewMeta } from "./PreviewMeta";
import styles from "./ChannelPreview.module.css";
import { GroupChannel } from "@sendbird/chat/groupChannel";
import {
  useChannelInfo,
  useChannelName,
  useChannelMembers,
} from "@/domains/chat";

export interface ChannelPreviewProps {
  // 채널 정보
  channel: GroupChannel;
}

const CHAT_TYPE_THRESHOLD = 2;

export const ChannelPreview: React.FC<ChannelPreviewProps> = ({ channel }) => {
  const channelName = useChannelName(channel);
  const channelInfo = useChannelInfo(channel.url);
  const members = useChannelMembers(channel);

  // if (!isTitle && !isMemeber) { //TODO: Search에서 사용
  //   return null;
  // }

  const isGroup = members.length > CHAT_TYPE_THRESHOLD;

  return (
    <div style={{ width: "100%" }}>
      <div
        className={`${styles.chat_list_item} ${
          isGroup ? styles.chat_list_group : styles.chat_list
        }`}
      >
        <ChatMemberAvatars members={members} isGroup={isGroup} />

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
