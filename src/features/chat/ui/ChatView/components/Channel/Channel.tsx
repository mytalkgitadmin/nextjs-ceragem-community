"use client";

import {
  MessageListQueryParamsType,
  useGroupChannelContext,
} from "@sendbird/uikit-react/GroupChannel/context";
import GroupChannel from "@sendbird/uikit-react/GroupChannel";
// import { ThreadReplySelectType } from '@sendbird/uikit-react/Channel/context';
import { ReplyType } from "@sendbird/chat/message";

import { Message } from "@/features/chat/ui/Message";
import { DateSeparator } from "../DateSeparator";
import { MessageInput } from "../MessageInput";
import { ScrollController } from "../ScrollController";
import { ChannelHeader } from "../ChannelHeader";

export default function Channel() {
  const { channelUrl } = useGroupChannelContext();

  return (
    <>
      {/* <GroupChannel channelUrl={channelUrl || ''} /> */}
      <GroupChannel
        channelUrl={channelUrl || ""}
        scrollBehavior="smooth" // 스크롤 부드럽게 이동
        isMultipleFilesMessageEnabled={true} // 다중 파일 메시지 기능 활성화
        // replyType="QUOTE_REPLY" // 'NONE' | 'QUOTE_REPLY' | 'THREAD';
        // threadReplySelectType={ThreadReplySelectType.THREAD}
        messageListQueryParams={
          {
            replyType: ReplyType.ALL,
            // includeThreadInfo: true,
            // startingPoint: Date.now(),
            // nextResultLimit: 0,
            // prevResultLimit: 50,
          } as MessageListQueryParamsType
        }
        // 채널 헤더
        renderChannelHeader={() => <ChannelHeader />}
        // 메시지 구분
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
            <MessageInput />
          </>
        )}
      />
      {/* <GroupChannel
        // 검색 아이콘 및 버튼 클릭
        // showSearchIcon={true}

        // onSearchClick={() => {
        //   console.log('ddd');
        // }}

        // 프로필 클릭 시 나타타남
        // renderUserProfile={() => <div>안녕</div>}
        // 멘션 미리보기 커스터마이징
        // renderUserMentionItem={({ user }) => (
        //   <div>
        //     {user.nickname}
        //     {user.userId}
        //   </div>
        // )}

        // 메시지 영역
        // renderMessageList={() => <></>}




        renderPlaceholderEmpty={() => <div>채팅 메시지가 없습니다.</div>}
      /> */}
    </>
  );
}
