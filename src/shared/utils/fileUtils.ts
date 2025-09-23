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

/**
 * 파일을 다운로드하는 유틸리티 함수
 * @param fileUrl - 파일 URL
 * @param fileName - 파일명
 * @param baseUrl - 기본 URL (기본값: process.env.NEXT_PUBLIC_BASE_DOMAIN)
 */
export async function downloadFile(
  fileUrl: string,
  fileName: string,
  baseUrl?: string
) {
  const domain = baseUrl || process.env.NEXT_PUBLIC_BASE_DOMAIN;
  const response = await fetch(`${domain}${fileUrl}?attachment=true`);
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.target = "_self";
  link.download = fileName;
  link.click();

  URL.revokeObjectURL(url);
}
