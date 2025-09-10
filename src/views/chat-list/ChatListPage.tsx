import { ChatList } from '@/features/chat/ui/ChatList';
import { Suspense } from 'react';

export default function ChatListPage() {
  return (
    <Suspense fallback={<div>채팅 로딩중...</div>}>
      <div className="pageContainer">
        <ChatList />
      </div>
    </Suspense>
  );
}
