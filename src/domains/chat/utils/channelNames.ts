import { GroupChannel } from "@sendbird/chat/groupChannel";
import { getMemberName, joinSortedMemberNames } from "./memberNames";
import { sortMembersByPriority } from "./memberSorting";

/**
 * 1:1 채널명을 생성하는 함수
 * @param members - 멤버 배열
 * @returns 생성된 채널명
 */

export const getDirectChannelName = (members: any[]): string => {
  const otherMember = members.find((member) => member.relationType !== "ME");

  if (!otherMember || otherMember.accountStatus === "EXIT") {
    return "대화상대 없음";
  }

  return getMemberName(otherMember);
};

/**
 * 그룹 채널명을 생성하는 함수
 * @param members - 멤버 배열
 * @returns 생성된 채널명
 */

export const getGroupChannelName = (members: any[]): string => {
  const activeOtherMembers = members.filter(
    (member) =>
      member.relationType !== "ME" &&
      member.accountStatus === "NORMAL" &&
      member.participantType !== "KICKED"
  );

  if (!activeOtherMembers || activeOtherMembers.length < 1) {
    return "대화상대 없음";
  }

  return joinSortedMemberNames(activeOtherMembers);
};
