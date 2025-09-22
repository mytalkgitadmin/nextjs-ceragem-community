/**
 * 문자열의 첫 번째 문자 타입을 판별하는 함수
 * @param str - 판별할 문자열
 * @returns 문자 타입 ('korean' | 'english' | 'number' | 'emoticon')
 */

const CHARACTER_REGEXPS = {
  korean: /^[ㄱ-ㅎ가-힣]/,
  english: /^[a-zA-Z]/,
  number: /^[0-9]/,
} as const;

export const getFirstCharacterType = (
  str: string
): "korean" | "english" | "number" | "emoticon" => {
  if (!str || str.length === 0) return "emoticon";

  const firstChar = str.trim().substring(0, 1);
  if (!firstChar) return "emoticon";

  if (CHARACTER_REGEXPS.korean.test(firstChar)) return "korean";
  if (CHARACTER_REGEXPS.english.test(firstChar)) return "english";
  if (CHARACTER_REGEXPS.number.test(firstChar)) return "number";

  return "emoticon";
};

/**
 * 이름을 기준으로 정렬하는 함수
 * @param nameA - 첫 번째 이름
 * @param nameB - 두 번째 이름
 * @returns 정렬 비교 결과 (숫자가 작을수록 높은 우선순위)
 */
export const compareByName = (nameA: string, nameB: string): number => {
  const typeA = getFirstCharacterType(nameA);
  const typeB = getFirstCharacterType(nameB);

  const typeOrder = { korean: 0, english: 1, number: 2, emoticon: 3 } as const;

  if (typeA !== typeB) {
    return typeOrder[typeA] - typeOrder[typeB];
  }

  return nameA.localeCompare(nameB, "ko-KR", {
    numeric: true,
    sensitivity: "base",
  });
};

/**
 * 문자열에 대소문자 구분 없이 포함되어 있는지 확인하는 함수
 * @param text - 확인할 문자열
 * @param searchTerm - 검색할 문자열
 * @returns 포함 여부
 */

export const includesIgnoreCase = (
  text: string,
  searchTerm: string
): boolean => {
  if (!text || !searchTerm) return false;
  return text.toLowerCase().includes(searchTerm.toLowerCase());
};

/**
 * 문자열을 JSON 객체로 파싱하는 함수
 * @param value - 파싱할 문자열
 * @returns JSON 객체
 */
export const parseJson = (value: string) => {
  return value ? JSON.parse(value) : null;
};
