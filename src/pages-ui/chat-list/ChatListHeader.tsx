"use client";

import { Header } from "@/shared-ui";
import { useRouter } from "next/navigation";

export interface ChatListHeaderProps {}

export function ChatListHeader({}: ChatListHeaderProps) {
  const router = useRouter();

  const onSettingsClick = () => {
    router.push("/settings");
  };

  const onOrganizationClick = () => {
    router.push("/organization");
  };

  return (
    <Header
      title="세리젬 패밀리"
      showSettings={true}
      showOrganization={true}
      onSettingsClick={onSettingsClick}
      onOrganizationClick={onOrganizationClick}
    />
  );
}
