"use client";

import { ConfigProvider } from "antd";
import koKR from "antd/locale/ko_KR";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DrawerProvider, DrawerManager } from "@/drawer-system";
import dynamic from "next/dynamic";
import { useAuthStore } from "@/domains/auth/stores/authStore";

// Next.js SSR 환경에서 Sendbird Provider 동적 로드
const SendbirdProvider = dynamic(
  () => import("@sendbird/uikit-react/SendbirdProvider"),
  { ssr: false }
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function SendbirdProviderWrapper({ children }: { children: ReactNode }) {
  const { sendBirdId, sessionToken } = useAuthStore();

  // Sendbird 앱 ID - 환경변수에서 가져오거나 기본값 사용
  const appId =
    process.env.NEXT_PUBLIC_SENDBIRD_APP_ID || "YOUR_SENDBIRD_APP_ID";

  return (
    <SendbirdProvider
      appId={appId}
      userId={sendBirdId || "default-user"}
      accessToken={sessionToken}
      config={{
        logLevel: "error", // 프로덕션에서는 error만 로그
      }}
    >
      {children}
    </SendbirdProvider>
  );
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ConfigProvider
      locale={koKR}
      theme={{
        token: {
          fontFamily:
            '"Pretendard Variable", system-ui, -apple-system, sans-serif',
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <SendbirdProviderWrapper>
          <DrawerProvider>
            {children}
            {/* 글로벌 Drawer 렌더링 매니저 */}
            <DrawerManager />
          </DrawerProvider>
        </SendbirdProviderWrapper>
      </QueryClientProvider>
    </ConfigProvider>
  );
}
