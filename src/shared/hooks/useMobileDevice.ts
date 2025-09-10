import { useState, useEffect } from "react";

interface MobileDeviceInfo {
  isMobile: boolean;
  isIOS: boolean;
  isAndroid: boolean;
  appStoreUrl?: string;
}

export function useMobileDevice(): MobileDeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<MobileDeviceInfo>({
    isMobile: false,
    isIOS: false,
    isAndroid: false,
  });

  useEffect(() => {
    const detectMobileDevice = () => {
      const userAgent = navigator.userAgent;

      // iOS 기기 감지 (iPhone, iPad, iPod)
      const isIOS = /iPad|iPhone|iPod/.test(userAgent);

      // Android 기기 감지
      const isAndroid = /Android/.test(userAgent);

      // 모바일 여부
      const isMobile = isIOS || isAndroid;

      // 앱스토어 URL 설정
      const appStoreUrl = isIOS
        ? process.env.NEXT_PUBLIC_URL_APP_IOS
        : isAndroid
        ? process.env.NEXT_PUBLIC_URL_APP_ANDROID
        : "";

      setDeviceInfo({
        isMobile,
        isIOS,
        isAndroid,
        appStoreUrl,
      });
    };

    detectMobileDevice();
  }, []);

  return deviceInfo;
}
