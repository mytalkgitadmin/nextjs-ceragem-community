import { GroupChannel } from "@sendbird/chat/groupChannel";
import { useChannelInfo } from "./useChannelInfo";
import { sortMembersByPriority } from "../utils/memberSorting";

export const useChannelMembers = (channel: GroupChannel) => {
  const channelInfo = useChannelInfo(channel.url);

  let members = channelInfo?.members;

  if (members) {
    members = members.filter(
      (member: any) =>
        member.accountStatus === "NORMAL" && member.participantType !== "KICKED"
    );
    members = sortMembersByPriority(members);
  }

  return members ?? channel.members;
};
