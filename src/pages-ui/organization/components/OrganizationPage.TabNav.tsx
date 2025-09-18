"use client";

import { TabNavigation, type TabItem } from "@/shared-ui";

export interface OrganizationPageTabNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  className?: string;
}

export function OrganizationPageTabNav({
  activeTab,
  onTabChange,
  className = "",
}: OrganizationPageTabNavProps) {
  const tabs: TabItem[] = [
    {
      key: "organization",
      label: "조직도",
    },
    {
      key: "customers",
      label: "고객",
    },
    {
      key: "family",
      label: "세라젬 패밀리",
    },
  ];

  return (
    <TabNavigation
      tabs={tabs}
      activeKey={activeTab}
      onTabChange={(tabId) => onTabChange(tabId)}
      className={className}
    />
  );
}
