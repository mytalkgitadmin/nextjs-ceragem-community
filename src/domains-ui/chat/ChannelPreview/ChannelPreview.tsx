import React from "react";
import { ChatMemberAvatars } from "../ChatMemberAvatars";
import { PreviewContent } from "./PreviewContent";
import { PreviewMeta } from "./PreviewMeta";
import styles from "./ChannelPreview.module.css";

export interface ChannelPreviewProps {
  // 채널 정보
  channel: any;
  channelInfo?: any;
  channelName: string;
  channelUrl: string;
  index: number;

  // 멤버 정보
  memberCount: number;
  members: any[];

  // 상태
  isTitle?: boolean;
  isMemeber?: boolean;
  isYesterday?: boolean;

  // 선택/활성화 상태
  selectRowUrl?: string;
  popoverOpen?: boolean;

  // UI 리소스
  pinnedChannels: any[];
  myPushTriggerOption: string;
  profileImg: (profile: any, size: string, status?: string) => string;
  bemilyProfileList?: string[];
  home?: string;
  pin?: string;
  nosound?: string;

  // 함수들
  lastMessage: (message: any) => string;
  setChannelUrl: (url: string) => void;
  handleMouseOverDebounced: (url: string) => void;
  handleMouseLeaveDebounced: () => void;
  handleRightClick: (e: React.MouseEvent) => void;
  popoverButton: (
    url: string,
    channelInfo: any,
    pushOption: string
  ) => React.ReactNode;

  className?: string;
}

export const ChannelPreview: React.FC<ChannelPreviewProps> = ({
  channel,
  channelInfo,
  channelName,
  channelUrl,
  index,
  memberCount,
  members,
  isTitle = false,
  isMemeber = false,
  isYesterday = false,
  selectRowUrl,
  popoverOpen = false,
  pinnedChannels,
  myPushTriggerOption,
  profileImg,
  bemilyProfileList,
  home,
  pin,
  nosound,
  lastMessage,
  setChannelUrl,
  handleMouseOverDebounced,
  handleMouseLeaveDebounced,
  handleRightClick,
  popoverButton,
  className,
}) => {
  if (!isTitle && !isMemeber) {
    return null;
  }

  const isActive = channel.url === channelUrl;
  const isGroup = memberCount > 2;

  return (
    <div
      style={{ width: "100%" }}
      key={`channel_list_${channel.url}_${index}`}
      onMouseOver={() => handleMouseOverDebounced(channel.url)}
      onMouseLeave={handleMouseLeaveDebounced}
      className={className}
    >
      <div
        onContextMenu={handleRightClick}
        className={`${styles.chat_list_item} ${
          isGroup ? styles.chat_list_group : styles.chat_list
        } ${isActive ? styles.chat_list_active : ""}`}
        onClick={() => {
          if (!popoverOpen) {
            setChannelUrl(channel.url);
          }
        }}
      >
        {selectRowUrl === channel.url &&
          popoverButton(channel.url, channelInfo, myPushTriggerOption)}

        <ChatMemberAvatars
          memberCount={memberCount}
          members={members}
          channelInfo={channelInfo}
          channel={channel}
          profileImg={profileImg}
          bemilyProfileList={bemilyProfileList}
        />

        <PreviewContent
          channelInfo={channelInfo}
          channelName={channelName}
          memberCount={memberCount}
          channel={channel}
          pinnedChannels={pinnedChannels}
          myPushTriggerOption={myPushTriggerOption}
          lastMessage={lastMessage}
          home={home}
          pin={pin}
          nosound={nosound}
        />

        <PreviewMeta channel={channel} isYesterday={isYesterday} />
      </div>
    </div>
  );
};

ChannelPreview.displayName = "ChannelPreview";
