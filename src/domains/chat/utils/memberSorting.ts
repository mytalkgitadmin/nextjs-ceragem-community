import { compareByName } from "@/shared/utils/stringUtils";
import { getMemberName } from "./memberNames";

/**
 * 채널 타입에 따른 멤버 우선순위를 반환하는 함수
 * @param member - 멤버 객체
 * @param channelType - 채널 타입
 * @returns 멤버 우선순위 (숫자가 작을수록 높은 우선순위)
 */

export const getMemberPriority = (
  member: any,
  channelType?: string
): number => {
  if (channelType === "DIRECT") {
    if (member.relationType === "ME") return 1;
    return 2;
  }

  if (member.participantType === "MASTER") return 1;
  if (member.relationType === "ME") return 2;
  if (member.relationType === "NORMAL") return 3;
  return 4;
};

/**
 * 멤버 목록을 (채널 타입에 따른)우선순위에 따라 정렬하는 함수
 * @param members - 멤버 배열
 * @param channelType - 채널 타입
 * @returns 정렬된 멤버 배열
 */

export const sortMembersByPriority = (
  members: any[],
  channelType?: string
): any[] => {
  if (!members || members.length === 0) return members;

  try {
    return [...members].sort((a, b) => {
      const aPriority = getMemberPriority(a, channelType);
      const bPriority = getMemberPriority(b, channelType);

      if (aPriority !== bPriority) {
        return aPriority - bPriority;
      }

      const aName = getMemberName(a);
      const bName = getMemberName(b);

      return compareByName(aName, bName);
    });
  } catch (error) {
    console.error("멤버 목록 정렬 중 오류 발생:", error);
    return members;
  }
};
