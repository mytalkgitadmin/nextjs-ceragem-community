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
