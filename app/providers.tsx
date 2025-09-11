"use client";

import { ConfigProvider } from "antd";
import koKR from "antd/locale/ko_KR";
import { ReactNode } from "react";

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
      {children}
    </ConfigProvider>
  );
}
