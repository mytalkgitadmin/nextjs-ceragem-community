import type { Metadata } from "next";
import "antd/dist/reset.css"; // Ant Design CSS 미리 로드
import "./globals.css"; // Tailwind CSS + 전역 스타일
import { AntdProvider } from "./providers";

export const metadata: Metadata = {
  title: "Ceragem Community",
  description: "Ceragem Community Web",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <AntdProvider>{children}</AntdProvider>
      </body>
    </html>
  );
}
