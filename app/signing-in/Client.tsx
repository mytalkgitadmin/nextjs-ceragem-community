"use client";

import { useEffect } from "react";
import { useAuth } from "@/domains/auth/hooks";

export default function Client({ to }: { to: string }) {
  const { login } = useAuth();

  useEffect(() => {
    login(to);
  }, [to]);

  return null;
}
