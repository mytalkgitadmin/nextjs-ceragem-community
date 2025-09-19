import { GroupChannel } from "@sendbird/chat/groupChannel";
import { useChannelInfo } from "./useChannelInfo";
import { isEmpty } from "lodash-es";
import { useMemo } from "react";
import {
  getGroupChannelName,
  getDirectChannelName,
} from "../utils/channelNameUtils";

export const useChannelName = (channel: GroupChannel) => {
  const channelInfo = useChannelInfo(channel.url);

  const channelName = useMemo(() => {
    if (!channelInfo) {
      return channel.name;
    }

    if (!isEmpty(channelInfo.channelName)) {
      // 커스텀 채널명이 설정된 경우
      return channelInfo.channelName;
    }

    // 채널 타입별 처리
    switch (channelInfo.channelType) {
      case "MY":
        return "MY 메모";

      case "DIRECT":
        return getDirectChannelName(channelInfo.members);

      case "GROUP":
      case "FAMILY":
        return getGroupChannelName(channelInfo.members);

      default:
        return channel.name;
    }
  }, [channel.customType, channel.name, channelInfo]);

  return channelName;
};
