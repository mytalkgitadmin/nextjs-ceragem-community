import { GroupChannel } from "@sendbird/chat/groupChannel";
import { useChannelInfo } from "./useChannelInfo";
import { useActiveMembers } from "./useActiveMembers";
import { useMemo } from "react";
import {
  generateChannelNameByType,
  isDefaultChannelName,
} from "../utils/channelNames";

export const useChannelName = (channel: GroupChannel) => {
  const channelUrl = channel.url || "";

  const channelInfo = useChannelInfo(channelUrl);
  const activeMembers = useActiveMembers(channelInfo, false);

  const channelName = useMemo(() => {
    if (!isDefaultChannelName(channel.name)) {
      // 커스텀 채널명이 설정된 경우
      return channel.name;
    }

    // 채널 타입별로 채널명 생성
    return generateChannelNameByType(channel.customType, activeMembers);
  }, [channel.customType, channel.name, activeMembers]);

  return channelName;
};
