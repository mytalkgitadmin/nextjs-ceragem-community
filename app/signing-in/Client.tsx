"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/features/auth/authStore";
import { AccountProfile } from "@/entities/profile";
const profileMapper = (dto: AccountProfile) => dto; // TODO: 필요 시 상세 매핑 적용
import { useRouter } from "next/navigation";

export default function Client({ to }: { to: string }) {
  const router = useRouter();
  useEffect(() => {
    fetch("/api/post-login", { method: "POST" })
      .then(async (res) => {
        const resData = await res.json();
        if (!res.ok || !resData.ok) throw new Error("exchange_failed");

        useAuthStore
          .getState()
          .updateUserProfile(profileMapper(resData.data.accountProfile));
        useAuthStore.getState().login({
          accessToken: "",
          refreshToken: "",
          sessionToken: resData.data.sessionToken,
          sendBirdId: resData.data.sendBirdId.trim(),
          accountProfile: resData.data.accountProfile,
        });

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
