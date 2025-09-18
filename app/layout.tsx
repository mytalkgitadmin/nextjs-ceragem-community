import type { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css"; // Tailwind CSS + 전역 스타일
import { Providers } from "@/providers";

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
      <head></head>
      <body className="antialiased">
        <AntdRegistry>
          <Providers>
            <div className="flex flex-col h-screen">{children}</div>
          </Providers>
        </AntdRegistry>
      </body>
    </html>
  );
}
