"use client";

import { useMemo } from "react";
import { useChannelList } from "../queries";

export const useChannelData = (channelUrl: string) => {
  const { data: listData } = useChannelList(channelUrl); //TODO : 왜 이렇게 호출해야하는지 확인 필요

  const channelData = useMemo(() => {
    if (!listData?.resultData || !channelUrl) return null;
    return listData.resultData.find(
      (item: any) => item.channelUrl === channelUrl
    );
  }, [listData, channelUrl]);

  return channelData;
};
