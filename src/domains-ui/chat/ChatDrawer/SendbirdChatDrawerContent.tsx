"use client";

import { GroupChannelProvider } from "@sendbird/uikit-react/GroupChannel/context";
import { GroupChannel as GroupChannelType } from "@sendbird/chat/groupChannel";
import GroupChannel from "@sendbird/uikit-react/GroupChannel";
import { DateSeparator } from "./DateSeparator";
import { Message } from "./Message";
import { ScrollController } from "./ScrollController";
import { SendbirdMessageInput } from "./SendbirdMessageInput";
import { useMessageActions } from "./hooks";
import { ChannelHeader } from "./ChannelHeader";
// import "./sendbird-overrides.css";

export interface SendbirdChatDrawerContentProps {
  channel: GroupChannelType;
  showHeader?: boolean;
  onBackClick?: () => void;
}

export function SendbirdChatDrawerContent({
  channel,
  showHeader = true,
  onBackClick,
}: SendbirdChatDrawerContentProps) {
  const channelUrl = channel?.url || "";
  const { handleSendMessage } = useMessageActions();

  return (
    <div className="h-full w-full flex flex-col min-h-0 bg-white">
      <GroupChannelProvider channelUrl={channelUrl}>
        <div className="flex-1 flex flex-col min-h-0">
          <GroupChannel
            channelUrl={channelUrl}
            scrollBehavior="smooth" // 스크롤 부드럽게 이동
            isMultipleFilesMessageEnabled={true} // 다중 파일 메시지 기능 활성화
            replyType="QUOTE_REPLY" // 'NONE' | 'QUOTE_REPLY' | 'THREAD'
            // 채널 헤더
            renderChannelHeader={
              showHeader
                ? () => (
                    <ChannelHeader
                      showBackButton={true}
                      onBackClick={onBackClick}
                    />
                  )
                : undefined
            }
            // renderChannelHeader={() => <></>}
            // 날짜 구분선
            renderCustomSeparator={({ message }) => (
              <DateSeparator createdAt={message.createdAt} />
            )}
            // 개별 메시지
            renderMessageContent={(messageContent) => (
              <Message messageContent={messageContent} />
            )}
            // 메시지 입력창
            renderMessageInput={() => (
              <>
                <ScrollController />
                <SendbirdMessageInput
                  placeholder="메시지를 입력하세요..."
                  onSendMessage={handleSendMessage}
                />
              </>
            )}
          />
        </div>
      </GroupChannelProvider>
    </div>
  );
}
