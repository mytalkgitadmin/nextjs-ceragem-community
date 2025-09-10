export function parseData(data: string) {
  if (!data) return '';

  if (data) {
    try {
      if (data === '[TYPE_DELETED]') {
        return '';
      }
      return JSON.parse(data);
    } catch (error) {
      console.warn('메시지 데이터 파싱 실패:', error);
      return '';
    }
  }

  return '';
}
