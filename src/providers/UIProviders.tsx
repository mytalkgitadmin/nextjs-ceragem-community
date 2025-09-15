import { ReactNode } from "react";
import { ConfigProvider } from "antd";
import koKR from "antd/locale/ko_KR";
import { DrawerProvider, DrawerManager } from "@/drawer-system";

export function UIProviders({ children }: { children: ReactNode }) {
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
      <DrawerProvider>
        {children}
        <DrawerManager />
      </DrawerProvider>
    </ConfigProvider>
  );
}
