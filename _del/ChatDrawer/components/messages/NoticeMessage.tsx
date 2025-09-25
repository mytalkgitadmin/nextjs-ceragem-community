import { NoticeMessageData } from "../../types/messageTypes";

interface NoticeMessageProps {
  data: NoticeMessageData;
  isMine: boolean;
}

export function NoticeMessage({ data, isMine }: NoticeMessageProps) {
  // TODO: 공지사항 메시지 UI 구현
  // - 텍스트(긴,기본), 파일(동영상,사진,파일) 메시지를 공지사항으로 등록 가능
  // - 공지사항 표시 UI 디자인 및 구현 필요

  return (
    <div className={`max-w-sm md:max-w-lg ${isMine ? 'ml-auto' : 'mr-auto'}`}>
      <div className="p-4 rounded-lg border bg-yellow-50 border-yellow-200">
        <div className="flex items-center mb-2">
          <span className="text-lg mr-2">📢</span>
          <span className="text-sm font-medium text-yellow-800">공지사항</span>
        </div>
        <div className="text-sm text-yellow-800">
          공지사항 UI 구현 예정
        </div>
      </div>
    </div>
  );
}