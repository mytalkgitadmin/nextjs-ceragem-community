/**
 * 정규 표현식을 이용한 문자 타입 판별
 */
const CHARACTER_REGEXPS = {
  korean: /^[ㄱ-ㅎ가-힣]/,
  english: /^[a-zA-Z]/,
  number: /^[0-9]/,
  all: /^[ㄱ-ㅎ가-힣0-9a-zA-Z]/,
} as const;

/**
 * 문자열의 첫 번째 문자 타입을 판별하는 함수
 * @param str - 판별할 문자열
 * @returns 문자 타입 ('korean' | 'english' | 'number' | 'emoticon')
 */
export const getFirstCharacterType = (
  str: string
): "korean" | "english" | "number" | "emoticon" => {
  if (!str || str.length === 0) return "emoticon";

  const firstChar = str.trim().substring(0, 1);
  if (!firstChar) return "emoticon";

  if (CHARACTER_REGEXPS.korean.test(firstChar)) {
    return "korean";
  }
  if (CHARACTER_REGEXPS.english.test(firstChar)) {
    return "english";
  }
  if (CHARACTER_REGEXPS.number.test(firstChar)) {
    return "number";
  }

  // 한글, 영어, 숫자가 아닌 모든 문자는 이모티콘으로 분류
  return "emoticon";
};

/**
 * 이름을 기준으로 정렬하는 함수
 * 정렬 순서: 한글 → 영어 → 숫자 → 이모티콘
 * @param nameA - 첫 번째 이름
 * @param nameB - 두 번째 이름
 * @returns 정렬 비교 결과
 */
export const compareByName = (nameA: string, nameB: string): number => {
  const typeA = getFirstCharacterType(nameA);
  const typeB = getFirstCharacterType(nameB);

  // 타입별 우선순위 정의 (한글 → 영어 → 숫자 → 이모티콘)
  const typeOrder = {
    korean: 0,
    english: 1,
    number: 2,
    emoticon: 3,
  } as const;

  // 타입이 다르면 타입 순으로
  if (typeA !== typeB) {
    return typeOrder[typeA] - typeOrder[typeB];
  }

  // 타입이 같으면 이름 기준(사전순)
  return nameA.localeCompare(nameB, "ko-KR", {
    numeric: true, // 숫자가 포함된 경우 자연스러운 정렬 (예: "친구10"이 "친구2" 뒤에 오도록)
    sensitivity: "base", // 대소문자 구분 없이 정렬
  });
};

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

/**
 * 채널명 생성 함수
 * 멤버 이름들을 콤마로 연결하여 채널명 생성 (최대 50자)
 * @param members 멤버 배열
 * @returns 생성된 채널명
 */
export const generateChannelName = (members: any[]): string => {
  let result = "";

  for (let i = 0; i < members.length; i++) {
    if (i > 0) {
      result += ", ";
    }
    result += getMemberName(members[i]) || "";

    // 길이가 50자를 넘으면 생략 표시 후 중단
    if (i < members.length - 1 && result.length >= 50) {
      result += "...";
      break;
    }
  }
  return result;
};
