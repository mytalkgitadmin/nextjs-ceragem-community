import React from "react";
import dayjs from "dayjs";
import styles from "./ChannelPreview.Meta.module.css";
import { Badge } from "@/shared-ui/display";

export interface ChannelPreviewMetaProps {
  channel: any;
  className?: string;
}

export const ChannelPreviewMeta: React.FC<ChannelPreviewMetaProps> = ({
  channel,
  className,
}) => {
  const formatDate = () => {
    const targetDate = dayjs(channel?.lastMessage?.createdAt);
    const yesterday = dayjs().subtract(1, "day").startOf("day");

    const isYesterday =
      targetDate.isAfter(yesterday) &&
      targetDate.isBefore(dayjs().startOf("day"));

    if (isYesterday) {
      return "어제";
    }

    const daysDiff = dayjs().diff(
      dayjs(channel?.lastMessage?.createdAt),
      "day"
    );

    if (daysDiff < 1) {
      return dayjs(channel?.lastMessage?.createdAt).format("a HH:mm");
    }

    return dayjs(channel?.lastMessage?.createdAt).format("YYYY-MM-DD");
  };

  return (
    <div className={`${styles.chat_list_meta} ${className || ""}`}>
      <div className={styles.chat_list_date}>{formatDate()}</div>

      {channel?.unreadMessageCount > 0 && (
        <Badge variant="danger" size="xs">
          {channel.unreadMessageCount}
        </Badge>
      )}
    </div>
  );
};

ChannelPreviewMeta.displayName = "ChannelPreviewMeta";
