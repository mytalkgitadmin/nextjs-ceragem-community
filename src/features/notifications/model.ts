import { ApiResponse } from '@/shared/api';
import { BaseMessage } from '@sendbird/chat/message';

export interface TotalNotificationState {
  // 읽지 않은 채팅 메시지
  chatUnreadCount: number;
  setChatUnreadCount: (count: number) => void;

  // 친구 요청 메시지
  friendRequestCount: number;
  setFriendRequestCount: (count: number) => void;
  increaseFriendRequestCount: () => void;
  decreaseFriendRequestCount: () => void;

  // 파이어 베이스 메시지
  firebaseCount: number;
  setFirebaseCount: (count: number) => void;
  increaseFirebaseCount: () => void;
  decreaseFirebaseCount: () => void;

  // 전체 카운트
  totalUnreadCount: number;
  calculateTotalCount: () => void;
  resetAllCounts: () => void;
}

// 타입 확장
export interface ExtendedBaseMessage extends BaseMessage {
  sender?: {
    nickname?: string;
    [key: string]: unknown;
  };
}

// 채널 응답
export type ResponseNotification = ApiResponse<Notifications>;
export type RequestNotification = ApiResponse<{
  result: boolean;
  resultData: null;
}>;

export interface Notifications {
  receiverId: number;
  notifications: Notification[];
}

export interface Notification {
  id: string;
  code: 'SF_FR_REQ_ACPT' | 'SF_FR_REQ' | string;
  category:
    | 'AFFILIATE'
    | 'CHAT'
    | 'EVENT'
    | 'FRIEND'
    | 'MY'
    | 'NOTICE'
    | 'Z'
    | string;
  classification: 'SERVICE' | 'CHAT' | string;
  screenCode: 'Friend' | 'ProfileUserViewer' | 'InviteFriend' | string;
  screenContentId: number | null;
  title: string;
  message: string;
  isRead: boolean;
  createdDate: number;
}

interface NotificationItem {
  id: string;
  title: string;
  body: string;
  timestamp: Date;
  read: boolean;
  channelUrl?: string;
  sender?: string;
}

export interface NotificationState {
  notifications: NotificationItem[];
  unreadCount: number;

  // 액션
  addNotification: (notification: NotificationItem) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  increaseUnreadCount: () => void;
  decreaseUnreadCount: () => void;
  resetUnreadCount: () => void;
}

export interface BrowserNotification {
  id: string;
  body: string;
  channelUrl: string;
  sender: string;

  title: string;
  timestamp: Date;
  read: boolean;
  channelType?: 'DIRECT' | 'GROUP';
  messageType?: 'TEXT' | 'FILE' | 'IMAGE' | 'ADMIN';

  type?: 'CHAT' | 'FRIEND_REQUEST' | 'ANNOUNCEMENT' | 'SYSTEM';
}
