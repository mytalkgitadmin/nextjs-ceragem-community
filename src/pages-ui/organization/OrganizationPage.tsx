"use client";

import { useState } from "react";
import { OrganizationHeader } from "./OrganizationHeader";
import {
  OrganizationTabNav,
  type OrganizationTabType,
} from "./OrganizationTabNav";
import { OrganizationTab } from "./OrganizationTab";
import { useFriends } from "@/domains/friend/queries";
import { useRouter } from "next/navigation";

export function OrganizationPage() {
  const router = useRouter();
  const {} = useFriends(); //TODO: 친구 목록 조회

  const [activeTab, setActiveTab] =
    useState<OrganizationTabType>("organization");

  const handleChatClick = () => {
    router.push("/chat-list");
  };

  const handleSettingsClick = () => {
    console.log("설정 버튼 클릭");
  };

  const handleMessageClick = (userId: string) => {
    console.log("메시지 클릭:", userId);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "organization":
        return <OrganizationTab onMessageClick={handleMessageClick} />;
      case "customers":
        return (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <p className="text-gray-500">고객 탭 (구현 예정)</p>
          </div>
        );
      case "family":
        return (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <p className="text-gray-500">세라젬 패밀리 탭 (구현 예정)</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <OrganizationHeader
        title="세라젬 패밀리"
        onChatClick={handleChatClick}
        onSettingsClick={handleSettingsClick}
      />

      <OrganizationTabNav activeTab={activeTab} onTabChange={setActiveTab} />

      {renderTabContent()}
    </div>
  );
}
