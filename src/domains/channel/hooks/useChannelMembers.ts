import { GroupChannel } from "@sendbird/chat/groupChannel";
import { useChannelInfo } from "./useChannelInfo";
import { sortMembersByPriority } from "../utils/memberSortUtils";

export const useChannelMembers = (channelUrl: string) => {
  const channelInfo = useChannelInfo(channelUrl);

  let members = [];

  if (channelInfo) {
    if (channelInfo.members) {
      members = channelInfo.members.filter(
        (member: any) =>
          member.accountStatus === "NORMAL" &&
          member.participantType !== "KICKED"
      );
      members = sortMembersByPriority(members);
    }
    // else {  //CHECK : 버그 발생 시 주석 해제
    //   members = channel.members;
    // }
  }

  return members;
};
