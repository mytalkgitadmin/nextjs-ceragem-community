import Link from "next/link";
import { LottiePlayer } from "@/shared/ui/media";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: 560 }}>
        <LottiePlayer
          src="/animations/Error_404.json"
          width={320}
          height={320}
          autoplay
          loop
          style={{ margin: "0 auto 8px" }}
        />

        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <Link
            href="/"
            style={{
              padding: "10px 14px",
              borderRadius: 8,
              background: "#111",
              color: "#fff",
              textDecoration: "none",
            }}
          >
            홈으로 가기
          </Link>
        </div>
      </div>
    </main>
  );
}
