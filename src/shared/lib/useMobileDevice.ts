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

      const isIOS = /iPad|iPhone|iPod/.test(userAgent);
      const isAndroid = /Android/.test(userAgent);
      const isMobile = isIOS || isAndroid;

      const appStoreUrl = isIOS
        ? (import.meta as any).env?.VITE_URL_APP_IOS
        : isAndroid
        ? (import.meta as any).env?.VITE_URL_APP_ANDROID
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
