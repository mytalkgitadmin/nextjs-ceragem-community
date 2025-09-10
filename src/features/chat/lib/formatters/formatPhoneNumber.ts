/**
 * 전화번호에 하이픈을 추가하는 함수
 * 다양한 전화번호 형태를 지원 (휴대폰, 일반전화, 1588 등)
 */
export function formatPhoneNumber(phone: string): string {
  // 입력값이 없거나 문자열이 아닌 경우 처리
  if (!phone || typeof phone !== 'string') {
    return '';
  }

  // 숫자만 추출 (기존 하이픈, 공백, 괄호 등 제거)
  const numbersOnly = phone.replace(/\D/g, '');

  // 숫자가 없으면 빈 문자열 반환
  if (!numbersOnly) {
    return '';
  }

  // 전화번호 길이에 따른 포맷팅
  switch (numbersOnly.length) {
    case 11: // 010-1234-5678 (휴대폰)
      if (
        numbersOnly.startsWith('010') ||
        numbersOnly.startsWith('011') ||
        numbersOnly.startsWith('016') ||
        numbersOnly.startsWith('017') ||
        numbersOnly.startsWith('018') ||
        numbersOnly.startsWith('019')
      ) {
        return `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3, 7)}-${numbersOnly.slice(7)}`;
      }
      break;

    case 10: // 02-1234-5678 (서울 지역번호) 또는 031-123-4567
      if (numbersOnly.startsWith('02')) {
        return `${numbersOnly.slice(0, 2)}-${numbersOnly.slice(2, 6)}-${numbersOnly.slice(6)}`;
      } else {
        return `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3, 6)}-${numbersOnly.slice(6)}`;
      }

    case 9: // 02-123-4567 (서울 지역번호 짧은 형태)
      if (numbersOnly.startsWith('02')) {
        return `${numbersOnly.slice(0, 2)}-${numbersOnly.slice(2, 5)}-${numbersOnly.slice(5)}`;
      }
      break;

    case 8: // 1588-1234 (대표번호)
      if (
        numbersOnly.startsWith('15') ||
        numbersOnly.startsWith('16') ||
        numbersOnly.startsWith('18')
      ) {
        return `${numbersOnly.slice(0, 4)}-${numbersOnly.slice(4)}`;
      }
      break;

    case 7: // 123-4567 (단축번호 등)
      return `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3)}`;

    case 4: // 내선번호 등
      return numbersOnly;

    default:
      // 기본 처리: 길이가 맞지 않으면 원본 숫자 반환
      return numbersOnly;
  }

  // 매칭되지 않는 경우 원본 숫자 반환
  return numbersOnly;
}

/**
 * 전화번호 유효성 검사 함수
 */
export function isValidPhoneNumber(phone: string): boolean {
  if (!phone) return false;

  const numbersOnly = phone.replace(/\D/g, '');

  // 휴대폰 번호 체크
  if (numbersOnly.length === 11 && /^01[016789]/.test(numbersOnly)) {
    return true;
  }

  // 일반 전화번호 체크 (02, 031~064)
  if (
    (numbersOnly.length === 9 || numbersOnly.length === 10) &&
    /^(02|0[3-6][1-4])/.test(numbersOnly)
  ) {
    return true;
  }

  // 대표번호 체크 (1588, 1577 등)
  if (numbersOnly.length === 8 && /^1[5-8]/.test(numbersOnly)) {
    return true;
  }

  return false;
}

/**
 * 다양한 전화번호 포맷 테스트 함수
 */
export function testPhoneFormatter() {
  const testCases = [
    '01012341234', // 010-1234-1234
    '0212345678', // 02-1234-5678
    '021234567', // 02-123-4567
    '0311234567', // 031-123-4567
    '03112345678', // 031-1234-5678
    '15881234', // 1588-1234
    '1577-1234', // 1577-1234 (이미 하이픈 있음)
    '010 1234 5678', // 010-1234-5678 (공백 제거)
    '010)1234(5678', // 010-1234-5678 (특수문자 제거)
    '1234567', // 123-4567
    '1234', // 1234 (내선번호)
    '', // 빈 문자열
    'abc123def456', // abc는 제거되고 123456만
  ];

  console.log('=== 전화번호 포맷팅 테스트 ===');
  testCases.forEach((testCase) => {
    const formatted = formatPhoneNumber(testCase);
    const isValid = isValidPhoneNumber(testCase);
    console.log(`"${testCase}" → "${formatted}" (유효: ${isValid})`);
  });
}
