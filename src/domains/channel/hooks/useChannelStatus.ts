"use client";

import { useMemo, useCallback } from "react";
import { useChannelList } from "../queries";
import { CHANNEL_STATUS } from "../constants";

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
  //     return CHANNEL_STATUS.ACTIVE;
  //   }

  if (!channelInfo?.members) {
    return CHANNEL_STATUS.NO_MEMBERS;
  }

  const members = channelInfo.members.filter(
    (member: any) => member?.relationType !== "ME"
  );

  if (members.length === 0) {
    return CHANNEL_STATUS.NO_MEMBERS;
  }

  if (members.every((item: any) => item?.accountStatus === "EXIT")) {
    return CHANNEL_STATUS.USER_NOT_FOUND;
  }

  if (members.every((item: any) => item?.relationType === "BLOCK")) {
    return CHANNEL_STATUS.BLOCKED_USER;
  }

  if (
    members.every(
      (item: any) =>
        item?.relationType === "LEAVE" || item?.participantType === "KICKED"
    )
  ) {
    return CHANNEL_STATUS.LEFT_CHAT;
  }

  return CHANNEL_STATUS.ACTIVE;
};
