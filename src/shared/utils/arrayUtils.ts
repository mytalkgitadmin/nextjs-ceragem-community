/**
 * 조건에 따라 배열을 필터링하는 함수
 * @param items - 필터링할 배열
 * @param condition - 필터링 조건
 * @returns 필터링된 배열
 */

export const filterByCondition = <T>(
  items: T[],
  condition: (item: T) => boolean
): T[] => {
  if (!items) return [];
  return items.filter(condition);
};

/**
 * 조건에 따라 배열을 찾는 함수
 * @param items - 찾을 배열
 * @param condition - 찾을 조건
 * @returns 찾은 아이템
 */

export const findByCondition = <T>(
  items: T[],
  condition: (item: T) => boolean
): T | undefined => {
  if (!items) return undefined;
  return items.find(condition);
};

/**
 * 조건에 따라 배열을 정렬하는 함수
 * @param items - 정렬할 배열
 * @param compareFn - 정렬 함수
 * @returns 정렬된 배열
 */

export const sortByComparator = <T>(
  items: T[],
  compareFn: (a: T, b: T) => number
): T[] => {
  if (!items || items.length === 0) return items;
  return [...items].sort(compareFn);
};
