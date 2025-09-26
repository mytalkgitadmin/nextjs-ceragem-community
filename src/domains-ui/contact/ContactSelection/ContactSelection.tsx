import React, { useState, useCallback } from "react";
import { mockEmployeeData } from "./mockData";
import { Collapse, PersonCard } from "@/shared-ui/display";

interface ContactSelectionProps {
  // 선택 관련
  selectedContactIds?: Set<string>;
  onSelectionChange?: (selectedIds: Set<string>) => void;

  // 선택 모드
  selectionMode?: "single" | "multiple";
  maxSelection?: number;

  // UI 설정
  showSelectionCount?: boolean;
  className?: string;

  // 콜백
  onContactClick?: (contactId: string) => void;
}

export const ContactSelection: React.FC<ContactSelectionProps> = ({
  selectedContactIds: externalSelectedIds,
  onSelectionChange,
  selectionMode = "multiple",
  maxSelection,
  showSelectionCount = false,
  className = "",
  onContactClick,
}) => {
  // 내부 상태 (외부에서 제어하지 않는 경우)
  const [internalSelectedIds, setInternalSelectedIds] = useState<Set<string>>(
    new Set()
  );

  // 실제 사용할 선택된 ID들 (외부 제어 vs 내부 제어)
  const selectedIds = externalSelectedIds ?? internalSelectedIds;

  // 선택 상태 변경 핸들러
  const handleSelectionChange = useCallback(
    (newSelectedIds: Set<string>) => {
      if (externalSelectedIds) {
        // 외부에서 제어하는 경우
        onSelectionChange?.(newSelectedIds);
      } else {
        // 내부에서 제어하는 경우
        setInternalSelectedIds(newSelectedIds);
        onSelectionChange?.(newSelectedIds);
      }
    },
    [externalSelectedIds, onSelectionChange]
  );

  // 개별 연락처 선택 핸들러
  const handleContactSelect = useCallback(
    (contactId: string, selected: boolean) => {
      const newSelectedIds = new Set(selectedIds);

      if (selected) {
        // 선택하는 경우
        if (selectionMode === "single") {
          // 단일 선택 모드: 기존 선택 모두 해제
          newSelectedIds.clear();
          newSelectedIds.add(contactId);
        } else {
          // 다중 선택 모드
          if (maxSelection && selectedIds.size >= maxSelection) {
            console.warn(`최대 ${maxSelection}명까지만 선택 가능합니다.`);
            return;
          }
          newSelectedIds.add(contactId);
        }
      } else {
        // 선택 해제하는 경우
        newSelectedIds.delete(contactId);
      }

      handleSelectionChange(newSelectedIds);
    },
    [selectedIds, selectionMode, maxSelection, handleSelectionChange]
  );

  // 연락처 클릭 핸들러
  const handleContactClick = useCallback(
    (contactId: string) => {
      if (onContactClick) {
        onContactClick(contactId);
      }
    },
    [onContactClick]
  );

  return (
    <div className={`bg-white flex flex-col ${className}`}>
      {/* 선택된 개수 표시 (옵션) */}
      {showSelectionCount && selectedIds.size > 0 && (
        <div className="px-4 py-2 bg-blue-50 border-b border-blue-200">
          <p className="text-sm text-blue-700">
            선택된 연락처: {selectedIds.size}명
            {maxSelection && ` / 최대 ${maxSelection}명`}
          </p>
        </div>
      )}

      {/* 연락처 그룹 목록 */}
      {mockEmployeeData.map((employeeGroup: any) => {
        return (
          <Collapse
            key={employeeGroup.id}
            title={`${employeeGroup.title} (${employeeGroup.contacts?.length || 0})`}
            defaultOpen={true}
          >
            <div className="space-y-1">
              {employeeGroup.contacts?.map((contact: any) => (
                <PersonCard
                  key={contact.id}
                  name={contact.name}
                  description={contact.description}
                  avatarSrc={contact.avatar}
                  badgeLabel={contact.badge?.text}
                  badgeColor={contact.badge?.variant || "primary"}
                  selectable={true}
                  selected={selectedIds.has(contact.id)}
                  onSelect={(selected) =>
                    handleContactSelect(contact.id, selected)
                  }
                  onClick={
                    onContactClick
                      ? () => handleContactClick(contact.id)
                      : undefined
                  }
                  className="hover:bg-gray-50"
                />
              ))}
            </div>
          </Collapse>
        );
      })}

      {/* 빈 상태 */}
      {mockEmployeeData.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          <p>연락처가 없습니다.</p>
        </div>
      )}
    </div>
  );
};
