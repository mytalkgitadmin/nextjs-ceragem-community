"use client";

import {
  GroupChannelProvider,
  MessageListQueryParamsType,
} from "@sendbird/uikit-react/GroupChannel/context";
import { MessageContentProps } from "@sendbird/uikit-react/ui/MessageContent";
import { GroupChannel as GroupChannelType } from "@sendbird/chat/groupChannel";
import GroupChannel from "@sendbird/uikit-react/GroupChannel";
import { ReplyType } from "@sendbird/chat/message";
import {
  getUIMessageType,
  UIMessageType,
  isDeletedMessageToUser,
} from "@/domains/message";

import { useAuth } from "@/domains/auth";
import { SystemMessage, Message } from "@/domains-ui/message";
import {
  SendbirdChatRoomHeader,
  SendbirdChatRoomDateSeparator,
  SendbirdChatRoomInputContainer,
} from "./components";

export interface SendbirdChatRoomContentProps {
  channel: GroupChannelType;
  onBackClick?: () => void;
}

export function SendbirdChatRoom({
  channel,
  onBackClick,
}: SendbirdChatRoomContentProps) {
  const { sendBirdId } = useAuth();
  const channelUrl = channel?.url || "";

  const renderMessage = (messageContent: MessageContentProps) => {
    const { message, chainTop, chainBottom } = messageContent;

    if (isDeletedMessageToUser(message, sendBirdId)) {
      return <></>;
    }

    const uiType = getUIMessageType(message);

    if (uiType === UIMessageType.SYSTEM) {
      return <SystemMessage message={message} />;
    }
    if (uiType === UIMessageType.INVISIBLE) {
      return <></>;
    }
    return (
      <Message
        message={message}
        chainTop={chainTop}
        chainBottom={chainBottom}
      />
    );
  };

  return (
    <div className="h-full w-full flex flex-col min-h-0 bg-white">
      <GroupChannelProvider channelUrl={channelUrl}>
        <div className="flex-1 flex flex-col min-h-0">
          <GroupChannel
            channelUrl={channelUrl}
            scrollBehavior="smooth" // 스크롤 부드럽게 이동
            isMultipleFilesMessageEnabled={true} // 다중 파일 메시지 기능 활성화
            replyType="QUOTE_REPLY" // 'NONE' | 'QUOTE_REPLY' | 'THREAD'
            messageListQueryParams={
              {
                replyType: ReplyType.ALL, // 답장 메시지 표시
              } as MessageListQueryParamsType
            }
            // 채널 헤더
            renderChannelHeader={() => (
              <SendbirdChatRoomHeader onBackClick={onBackClick} />
            )}
            // 날짜 구분선
            renderCustomSeparator={({ message }) => (
              <SendbirdChatRoomDateSeparator message={message} />
            )}
            // 개별 메시지
            renderMessageContent={renderMessage}
            // 메시지 입력창
            renderMessageInput={() => (
              <>
                {/* <ScrollController />
                <SendbirdMessageInput
                  placeholder="메시지를 입력하세요..."
                  onSendMessage={handleSendMessage}
                /> */}
                <SendbirdChatRoomInputContainer channel={channel} />
              </>
            )}
          />
        </div>
      </GroupChannelProvider>
    </div>
  );
}
