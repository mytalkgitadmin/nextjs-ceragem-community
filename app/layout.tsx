import type { Metadata } from "next";

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
      <body className="antialiased">{children}</body>
    </html>
  );
}
