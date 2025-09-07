"use client";

import { useEffect } from "react";
import { useProfileStore } from "@/entities/profile";

export default function Client({ to }: { to: string }) {
  useEffect(() => {
    fetch("/api/post-login", { method: "POST" })
      .then(async (res) => {
        const resData = await res.json();
        if (!res.ok || !resData.ok) throw new Error("exchange_failed");

        console.log(resData.data);

        useProfileStore
          .getState()
          .setUserProfileFromApi(resData.data.accountProfile);

        setTimeout(() => {
          window.location.replace(to || "/");
        }, 4000);
      })
      .catch((err) => {
        console.error(err);
        window.location.replace("/invalid-state");
      });
  }, [to]);

  return null;
}
