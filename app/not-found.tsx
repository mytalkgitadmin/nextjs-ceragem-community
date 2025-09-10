import Link from "next/link";

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
        <div>NotFoundPage</div>

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
