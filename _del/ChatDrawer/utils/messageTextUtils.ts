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

/**
 * 파일명을 확장자와 분리하여 말줄임 처리하는 유틸리티 함수
 * @param fileName - 처리할 파일명
 * @param maxLength - 파일명 부분의 최대 길이 (기본값: 20)
 * @returns 처리된 파일명 객체
 */
export function formatFileName(fileName: string, maxLength: number = 100) {
  if (!fileName) return { name: "", extension: "", displayName: "" };

  const lastDotIndex = fileName.lastIndexOf(".");

  // 확장자가 없거나 파일명이 .로 시작하는 경우
  if (lastDotIndex <= 0) {
    const truncatedName =
      fileName.length > maxLength
        ? fileName.substring(0, maxLength) + "..."
        : fileName;
    return {
      name: fileName,
      extension: "",
      displayName: truncatedName,
    };
  }

  const name = fileName.substring(0, lastDotIndex);
  const extension = fileName.substring(lastDotIndex);

  const truncatedName =
    name.length > maxLength ? name.substring(0, maxLength) + "..." : name;

  return {
    name,
    extension,
    displayName: `${truncatedName}${extension}`,
  };
}
