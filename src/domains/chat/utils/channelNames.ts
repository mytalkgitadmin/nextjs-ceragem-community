import { GroupChannel } from "@sendbird/chat/groupChannel";
import { getMemberName, generateChannelNameByMembers } from "./memberNames";
import { sortMembersByPriority } from "./memberSorting";

/**
 * 기본 채널명인지 확인
 * @param name - 채널명
 * @returns 기본 채널명인지 여부
 */

const DEFAULT_CHANNEL_NAMES = [
  "메모 채널",
  "그룹 채널",
  "가족 채널",
  "1:1 채널",
  "Private 채널",
];

export const isDefaultChannelName = (name: GroupChannel["name"]): boolean => {
  return DEFAULT_CHANNEL_NAMES.includes(name);
};

/**
 * 채널 타입에 따라 채널명을 생성하는 함수
 * @param customType - 채널 타입
 * @param members - 멤버 배열
 * @returns 생성된 채널명
 */

export const generateChannelNameByType = (
  customType: GroupChannel["customType"],
  members: any[]
): string => {
  switch (customType) {
    case "MY":
      return "MY 메모";

    case "DIRECT":
      if (!members || members.length === 0) {
        return "대화 상대 없음";
      }
      return getMemberName(members[0]);

    case "GROUP":
    case "FAMILY":
      if (!members || members.length === 0) {
        return "대화 상대 없음";
      }
      const sortedMembers = sortMembersByPriority(members, customType);
      return generateChannelNameByMembers(sortedMembers);

    default:
      return "알 수 없는 채널";
  }
};
