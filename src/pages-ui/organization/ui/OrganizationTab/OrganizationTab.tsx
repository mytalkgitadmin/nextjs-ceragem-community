"use client";

import { useState } from "react";
import { SearchInput, CollapsibleSection } from "@/shared-ui";
import { MyProfileCard } from "@/domains-ui/profile";
import { UserCard } from "@/domains-ui/organization";

export interface OrganizationTabProps {
  onMessageClick?: (userId: string) => void;
}

export function OrganizationTab({ onMessageClick }: OrganizationTabProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // 목업 데이터
  const mockData = {
    myProfile: {
      id: "my-profile",
      name: "김세라",
      position: "팀장",
      department: "본사 마케팅팀",
      statusMessage:
        "세라젬과 함께하는 건강한 하루! 새로운 V9 제품 출시를 준비하고 있습니다 💪",
      badgeText: "본사",
      badgeColor: "success" as const,
    },
    departments: {
      headquarters: {
        title: "본사",
        count: 5,
        members: [
          {
            id: "hq-1",
            name: "김세라",
            isOnline: true,
            statusMessage: "세라젬 만세",
            badgeText: "본사",
            badgeColor: "error" as const,
          },
          {
            id: "hq-2",
            name: "박세라",
            isOnline: true,
            statusMessage:
              "세라젠 V9가 드디어 출시를 했습니다. 프로모션 전팝 좋아니 맘은...",
            badgeText: "본사",
            badgeColor: "error" as const,
          },
        ],
      },
      executives: {
        title: "경기광주점연원",
        count: 2,
        members: [
          {
            id: "exec-1",
            name: "최지점장",
            isOnline: false,
            statusMessage:
              "세라젠 V9가 드디어 출시를 했습니다. 맘은 홈볼 부탁드립니다.",
            badgeText: "지점장",
            badgeColor: "processing" as const,
          },
          {
            id: "exec-2",
            name: "김고지",
            isOnline: false,
            badgeText: "고지",
            badgeColor: "default" as const,
          },
        ],
      },
      headquarters2: {
        title: "서울잠실점",
        count: 30,
        members: [],
      },
      sales: {
        title: "성남판교점",
        count: 1450,
        members: [
          {
            id: "sales-1",
            name: "박지점장",
            isOnline: false,
            statusMessage:
              "세라젠 V9가 드디어 출시를 했습니다. 맘은 홈볼 부탁드립니다.",
            badgeText: "지점장",
            badgeColor: "processing" as const,
          },
          {
            id: "sales-2",
            name: "김고지",
            isOnline: false,
            badgeText: "고지",
            badgeColor: "default" as const,
          },
          {
            id: "sales-3",
            name: "이고지",
            isOnline: false,
            badgeText: "고지",
            badgeColor: "default" as const,
          },
        ],
      },
    },
  };

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
        <MyProfileCard
          id={mockData.myProfile.id}
          name={mockData.myProfile.name}
          position={mockData.myProfile.position}
          department={mockData.myProfile.department}
          statusMessage={mockData.myProfile.statusMessage}
          badgeText={mockData.myProfile.badgeText}
          badgeColor={mockData.myProfile.badgeColor}
          onMessageClick={onMessageClick}
          onEditClick={() => console.log("프로필 편집 클릭")}
        />
      </div>

      {/* 부서별 목록 */}
      <div className="bg-white">
        <CollapsibleSection
          title={mockData.departments.headquarters.title}
          count={mockData.departments.headquarters.count}
          defaultActive={true}
        >
          {mockData.departments.headquarters.members.map((member) => (
            <UserCard
              key={member.id}
              id={member.id}
              name={member.name}
              description={member.statusMessage}
              badgeText={member.badgeText}
              badgeColor={member.badgeColor}
              onMessageClick={onMessageClick}
            />
          ))}
        </CollapsibleSection>

        <CollapsibleSection
          title={mockData.departments.executives.title}
          count={mockData.departments.executives.count}
          defaultActive={true}
        >
          {mockData.departments.executives.members.map((member) => (
            <UserCard
              key={member.id}
              id={member.id}
              name={member.name}
              description={member.statusMessage}
              badgeText={member.badgeText}
              badgeColor={member.badgeColor}
              onMessageClick={onMessageClick}
            />
          ))}
        </CollapsibleSection>

        <CollapsibleSection
          title={mockData.departments.headquarters2.title}
          count={mockData.departments.headquarters2.count}
          defaultActive={false}
        >
          <div className="p-4 text-center text-gray-500">멤버가 없습니다.</div>
        </CollapsibleSection>

        <CollapsibleSection
          title={mockData.departments.sales.title}
          count={mockData.departments.sales.count}
          defaultActive={true}
        >
          {mockData.departments.sales.members.map((member) => (
            <UserCard
              key={member.id}
              id={member.id}
              name={member.name}
              description={member.statusMessage}
              badgeText={member.badgeText}
              badgeColor={member.badgeColor}
              onMessageClick={onMessageClick}
            />
          ))}
        </CollapsibleSection>
      </div>
    </div>
  );
}
