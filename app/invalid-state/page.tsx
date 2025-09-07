"use client";

import { LottiePlayer } from "@/shared/ui/media";

export default function InvalidStatePage() {
  return (
    <main
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100dvh",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <LottiePlayer
        src="/animations/Under_Maintenance.json"
        width={160}
        height={160}
      />
    </main>
  );
}
