"use client";
import { useState } from "react";
import { mockData } from "./mockData";
import { SearchInput } from "@/shared-ui";
import { EmployeeCardGroup } from "@/domains-ui/organization";

export const ChannelParticipantSelector = () => {
  return (
    <div className="flex flex-col gap-4">
      <SearchInput
        onSearch={() => {}}
        placeholder="지점명 또는 이름을 입력해주세요"
      />
      {/* 부서별 목록 */}
      <div className="bg-white flex flex-col">
        {mockData.map((employeeGroup: any) => (
          <EmployeeCardGroup
            key={employeeGroup.id}
            employeeGroup={employeeGroup}
          />
        ))}
      </div>
    </div>
  );
};
