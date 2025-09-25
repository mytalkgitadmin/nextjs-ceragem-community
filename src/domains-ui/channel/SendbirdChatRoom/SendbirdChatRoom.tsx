"use client";

import {
  GroupChannelProvider,
  MessageListQueryParamsType,
} from "@sendbird/uikit-react/GroupChannel/context";
import { MessageContentProps } from "@sendbird/uikit-react/ui/MessageContent";
import { GroupChannel as GroupChannelType } from "@sendbird/chat/groupChannel";
import { useGroupChannelContext } from "@sendbird/uikit-react/GroupChannel/context";
import GroupChannel from "@sendbird/uikit-react/GroupChannel";
import { ReplyType } from "@sendbird/chat/message";
import {
  getUIMessageType,
  UIMessageType,
  isDeletedMessageToUser,
  isInvisibleMessage,
} from "@/domains/message";
import { useMemo } from "react";
import { useAuth } from "@/domains/auth";
import { SystemMessage, Message } from "@/domains-ui/message";
import { useChannelMsgChainMap } from "@/domains/channel";
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
  const channelUrl = channel?.url || "";

  return (
    <div className="h-full w-full flex flex-col min-h-0 bg-white">
      <GroupChannelProvider channelUrl={channelUrl}>
        <Channel channel={channel} onBackClick={onBackClick} />
      </GroupChannelProvider>
    </div>
  );
}

const Channel = ({ channel, onBackClick }: SendbirdChatRoomContentProps) => {
  const { sendBirdId } = useAuth();
  const channelUrl = channel?.url || "";

  const chainMap = useChannelMsgChainMap(sendBirdId);

  const renderMessage = (messageContent: MessageContentProps) => {
    const { message } = messageContent;

    const chainInfo = chainMap.get(message.messageId);
    const chainTop = chainInfo?.chainTop || false;
    const chainBottom = chainInfo?.chainBottom || false;

    if (
      isInvisibleMessage(message) ||
      isDeletedMessageToUser(message, sendBirdId)
    ) {
      return <></>;
    }

    const uiType = getUIMessageType(message);

    if (uiType === UIMessageType.SYSTEM) {
      return <SystemMessage message={message} />;
    } else {
      return (
        <Message
          message={message}
          chainTop={chainTop || false}
          chainBottom={chainBottom || false}
        />
      );
    }
  };

  return (
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
          <SendbirdChatRoomInputContainer channel={channel} />
        )}
      />
    </div>
  );
};
