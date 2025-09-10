import type { Metadata } from "next";
import { ReactQueryProvider, SendbirdProviderWithAuth } from "@/app/providers";
// import { OverlayRoot } from "@/shared/ui/overlays";
import "@/app/styles/default.css";
import "@/app/styles/global.scss";
import "@/app/styles/sendbird.css";

export const metadata: Metadata = {
  title: "FETA",
  description: "FETA Web",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <ReactQueryProvider>
          <SendbirdProviderWithAuth>
            {children}
            {/* <OverlayRnoot /> */}
          </SendbirdProviderWithAuth>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
