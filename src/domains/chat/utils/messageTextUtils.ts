/**
 * 메시지 텍스트에서 편집 프리픽스를 제거하는 유틸리티 함수
 * @param text - 처리할 메시지 텍스트
 * @returns 편집 프리픽스가 제거된 텍스트
 */
export function removeEditPrefix(text: string): string {
  const EDIT_PREFIX = "✍🏻 ";
  return text.startsWith(EDIT_PREFIX) ? text.slice(EDIT_PREFIX.length) : text;
}

/**
 * 메시지가 편집된 메시지인지 확인하는 유틸리티 함수
 * @param text - 확인할 메시지 텍스트
 * @returns 편집된 메시지인지 여부
 */
export function isEditedMessage(text: string): boolean {
  const EDIT_PREFIX = "✍🏻 ";
  return text.startsWith(EDIT_PREFIX);
}
