import React from "react";
import dayjs from "dayjs";
import styles from "./ChannelPreview.Meta.module.css";
import { Badge } from "@/shared-ui/display";
import { formatDate } from "@/shared/utils/dateUtils";

export interface ChannelPreviewMetaProps {
  channel: any;
  className?: string;
}

export const ChannelPreviewMeta: React.FC<ChannelPreviewMetaProps> = ({
  channel,
  className,
}) => {
  const createdAt = channel?.lastMessage?.createdAt;
  const formattedDate = formatDate(createdAt);

  return (
    <div className={`${styles.chat_list_meta} ${className || ""}`}>
      <div className={styles.chat_list_date}>{formattedDate}</div>

      {channel?.unreadMessageCount > 0 && (
        <Badge variant="danger" size="xs">
          {channel.unreadMessageCount}
        </Badge>
      )}
    </div>
  );
};

ChannelPreviewMeta.displayName = "ChannelPreviewMeta";
