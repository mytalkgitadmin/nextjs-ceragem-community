"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Client({ to }: { to: string }) {
  const router = useRouter();
  useEffect(() => {
    fetch("/api/auth/login", { method: "POST" })
      .then(async (res) => {
        const resData = await res.json();
        if (!res.ok || !resData.ok) throw new Error("exchange_failed");

        setTimeout(() => {
          router.replace(to || "/");
        }, 4000);
      })
      .catch((err) => {
        console.error(err);
        router.replace("/invalid-state");
      });
  }, [to, router]);

  return null;
}
