"use client";

import React, { useState } from "react";
import { Button } from "@/shared-ui/display";
import { Checkbox } from "@/shared-ui/input";
import { useDrawer } from "@/drawer-system";
import {
  TermDetail,
  marketingTermDetailContent,
  privacyTermsDetailContent,
  serviceTermDetailContent,
} from "./components";

interface ConsentItem {
  id: string;
  title: string;
  required: boolean;
  content: string;
}

export const ConsentPage: React.FC = () => {
  const { openDrawer, requestCloseDrawer } = useDrawer();

  const [consentItems] = useState<ConsentItem[]>([
    {
      id: "terms",
      title: "서비스 이용약관",
      required: true,
      content: serviceTermDetailContent,
    },
    {
      id: "privacy",
      title: "개인정보 수집 및 이용동의",
      required: true,
      content: privacyTermsDetailContent,
    },
    {
      id: "marketing",
      title: "마케팅 수신동의",
      required: false,
      content: marketingTermDetailContent,
    },
  ]);

  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [allChecked, setAllChecked] = useState<boolean>(false);

  // 개별 항목 체크 변경
  const handleItemCheck = (id: string, checked: boolean) => {
    const newCheckedItems = { ...checkedItems, [id]: checked };
    setCheckedItems(newCheckedItems);

    // 전체 체크 상태 업데이트
    const allItemsChecked = consentItems.every(
      (item) => newCheckedItems[item.id]
    );
    setAllChecked(allItemsChecked);
  };

  // 전체 동의 체크 변경
  const handleAllCheck = (checked: boolean) => {
    setAllChecked(checked);

    const newCheckedItems: Record<string, boolean> = {};
    consentItems.forEach((item) => {
      newCheckedItems[item.id] = checked;
    });
    setCheckedItems(newCheckedItems);
  };

  // 필수 항목이 모두 체크되었는지 확인
  const areRequiredItemsChecked = () => {
    return consentItems
      .filter((item) => item.required)
      .every((item) => checkedItems[item.id]);
  };

  const handleStart = () => {
    if (areRequiredItemsChecked()) {
      console.log("동의 완료:", checkedItems);
      // 다음 단계로 진행하는 로직
    }
  };

  const handleBack = () => {
    // 뒤로가기 로직
    console.log("뒤로가기");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-4 border-b border-gray-200">
        <button
          onClick={handleBack}
          className="text-gray-600 hover:text-gray-800 transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        {/* Title */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
            세라젬 패밀리 서비스 이용을 위한
            <br />
            동의 안내
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed">
            서비스 이용에 반드시 필요한 사항입니다.
            <br />
            정책 및 약관을 클릭하여 모든 내용을 확인해주시기 바랍니다.
          </p>
        </div>

        {/* All Consent */}
        <div className="mb-6">
          <Checkbox checked={allChecked} onChange={handleAllCheck}>
            <span className="text-lg font-semibold text-gray-900">
              전체동의
            </span>
          </Checkbox>
        </div>

        <hr className="border-gray-300 mb-6" />

        {/* Consent Items */}
        <div className="space-y-6">
          {consentItems.map((item) => (
            <div key={item.id}>
              {/* Item Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center flex-1">
                  <Checkbox
                    checked={checkedItems[item.id] || false}
                    onChange={(checked) => handleItemCheck(item.id, checked)}
                  >
                    <span className="text-gray-900">
                      ({item.required ? "필수" : "선택"}) {item.title}
                    </span>
                  </Checkbox>
                </div>
                <button
                  className="text-sm text-gray-500 px-2 hover:text-gray-700 transition-colors"
                  onClick={() => {
                    const id = openDrawer(
                      <TermDetail
                        content={item.content}
                        onAgree={() => {
                          handleItemCheck(item.id, true);
                          requestCloseDrawer(id);
                        }}
                      />,
                      {
                        width: "max-w-full",
                        title: item.title,
                      }
                    );
                  }}
                >
                  전체 &gt;
                </button>
              </div>

              {/* Content Box */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {item.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
        <Button
          onClick={handleStart}
          variant="primary"
          size="lg"
          fullWidth={true}
          disabled={!areRequiredItemsChecked()}
          className={
            !areRequiredItemsChecked()
              ? "bg-gray-300 text-gray-500 hover:bg-gray-300"
              : ""
          }
        >
          동의하고 시작하기
        </Button>
      </div>

      {/* Bottom Padding for Fixed Button */}
      <div className="h-20"></div>
    </div>
  );
};
