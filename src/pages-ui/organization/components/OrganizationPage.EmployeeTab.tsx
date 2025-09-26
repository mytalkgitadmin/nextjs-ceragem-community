"use client";

import { useState } from "react";
import { SearchInput } from "@/shared-ui";
import { mockEmployeeData } from "./mockData";
import { Collapse, PersonCard } from "@/shared-ui/display";

export interface OrganizationPageEmployeeTabProps {}

export function OrganizationPageEmployeeTab({}: OrganizationPageEmployeeTabProps) {
  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      {/* 검색 */}
      <div className="p-4 bg-white">
        <SearchInput placeholder="검색" onSearch={() => {}} />
      </div>

      {/* 부서별 목록 */}
      <div className="bg-white flex flex-col">
        {mockEmployeeData.map((employeeGroup: any) => {
          return (
            <Collapse key={employeeGroup.id} title={employeeGroup.title}>
              {employeeGroup.contacts.map((contact: any) => (
                <PersonCard key={contact.id} name={contact.name} />
              ))}
            </Collapse>
          );
        })}
      </div>
    </div>
  );
}
