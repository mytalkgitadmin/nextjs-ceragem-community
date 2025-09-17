import { useMemo } from "react";

import { filterActiveMembers } from "../utils/memberFilters";

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
