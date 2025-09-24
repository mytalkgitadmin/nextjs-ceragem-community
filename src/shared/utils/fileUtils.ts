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
 */
export async function downloadFileByUrl(fileUrl: string, fileName: string) {
  const response = await fetch(`${fileUrl}`);
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.target = "_self";
  link.download = fileName;
  link.click();

  URL.revokeObjectURL(url);
}

/**
 * 이 함수는 바이트 단위의 숫자로 된 크기를 입력받아 적절한 크기 문자열로 변환합니다.
 * 사용 가능한 크기 단위는 'Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB' 입니다.
 * 변환은 2진법(기수 1024)를 사용하며, 변환된 값은 소수점 둘째자리까지 반올림됩니다.
 * 이를 변경하려면 함수 호출시 두 번째 인자(decimals)에 원하는 소수점 자리수를 지정하면 됩니다.
 */
export function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
