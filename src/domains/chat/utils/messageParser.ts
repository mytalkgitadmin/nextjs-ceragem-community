/**
 * 메시지 데이터 파싱
 * @param message - 메시지 객체
 * @returns 메시지 데이터
 */
export const parseMessageData = (message: any) => {
  return message?.data ? JSON.parse(message?.data) : null;
};
