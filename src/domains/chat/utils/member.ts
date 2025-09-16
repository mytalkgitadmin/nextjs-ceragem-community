import { compareByName } from "./sorting";

/**
 * 멤버 이름을 가져오는 함수
 * 우선순위: editedName > syncName > profileName
 * @param member 멤버 객체
 * @returns 멤버 이름
 */
export const getMemberName = (member: any): string => {
  return (
    member?.editedName || member?.syncName || member?.profile?.profileName || ""
  );
};

/**
 * 채널 타입에 따른 멤버 우선순위를 반환하는 함수
 * @param member 멤버 객체
 * @param channelType 채널 타입
 * @returns 우선순위 (숫자가 작을수록 높은 우선순위)
 */
export const getMemberPriority = (
  member: any,
  channelType?: string
): number => {
  // DIRECT 채널의 경우: 나 → 상대방
  if (channelType === "DIRECT") {
    if (member.relationType === "ME") return 1;
    return 2;
  }

  // GROUP/FAMILY 채널의 경우: 방장 → 나 → 일반 멤버 → 기타
  if (member.participantType === "MASTER") return 1;
  if (member.relationType === "ME") return 2;
  if (member.relationType === "NORMAL") return 3;
  return 4;
};

/**
 * 멤버 배열을 우선순위와 이름에 따라 정렬하는 함수
 * @param members 멤버 배열
 * @param channelType 채널 타입 (DIRECT, GROUP, FAMILY 등)
 * @returns 정렬된 멤버 배열
 */
export function sortMembersByPriority(
  members: any[],
  channelType?: string
): any[] {
  if (!members || members.length === 0) return members;

  try {
    return [...members].sort((a, b) => {
      // 1. 채널 타입에 따른 우선순위별 정렬
      const aPriority = getMemberPriority(a, channelType);
      const bPriority = getMemberPriority(b, channelType);

      if (aPriority !== bPriority) {
        return aPriority - bPriority;
      }

      // 2. 우선순위가 같으면 이름으로 정렬 (한글 → 영어 → 숫자 → 이모티콘)
      const aName = getMemberName(a);
      const bName = getMemberName(b);

      return compareByName(aName, bName);
    });
  } catch (error) {
    console.error("멤버 목록 정렬 중 오류 발생:", error);
    return members;
  }
}
