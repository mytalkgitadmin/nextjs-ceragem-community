"use client";

import { Header } from "@/shared-ui";
import { useRouter } from "next/navigation";

export interface OrganizationPageHeaderProps {}

export function OrganizationPageHeader({}: OrganizationPageHeaderProps) {
  const router = useRouter();

  const onChatClick = () => {
    router.push("/chat-list");
  };

  const onSettingsClick = () => {
    router.push("/settings");
  };

  return (
    <Header
      title="세라젬 패밀리"
      showChat={true}
      showSettings={true}
      onChatClick={onChatClick}
      onSettingsClick={onSettingsClick}
    />
  );
}
