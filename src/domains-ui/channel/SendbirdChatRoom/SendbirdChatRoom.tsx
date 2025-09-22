"use client";

import {
  GroupChannelProvider,
  MessageListQueryParamsType,
} from "@sendbird/uikit-react/GroupChannel/context";
import { MessageContentProps } from "@sendbird/uikit-react/ui/MessageContent";
import { GroupChannel as GroupChannelType } from "@sendbird/chat/groupChannel";
import GroupChannel from "@sendbird/uikit-react/GroupChannel";
import { ReplyType } from "@sendbird/chat/message";
import { getUIMessageType } from "@/domains/message/utils/messageUtils";
import { UIMessageType } from "@/domains/message/constants/messageEnum";
import { useAuth } from "@/domains/auth";
import { SendbirdChatRoomSystemMessage } from "./components";

export interface SendbirdChatRoomContentProps {
  channel: GroupChannelType;
  showHeader?: boolean;
  onBackClick?: () => void;
}

export function SendbirdChatRoom({
  channel,
  showHeader = true,
  onBackClick,
}: SendbirdChatRoomContentProps) {
  const { sendBirdId } = useAuth();
  const channelUrl = channel?.url || "";

  //   const { handleSendMessage } = useMessageActions();

  const renderMessage = (messageContent: MessageContentProps) => {
    const { message } = messageContent;
    // if (!message) return null;

    const uiType = getUIMessageType(sendBirdId, message);
    switch (uiType) {
      case UIMessageType.INVISIBLE:
      case UIMessageType.DELETED:
        return <></>;
      case UIMessageType.ADMIN:
        return <SendbirdChatRoomSystemMessage message={message} />;
      default:
        break;
    }
    return <></>;
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
            renderChannelHeader={
              showHeader
                ? () => (
                    <>
                      {/* <ChannelHeader
                      showBackButton={true}
                      onBackClick={onBackClick}
                    /> */}
                    </>
                  )
                : undefined
            }
            // 날짜 구분선
            renderCustomSeparator={({ message }) => (
              <>{/* <DateSeparator createdAt={message.createdAt} /> */}</>
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
              </>
            )}
          />
        </div>
      </GroupChannelProvider>
    </div>
  );
}
