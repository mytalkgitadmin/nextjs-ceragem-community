import { ReactNode } from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import koKR from "antd/locale/ko_KR";
import { DrawerProvider, DrawerManager } from "@/drawer-system";
import { ModalProvider, ModalManager } from "@/modal-system";

export function UIProviders({ children }: { children: ReactNode }) {
  return (
    <AntdRegistry>
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
          <ModalProvider>
            {children}
            <ModalManager />
          </ModalProvider>
          <DrawerManager />
        </DrawerProvider>
      </ConfigProvider>
    </AntdRegistry>
  );
}
