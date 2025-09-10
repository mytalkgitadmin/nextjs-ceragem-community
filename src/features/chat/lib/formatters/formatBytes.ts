/**
 * 이 함수는 바이트 단위의 숫자로 된 크기를 입력받아 적절한 크기 문자열로 변환합니다.
 * 사용 가능한 크기 단위는 'Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB' 입니다.
 * 변환은 2진법(기수 1024)를 사용하며, 변환된 값은 소수점 둘째자리까지 반올림됩니다.
 * 이를 변경하려면 함수 호출시 두 번째 인자(decimals)에 원하는 소수점 자리수를 지정하면 됩니다.
 */
export function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
