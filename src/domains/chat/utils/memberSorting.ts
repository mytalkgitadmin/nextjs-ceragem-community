import { compareByName } from "@/shared/utils/stringUtils";
import { getMemberName } from "./memberNames";

/**
 * 멤버 우선순위를 반환하는 함수
 * @param member - 멤버 객체
 * @returns 멤버 우선순위 (숫자가 작을수록 높은 우선순위)
 */

export const getMemberPriority = (member: any): number => {
  if (member.participantType === "MASTER") return 1;
  if (member.relationType === "ME") return 2;
  if (member.relationType === "NORMAL") return 3;
  return 4;
};

/**
 * 멤버 목록을 우선순위에 따라 정렬하는 함수
 * @param members - 멤버 배열
 * @returns 정렬된 멤버 배열
 */

export const sortMembersByPriority = (members: any[]): any[] => {
  if (!members || members.length === 0) return members;

  try {
    return [...members].sort((a, b) => {
      // 1. 우선순위별 정렬
      const aPriority = getMemberPriority(a);
      const bPriority = getMemberPriority(b);

      if (aPriority !== bPriority) {
        return aPriority - bPriority;
      }

      // 2. 우선순위가 같으면 이름으로 오름차순 정렬
      const aName = getMemberName(a);
      const bName = getMemberName(b);

      return compareByName(aName, bName);
    });
  } catch (error) {
    console.error("멤버 목록 정렬 중 오류 발생:", error);
    return members;
  }
};
