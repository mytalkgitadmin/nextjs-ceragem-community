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
  str: string,
): 'korean' | 'english' | 'number' | 'emoticon' => {
  if (!str || str.length === 0) return 'emoticon';

  const firstChar = str.trim().substring(0, 1);
  if (!firstChar) return 'emoticon';

  if (CHARACTER_REGEXPS.korean.test(firstChar)) {
    return 'korean';
  }
  if (CHARACTER_REGEXPS.english.test(firstChar)) {
    return 'english';
  }
  if (CHARACTER_REGEXPS.number.test(firstChar)) {
    return 'number';
  }

  // 한글, 영어, 숫자가 아닌 모든 문자는 이모티콘으로 분류
  return 'emoticon';
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
  return nameA.localeCompare(nameB, 'ko-KR', {
    numeric: true, // 숫자가 포함된 경우 자연스러운 정렬 (예: "친구10"이 "친구2" 뒤에 오도록)
    sensitivity: 'base', // 대소문자 구분 없이 정렬
  });
};
