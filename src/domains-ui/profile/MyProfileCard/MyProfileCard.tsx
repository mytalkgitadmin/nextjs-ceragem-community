"use client";

import { Avatar, Badge, Button } from "antd";
import { MessageOutlined, MoreOutlined, EditOutlined } from "@ant-design/icons";
import { useProfileStore } from "@/domains/profile/stores";

export interface MyProfileCardProps {
  id: string;
  name: string;
  position: string;
  department: string;
  profileImage?: string;
  statusMessage?: string;
  badgeText?: string;
  badgeColor?: "default" | "processing" | "success" | "error" | "warning";
  onMessageClick?: (userId: string) => void;
  onEditClick?: () => void;
  className?: string;
}

export function MyProfileCard({
  id,
  name,
  position,
  department,
  profileImage,
  statusMessage,
  badgeText,
  badgeColor = "success",
  onMessageClick,
  onEditClick,
  className = "",
}: MyProfileCardProps) {
  const { email, editedName, nationalNumber, phoneNumber } = useProfileStore();

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* 그라데이션 배경 */}
      <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-purple-700 p-6 rounded-2xl shadow-lg">
        {/* 배경 패턴 */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            {/* 왼쪽: 프로필 정보 */}
            <div className="flex items-start space-x-4">
              {/* 큰 아바타 */}
              <div className="relative">
                <Avatar
                  size={80}
                  src={profileImage}
                  className="border-4 border-white/20 shadow-lg"
                >
                  {editedName.charAt(0)}
                </Avatar>
                {/* 온라인 상태 표시 */}
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 border-3 border-white rounded-full"></div>
              </div>

              {/* 프로필 텍스트 */}
              <div className="text-white">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="text-xl font-bold">{editedName}</h3>
                  {badgeText && (
                    <Badge
                      status={badgeColor}
                      text={
                        <span className="text-white/90 text-sm font-medium bg-white/20 px-2 py-1 rounded-full">
                          {badgeText}
                        </span>
                      }
                      className="ml-2"
                    />
                  )}
                </div>
                <p className="text-blue-100 text-sm font-medium mb-1">
                  {position}
                </p>
                <p className="text-blue-100/80 text-sm">{department}</p>
              </div>
            </div>

            {/* 오른쪽: 액션 버튼들 */}
            <div className="flex items-center space-x-2">
              {onEditClick && (
                <Button
                  type="text"
                  shape="circle"
                  icon={<EditOutlined />}
                  onClick={onEditClick}
                  className="text-white hover:bg-white/10 border-white/20"
                  size="large"
                />
              )}
              <Button
                type="text"
                shape="circle"
                icon={<MoreOutlined />}
                className="text-white hover:bg-white/10 border-white/20"
                size="large"
              />
            </div>
          </div>

          {/* 상태 메시지 */}
          {statusMessage && (
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 mb-4">
              <p className="text-white/90 text-sm leading-relaxed">
                💬 {statusMessage}
              </p>
            </div>
          )}

          {/* 하단 액션 영역 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-white/80 text-sm">
              <span>📍 현재 위치: 본사</span>
              <span>⏰ 온라인</span>
            </div>

            {onMessageClick && (
              <Button
                type="primary"
                icon={<MessageOutlined />}
                onClick={() => onMessageClick(id)}
                className="bg-white/20 border-white/30 text-white hover:bg-white/30 hover:border-white/40"
                size="large"
              >
                메시지 보내기
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
