"use client";
// Toaster with theme management in widgets layer

import { Toaster } from "@/shared/ui/sonner";
import { useTheme } from "next-themes";

export default function ToasterProvider() {
  const { theme = "system" } = useTheme();

  return <Toaster theme={theme as "light" | "dark" | "system"} />;
}
