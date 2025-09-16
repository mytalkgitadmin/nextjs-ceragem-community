import { useCallback } from "react";

export function useMessageActions() {
  const handleSendMessage = useCallback((message: string) => {
    console.log("메시지 전송:", message);
    // TODO: 실제 메시지 전송 로직 구현
    // - Sendbird SDK를 통한 메시지 전송
    // - 에러 처리
    // - 전송 상태 관리
  }, []);

  return {
    handleSendMessage,
  };
}