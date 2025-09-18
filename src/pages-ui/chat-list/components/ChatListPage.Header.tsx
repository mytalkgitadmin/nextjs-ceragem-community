"use client";

import { Header } from "@/shared-ui";
import { useRouter } from "next/navigation";

export interface ChatListPageHeaderProps {}

export function ChatListPageHeader({}: ChatListPageHeaderProps) {
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
