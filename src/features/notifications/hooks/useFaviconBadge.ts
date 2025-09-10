import { useEffect, useRef } from 'react';

export function useFaviconBadge() {
  const originalFavicon = useRef<string | null>(null);
  const hasFaviconBadge = useRef<boolean>(false);

  useEffect(() => {
    const linkElement = document.querySelector(
      'link[rel="icon"]',
    ) as HTMLLinkElement;
    if (linkElement) {
      originalFavicon.current = linkElement.href;
    }

    return () => {
      if (originalFavicon.current) {
        setFavicon(originalFavicon.current);
      }
    };
  }, []);

  // 파비콘 변경 함수
  const setFavicon = (href: string) => {
    let link = document.querySelector('link[rel="icon"]') as HTMLLinkElement;

    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }

    link.href = href;
  };

  // 알림 있음 표시 (빨간 점 있는 파비콘으로 변경)
  const showFaviconBadge = async () => {
    if (hasFaviconBadge.current) return;
    hasFaviconBadge.current = true;
    setFavicon('/favicon-noti.ico');
  };

  // 알림 제거
  const clearFaviconBadge = () => {
    if (!hasFaviconBadge.current) return;

    hasFaviconBadge.current = false;
    if (originalFavicon.current) {
      setFavicon(originalFavicon.current);
    }
  };
  return {
    showFaviconBadge,
    clearFaviconBadge,
  };
}
