/**
 * URL 관련 유틸리티 함수들
 */

/**
 * 텍스트에서 URL을 추출하는 함수
 * @param text - URL을 찾을 텍스트
 * @returns 추출된 URL 또는 빈 문자열
 */
export const getUrlLink = (text: string): string => {
  const regExp =
    /^(http[s]?:\/\/(?:www\.)?|www\.)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}(:\d+)?(\/[^\s]*)?$/i;

  let urlLink = '';

  // 정규식으로 URL 찾기
  const matches = text.match(regExp);
  if (matches && matches[0]) {
    urlLink = matches[0];
  }

  if (urlLink.length > 0) {
    return checkUrl(urlLink);
  }

  return '';
};

/**
 * URL 형식을 검증하고 수정하는 함수
 * @param urlString - 검증할 URL 문자열
 * @param protocol - 기본 프로토콜 (기본값: 'https')
 * @param host - 기본 호스트 (기본값: '')
 * @returns 수정된 URL 문자열
 */
export const checkUrl = (
  urlString: string,
  protocol: string = 'https',
  host: string = '',
): string => {
  if (!urlString) {
    return '';
  }

  try {
    // 'www'로 시작하는 경우 프로토콜 추가
    if (urlString.startsWith('www.')) {
      urlString = `${protocol}://${urlString}`;
    }
    // '//'로 시작하는 경우 프로토콜만 추가
    else if (urlString.startsWith('//')) {
      urlString = `${protocol}:${urlString}`;
    }
    // http로 시작하지 않는 경우
    else if (!urlString.startsWith('http')) {
      // URL 객체로 파싱해서 host가 없는지 체크
      try {
        const url = new URL(`${protocol}://${urlString}`);
        if (!url.hostname) {
          urlString = `${protocol}://${host}`;
          const path = urlString.replace(/\.\.?\//g, '');
          if (path.startsWith('/')) {
            urlString = `${urlString}${path}`;
          } else {
            urlString = `${urlString}/${path}`;
          }
        }
      } catch {
        urlString = `${protocol}://${urlString}`;
      }
    }

    return urlString;
  } catch (error) {
    console.log(error);
    return urlString;
  }
};
