"use client";

import { useState } from "react";
import {
  OrganizationPageHeader,
  OrganizationPageTabNav,
  OrganizationPageEmployeeListTab,
} from "./components";
import { useFriends } from "@/domains/friend/queries";
import { useRouter } from "next/navigation";

export interface OrganizationPageProps {}

export function OrganizationPage({}: OrganizationPageProps) {
  const {} = useFriends(); //TODO: 친구 목록 조회

  const [activeTab, setActiveTab] = useState<string>("organization");

  const handleMessageClick = (userId: string) => {
    console.log("메시지 클릭:", userId);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "organization":
        return (
          <OrganizationPageEmployeeListTab
            onMessageClick={handleMessageClick}
          />
        );
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
    <>
      {/* Header */}
      <OrganizationPageHeader />

      {/* Tab Navigation */}
      <OrganizationPageTabNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {renderTabContent()}
    </>
  );
}
