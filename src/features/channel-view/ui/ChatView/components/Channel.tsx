import {
  MessageListQueryParamsType,
  useGroupChannelContext,
} from "@sendbird/uikit-react/GroupChannel/context";
import GroupChannel from "@sendbird/uikit-react/GroupChannel";
import { ReplyType } from "@sendbird/chat/message";

import Message from "@/widgets/message-render/ui/Message";
import { DateSeparator } from "./DateSeparator";
import { MessageInput } from "./MessageInput";
import { ScrollController } from "./ScrollController";
import { ChannelHeader } from "./ChannelHeader";

export default function Channel() {
  const { channelUrl } = useGroupChannelContext();

  return (
    <>
      <GroupChannel
        channelUrl={channelUrl || ""}
        scrollBehavior="smooth"
        isMultipleFilesMessageEnabled={true}
        messageListQueryParams={
          {
            replyType: ReplyType.ALL,
          } as MessageListQueryParamsType
        }
        renderChannelHeader={() => <ChannelHeader />}
        renderCustomSeparator={({ message }) => (
          <DateSeparator createdAt={message.createdAt} />
        )}
        renderMessageContent={(messageContent) => (
          <Message messageContent={messageContent} />
        )}
        renderMessageInput={() => (
          <>
            <ScrollController />
            <MessageInput />
          </>
        )}
      />
    </>
  );
}
