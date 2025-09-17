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
 * 멤버 이름을 검색하는 함수
 * @param member - 멤버 객체
 * @param searchTerm - 검색할 문자열
 * @returns 검색 결과
 */

export const searchMemberByName = (
  member: any,
  searchTerm: string
): boolean => {
  const memberName = getMemberName(member);
  return memberName.toLowerCase().includes(searchTerm.toLowerCase());
};

/**
 * 멤버 이름을 기준으로 채널명을 생성하는 함수
 * @param members - 멤버 배열
 * @returns 생성된 채널명
 */

export const generateChannelNameByMembers = (members: any[]): string => {
  let result = "";

  for (let i = 0; i < members.length; i++) {
    if (i > 0) {
      result += ", ";
    }
    result += getMemberName(members[i]) || "";

    if (i < members.length - 1 && result.length >= 50) {
      result += "...";
      break;
    }
  }
  return result;
};
