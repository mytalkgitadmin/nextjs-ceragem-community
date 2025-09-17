import { includesIgnoreCase, isEmpty } from "@/shared/utils/stringUtils";
import { searchMemberByName } from "./memberNames";

/**
 * 채널명에 검색어가 포함되어 있는지 확인
 * @param channelName - 채널명
 * @param searchTerm - 검색어
 * @returns 포함 여부
 */

export const searchChannelByName = (
  channelName: string,
  searchTerm: string
): boolean => {
  if (!searchTerm.trim()) return true;
  return includesIgnoreCase(channelName, searchTerm);
};

/**
 * 멤버명에 검색어가 포함되어 있는지 확인
 * @param members - 멤버 배열
 * @param searchTerm - 검색어
 * @returns 포함 여부
 */

export const hasMatchingMember = (
  members: any[],
  searchTerm: string
): boolean => {
  if (!members || members.length === 0) return false;
  if (!searchTerm.trim()) return true;

  return members.some((member) => searchMemberByName(member, searchTerm));
};

/**
 * 채널명과 멤버명에 검색어가 포함되어 있는지 확인
 * @param channelName - 채널명
 * @param members - 멤버 배열
 * @param searchTerm - 검색어
 * @returns 포함 여부
 */

export const matchesSearchCriteria = (
  channelName: string,
  members: any[],
  searchTerm: string
) => {
  if (isEmpty(searchTerm)) {
    return { isTitle: true, isMember: true, shouldShow: true };
  }

  const isTitle = searchChannelByName(channelName, searchTerm);
  const isMember = hasMatchingMember(members, searchTerm);

  return { isTitle, isMember, shouldShow: isTitle || isMember };
};
