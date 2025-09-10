export function useAppBadge() {
  const setAppBadge = (count: number) => {
    if ('setAppBadge' in navigator) {
      navigator.setAppBadge(count).catch((error) => {
        console.error('뱃지 설정 중 오류 발생:', error);
      });
    } else {
      console.log('이 브라우저는 뱃지 API를 지원하지 않습니다.');
    }
  };

  const clearAppBadge = () => {
    if ('clearAppBadge' in navigator) {
      navigator.clearAppBadge().catch((error) => {
        console.error('뱃지 제거 중 오류 발생:', error);
      });
    } else {
      console.log('이 브라우저는 뱃지 API를 지원하지 않습니다.');
    }
  };

  return { setAppBadge, clearAppBadge };
}
