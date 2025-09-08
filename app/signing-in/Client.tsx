"use client";

import { useEffect } from "react";
import { useProfileStore, profileMapper } from "@/entities/profile";
import { useRouter } from "next/navigation";

export default function Client({ to }: { to: string }) {
  const router = useRouter();
  useEffect(() => {
    fetch("/api/post-login", { method: "POST" })
      .then(async (res) => {
        const resData = await res.json();
        if (!res.ok || !resData.ok) throw new Error("exchange_failed");

        console.log(resData.data);

        useProfileStore
          .getState()
          .setUserProfile(profileMapper(resData.data.accountProfile));

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
