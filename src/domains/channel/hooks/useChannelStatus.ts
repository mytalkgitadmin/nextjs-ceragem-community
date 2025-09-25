"use client";

import { useMemo, useCallback } from "react";
import { useChannelList } from "../queries";
import { ChannelStatus } from "../constants";

export const useChannelStatus = (channelUrl: string) => {
  const { data: listData } = useChannelList();

  const channelInfo = useMemo(() => {
    if (!listData?.resultData || !channelUrl) return null;
    return listData.resultData.find(
      (item: any) => item.channelUrl === channelUrl
    );
  }, [listData, channelUrl]);

  //   if (channelInfo?.channelType === 'MY') { //CHECK: 패밀리타운에 구현되어 있음
  //     // MY 타입 채널(메모)은 항상 메시지 입력 가능
  //     return ChannelStatus.ACTIVE;
  //   }

  const members = channelInfo?.members.filter(
    (member: any) => member?.relationType !== "ME"
  );

  if (members.length === 0) {
    return ChannelStatus.NO_MEMBERS;
  }

  if (members.every((item: any) => item?.accountStatus === "EXIT")) {
    return ChannelStatus.USER_NOT_FOUND;
  }

  if (members.every((item: any) => item?.relationType === "BLOCK")) {
    return ChannelStatus.BLOCKED_USER;
  }

  if (
    members.every(
      (item: any) =>
        item?.relationType === "LEAVE" || item?.participantType === "KICKED"
    )
  ) {
    return ChannelStatus.LEFT_CHAT;
  }

  return ChannelStatus.ACTIVE;
};
