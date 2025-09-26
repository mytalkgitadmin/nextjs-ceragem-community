import React from "react";
import {
  ChannelPreviewContent,
  ChannelPreviewMeta,
  ChannelPreviewGroupAvatars,
  ChannelPreviewSingleAvatar,
} from "./components";
import styles from "./ChannelPreview.module.css";
import { GroupChannel } from "@sendbird/chat/groupChannel";
import { useChannelMembers } from "@/domains/channel";

export interface ChannelPreviewProps {
  channel: GroupChannel;
}

const CHAT_TYPE_THRESHOLD = 2;

export const ChannelPreview: React.FC<ChannelPreviewProps> = ({ channel }) => {
  const members = useChannelMembers(channel.url);
  const isGroup = members.length > CHAT_TYPE_THRESHOLD;

  return (
    <div style={{ width: "100%" }}>
      <div className={`${styles.chat_list_item}`}>
        {isGroup ? (
          <ChannelPreviewGroupAvatars members={members} />
        ) : (
          <ChannelPreviewSingleAvatar members={members} />
        )}
        <ChannelPreviewContent channel={channel} />
        <ChannelPreviewMeta channel={channel} />
      </div>
    </div>
  );
};

ChannelPreview.displayName = "ChannelPreview";
