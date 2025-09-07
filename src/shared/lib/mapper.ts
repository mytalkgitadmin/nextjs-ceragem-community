export function snakeToCamelKeys<T extends Record<string, any>>(obj: T): any {
  // 최소 구현(필요 시 라이브러리 대체)
  const toCamel = (s: string) =>
    s.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [toCamel(k), v])
  );
}
