/**
 * 유효한 멤버인지 확인 (정상 상태 + 강퇴되지 않음)
 * @param member - 멤버 객체
 * @returns 유효한 멤버인지 여부
 */

export const isValidMember = (member: any): boolean => {
  return (
    member.accountStatus === "NORMAL" && member.participantType !== "KICKED"
  );
};

/**
 * 유효한 멤버 목록 필터링
 * @param members - 멤버 배열
 * @returns 유효한 멤버 목록
 */

export const filterValidMembers = (members: any[]): any[] => {
  if (!members) return [];
  return members.filter(isValidMember);
};

/**
 * 활성 멤버 목록 필터링
 * @param members - 멤버 배열
 * @param includeMe - 나 포함 여부
 * @returns 활성 멤버 목록
 */

export const filterActiveMembers = (
  members: any[],
  includeMe: boolean = false
): any[] => {
  if (!members) return [];

  return members.filter((member) => {
    const isActive =
      member.accountStatus !== "EXIT" && member.participantType !== "KICKED";
    const shouldInclude = includeMe || member.relationType !== "ME";

    return isActive && shouldInclude;
  });
};
