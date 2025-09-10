"use client";

import SendbirdProvider from "@sendbird/uikit-react/SendbirdProvider";
import kr from "date-fns/locale/ko";

import { useAuth } from "@/features/auth";
import { NotificationProvider } from "@/features/notifications";

function SendbirdProviderWithAuth({ children }: { children: React.ReactNode }) {
  const { userId, sessionToken, isAuthenticated } = useAuth();

  if (!isAuthenticated || !userId) {
    return <>{children}</>;
  }

  return (
    <SendbirdProvider
      appId={process.env.NEXT_PUBLIC_SENDBIRD_APP_ID || "YOUR_SENDBIRD_APP_ID"}
      userId={userId}
      accessToken={sessionToken || undefined}
      dateLocale={kr}
      uikitOptions={{
        groupChannelList: {
          enableTypingIndicator: false, // 타이핑 상태 표시 활성화
          enableMessageReceiptStatus: true, // 메시지 읽음 상태 표시 활성화
        },

        groupChannel: {
          enableOgtag: true,
          // enableTypingIndicator: false, // 타이핑 상태 표시 활성화
          enableReactions: true,
          // enableReactionsSupergroup: true,
          // enableMention: true,
          threadReplySelectType: "thread", // 'thread' | 'parent'
          // enableVoiceMessage: false,
          // // input: ChannelInputConfig
          // // typingIndicatorTypes: Set<'text' | 'bubble'>
          // enableFeedback: true,
          // enableSuggestedReplies: true,
          // showSuggestedRepliesFor: 'all_messages', // 'all_messages' | 'last_message_only'
          // suggestedRepliesDirection: 'horizontal', //'vertical' | 'horizontal'
          // enableMarkdownForUserMessage: true, //사용자 메시지에서 마크다운 문법 지원 활성화
          // enableFormTypeMessage: true, // 폼 타입 메시지 기능 활성화
        },
      }}
    >
      <NotificationProvider />
      {children}
    </SendbirdProvider>
  );
}

export default SendbirdProviderWithAuth;
