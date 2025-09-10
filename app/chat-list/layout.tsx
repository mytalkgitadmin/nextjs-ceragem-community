"use client";

import { ProtectedLayout } from "@/widgets/layouts/ProtectedLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ProtectedLayout>{children}</ProtectedLayout>;
}
