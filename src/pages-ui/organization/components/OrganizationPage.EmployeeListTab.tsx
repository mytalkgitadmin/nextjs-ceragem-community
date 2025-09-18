"use client";

import { useState } from "react";
import { SearchInput, CollapsibleSection } from "@/shared-ui";
import { MyProfileCard } from "@/domains-ui/profile";
import { UserCard } from "@/domains-ui/organization";
import { mockData } from "./mockData";
import { EmployeeCardGroup } from "@/domains-ui/organization";

export interface OrganizationPageEmployeeListTabProps {
  onMessageClick?: (userId: string) => void;
}

export function OrganizationPageEmployeeListTab({
  onMessageClick,
}: OrganizationPageEmployeeListTabProps) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      {/* 검색 */}
      <div className="p-4 bg-white">
        <SearchInput
          placeholder="검색"
          value={searchQuery}
          onChange={setSearchQuery}
        />
      </div>

      {/* 내 프로필 */}
      <div className="p-4 bg-gray-50">
        {/* <MyProfileCard
          id={mockData.myProfile.id}
          name={mockData.myProfile.name}
          position={mockData.myProfile.position}
          department={mockData.myProfile.department}
          statusMessage={mockData.myProfile.statusMessage}
          badgeText={mockData.myProfile.badgeText}
          badgeColor={mockData.myProfile.badgeColor}
          onMessageClick={onMessageClick}
          onEditClick={() => console.log("프로필 편집 클릭")}
        /> */}
      </div>

      {/* 부서별 목록 */}
      <div className="bg-white">
        {mockData.map((employeeGroup: any) => (
          <EmployeeCardGroup
            key={employeeGroup.id}
            employeeGroup={employeeGroup}
          />
        ))}
      </div>
    </div>
  );
}
