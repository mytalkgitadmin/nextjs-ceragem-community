import { AdminMessageData } from "../../types/messageTypes";

interface AdminMessageProps {
  data: AdminMessageData;
}

export function AdminMessage({ data }: AdminMessageProps) {
  const { content, adminAction } = data;

  // 관리자 액션별 아이콘
  const getActionIcon = (actionType?: string) => {
    switch (actionType) {
      case 'user_join':
        return '👋';
      case 'user_leave':
        return '👋';
      case 'channel_update':
        return '⚙️';
      case 'announcement':
        return '📢';
      default:
        return '⚙️';
    }
  };

  return (
    <div className="flex justify-center my-2">
      <div className="max-w-sm px-3 py-2 bg-gray-100 text-gray-600 text-sm rounded-full text-center">
        <div className="flex items-center justify-center space-x-2">
          {adminAction && (
            <span>{getActionIcon(adminAction.type)}</span>
          )}
          <span>{content}</span>
        </div>
      </div>
    </div>
  );
}