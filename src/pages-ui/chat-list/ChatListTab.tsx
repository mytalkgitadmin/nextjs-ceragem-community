import { ChatList, ChatDrawerContent, type ChatItemData } from "@/domains-ui";
import { useDrawer } from "@/drawer-system";

export function ChatListTab() {
  // 더미 데이터
  const mockChats: ChatItemData[] = [
    {
      id: "1",
      name: "본사 공지사항",
      lastMessage:
        "공지사항 채팅방이 오늘부터 영업됩니다. 채팅으로 안전한 나은 커...",
      timestamp: "오전 10:31",
      unreadCount: 0,
      isNew: true,
    },
    {
      id: "2",
      name: "고객님 홍길동",
      lastMessage:
        "가장 마지막 대화 메시지가 노출되는 영역입니다. 안전한 나은 커...",
      timestamp: "오전 10:31",
      unreadCount: 39,
    },
    {
      id: "3",
      name: "김지정장",
      lastMessage:
        "가장 마지막 대화 메시지가 노출되는 영역입니다. 안전한 나은 커...",
      timestamp: "오전 10:30",
      unreadCount: 1,
      role: "직원",
    },
    {
      id: "4",
      name: "김세라",
      lastMessage:
        "가장 마지막 대화 메시지가 노출되는 영역입니다. 안전한 나은 나은 커",
      timestamp: "8월 3일",
      unreadCount: 0,
      role: "본사",
    },
    {
      id: "5",
      name: "본사&지점장 소통방",
      lastMessage: "네, 확인됩니다 감사합니다!",
      timestamp: "8월 25일",
      unreadCount: 0,
      isGroup: true,
      groupCount: 5,
    },
    {
      id: "6",
      name: "최코치",
      lastMessage:
        "가장 마지막 대화 메시지가 노출되는 영역입니다. 안전한 나은 커...",
      timestamp: "24.12.05",
      unreadCount: 0,
      role: "코치",
    },
    {
      id: "7",
      name: "(임수원는 사용자)",
      lastMessage:
        "가장 마지막 대화 메시지가 노출되는 영역입니다. 안전한 나은 커...",
      timestamp: "23.12.05",
      unreadCount: 0,
    },
  ];

  const { openDrawer } = useDrawer();

  const handleChatClick = (chat: ChatItemData) => {
    // 글로벌 drawer 시스템을 사용하여 채팅 상세보기 열기
    openDrawer(
      <ChatDrawerContent
        chatInfo={chat}
        onSendMessage={(message) => {
          // TODO: 실제 메시지 전송 로직 구현
          console.log("메시지 전송:", message, "채팅방:", chat.name);
        }}
      />,
      {
        title: chat.name,
        width: "max-w-full",
        // 헤더 액션 버튼들
        headerActions: (
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="1" fill="currentColor" />
                <circle cx="19" cy="12" r="1" fill="currentColor" />
                <circle cx="5" cy="12" r="1" fill="currentColor" />
              </svg>
            </button>
          </div>
        ),
        onClose: () => {
          console.log("채팅방 닫기:", chat.name);
        },
      }
    );
  };

  return (
    <ChatList
      chats={mockChats}
      emptyMessage="대화방이 없습니다."
      onChatClick={handleChatClick}
    />
  );
}
