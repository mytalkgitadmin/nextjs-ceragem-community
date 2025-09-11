"use client";

import { ConfigProvider } from "antd";
import koKR from "antd/locale/ko_KR";

export function AntdProvider({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider
      locale={koKR}
      theme={{
        token: {
          // Ant Design 테마 커스터마이징
          colorPrimary: "#1677ff",
          borderRadius: 8,
        },
        components: {
          // 컴포넌트별 스타일 오버라이드
          Collapse: {
            contentBg: "transparent",
            headerBg: "transparent",
          },
          Tabs: {
            inkBarColor: "#1677ff",
            itemActiveColor: "#1677ff",
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
