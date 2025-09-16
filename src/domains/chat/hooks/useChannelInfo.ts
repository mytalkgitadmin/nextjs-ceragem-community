"use client";

import { useMemo, useCallback } from "react";
import { useChannelList } from "../queries";

export const useChannelInfo = (channelUrl: string) => {
  const { data: listData } = useChannelList();

  const channelInfo = useMemo(() => {
    if (!listData?.resultData || !channelUrl) return null;
    return listData.resultData.find(
      (item: any) => item.channelUrl === channelUrl
    );
  }, [listData, channelUrl]);

  return channelInfo;
};
