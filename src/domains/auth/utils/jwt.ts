import jwtDecode from "jwt-decode";

interface JWTPayload {
  exp?: number;
  iat?: number;
  [key: string]: any;
}

/**
 * JWT 토큰에서 만료시간을 읽어 maxAge(초)를 계산합니다.
 * @param jwt JWT 토큰 문자열
 * @param fallbackSeconds JWT 파싱 실패 시 사용할 기본값 (초)
 * @returns 쿠키 maxAge로 사용할 초 단위 값
 */
export function computeMaxAgeSeconds({
  jwt,
  fallbackSeconds,
}: {
  jwt: string;
  fallbackSeconds: number;
}): number {
  try {
    const decoded = jwtDecode<JWTPayload>(jwt);

    if (decoded.exp) {
      // exp는 Unix timestamp (초 단위)
      const now = Math.floor(Date.now() / 1000);
      const maxAge = decoded.exp - now;

      // 음수이거나 너무 작으면 fallback 사용
      if (maxAge > 0) {
        return maxAge;
      }
    }
  } catch (error) {
    console.warn("JWT decode failed:", error);
  }

  return fallbackSeconds;
}
