"use client";

import { ReactNode, useEffect, useState } from "react";
import dynamic from "next/dynamic";

import { useAuthStore } from "@/domains/auth/stores";
import kr from "date-fns/locale/ko";

// Sendbird Provider 동적 로드
const SendbirdProvider = dynamic(
  () => import("@sendbird/uikit-react/SendbirdProvider"),
  {
    ssr: false,
    loading: () => <div>채팅 시스템 로딩 중...</div>,
  }
);

interface SendbirdProviderWrapperProps {
  children: ReactNode;
}

export function SendbirdProviderWrapper({
  children,
}: SendbirdProviderWrapperProps) {
  const { sendBirdId, sessionToken } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  // 클라이언트 마운트 확인
  useEffect(() => {
    setMounted(true);
  }, []);

  // 환경 변수 검증
  const appId = process.env.NEXT_PUBLIC_SENDBIRD_APP_ID;

  if (!appId) {
    console.error(
      "NEXT_PUBLIC_SENDBIRD_APP_ID 환경 변수가 설정되지 않았습니다."
    );
    return <div>{children}</div>; // Sendbird 없이 children만 렌더링
  }

  // 마운트되지 않았거나 필수 데이터가 없으면 fallback
  if (!mounted || !sendBirdId) {
    return <div>{children}</div>;
  }

  return (
    <SendbirdProvider
      appId={appId}
      userId={sendBirdId}
      accessToken={sessionToken}
      dateLocale={kr}
      //   config={{
      //     logLevel: process.env.NODE_ENV === "production" ? "error" : "warning",
      //     userMention: {
      //       maxMentionCount: 10,
      //       maxSuggestionCount: 15,
      //     },
      //   }}
      imageCompression={{
        compressionRate: 0.5,
        // The default value changed from 1.0 to 0.7 starting in v3.3.3.
        resizingWidth: 30,
        resizingHeight: "30px",
      }}
      stringSet={{
        TRYING_TO_CONNECT: "", //Text localization (Trying to Connect 텍스트 미 출력)
      }}
      sdkInitParams={{
        localCacheEnabled: true,
      }}
    >
      {children}
    </SendbirdProvider>
  );
}
