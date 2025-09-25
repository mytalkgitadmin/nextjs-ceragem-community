"use client";

import { useEffect } from "react";
import { useAuth } from "@/domains/auth/hooks";
import { useRouter } from "next/navigation";

export default function Client({ to }: { to: string }) {
  const { login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    login(to)
      .then(() => {
        router.replace(to);
      })
      .catch(() => {
        router.replace("/invalid-state");
      });
  }, [to]);

  return null;
}
