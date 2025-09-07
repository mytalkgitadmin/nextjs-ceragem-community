/**
 * 한글/영문/숫자/기타 순 정렬 비교 함수
 */
export function compareByName(a: string, b: string): number {
  const normalize = (s: string) => (s || "").trim().toLowerCase();
  const getWeight = (s: string) => {
    if (/^[\u3131-\uD79D]/.test(s)) return 0; // 한글
    if (/^[a-z]/.test(s)) return 1; // 영문
    if (/^[0-9]/.test(s)) return 2; // 숫자
    return 3; // 기타(이모지 등)
  };
  const A = normalize(a);
  const B = normalize(b);
  const wA = getWeight(A);
  const wB = getWeight(B);
  if (wA !== wB) return wA - wB;
  return A.localeCompare(B);
}
