import React from "react";
import { ChannelAvatars } from "../ChannelAvatars";
import { ChannelPreviewMeta } from "./components/ChannelPreview.Meta";
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
        <ChannelAvatars channel={channel} />
        <ChannelPreviewContent channel={channel} />
        <ChannelPreviewMeta channel={channel} />
      </div>
    </div>
  );
};

ChannelPreview.displayName = "ChannelPreview";
