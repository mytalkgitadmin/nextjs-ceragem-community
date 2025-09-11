import type { Metadata } from "next";
import "./globals.css"; // Tailwind CSS + 전역 스타일

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
      <body className="antialiased font-pretendard bg-gray-50">{children}</body>
    </html>
  );
}
