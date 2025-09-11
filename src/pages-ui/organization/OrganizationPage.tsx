"use client";

import { useState } from "react";
import {
  OrganizationHeader,
  OrganizationTabNav,
  OrganizationTab,
  type OrganizationTabType,
} from "./ui";

export function OrganizationPage() {
  const [activeTab, setActiveTab] =
    useState<OrganizationTabType>("organization");

  const handleChatClick = () => {
    console.log("채팅 버튼 클릭");
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
        userName="세라젬"
        onChatClick={handleChatClick}
        onSettingsClick={handleSettingsClick}
      />

      <OrganizationTabNav activeTab={activeTab} onTabChange={setActiveTab} />

      {renderTabContent()}
    </div>
  );
}
