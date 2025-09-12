"use client";

import { ConfigProvider } from "antd";
import koKR from "antd/locale/ko_KR";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

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
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ConfigProvider>
  );
}
