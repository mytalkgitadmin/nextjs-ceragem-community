import { useMemo } from "react";

import { filterActiveMembers } from "../utils/memberFilterUtils";

export const useActiveMembers = (
  channelInfo: any,
  includeMe: boolean = false
) => {
  const { members } = channelInfo;

  const activeMembers = useMemo(() => {
    return filterActiveMembers(members, includeMe);
  }, [members, includeMe]);

  return activeMembers;
};
