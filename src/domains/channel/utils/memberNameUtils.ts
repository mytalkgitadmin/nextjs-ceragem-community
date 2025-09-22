import { sortMembersByPriority } from "./memberSortUtils";

/**
 * 멤버 이름을 가져오는 함수
 * @param member - 멤버 객체
 * @returns 멤버 이름
 */

export const getMemberName = (member: any): string => {
  return (
    member?.editedName || member?.syncName || member?.profile?.profileName || ""
  );
};

/**
 * 정렬된 멤버 이름을 콤마로 연결하여 문자열로 반환하는 함수
 * @param members - 멤버 배열
 * @returns 멤버 이름을 연결한 문자열
 */

export const joinSortedMemberNames = (members: any[]): string => {
  const sortedMembers = sortMembersByPriority(members);

  let result = "";

  for (let i = 0; i < sortedMembers.length; i++) {
    if (i > 0) {
      result += ", ";
    }
    result += getMemberName(sortedMembers[i]) || "";
    if (i < sortedMembers.length - 1 && result.length >= 50) {
      result += "...";
      break;
    }
  }
  return result;
};
