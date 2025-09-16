import { BaseMessage } from '@sendbird/chat/message';
import { getMessageType } from '../utils/messageTypeUtils';
import { MESSAGE_TYPES } from '../constants/messageTypes';
import {
  TextMessage,
  FileMessage,
  ContactMessage,
  NoticeMessage,
  ReplyMessage,
  AdminMessage
} from './messages';

interface MessageRendererProps {
  message: BaseMessage;
  isMine: boolean;
  senderName: string;
}

export function MessageRenderer({ message, isMine, senderName }: MessageRendererProps) {
  const messageType = getMessageType(message);

  // 메시지 데이터 생성 (기본 구조)
  const baseData = {
    timestamp: message.createdAt,
    senderId: message.sender?.userId || '',
    senderName: senderName,
    channelUrl: message.channelUrl,
  };

  // 메시지 타입에 따른 컴포넌트 렌더링
  switch (messageType) {
    case MESSAGE_TYPES.TEXT:
    case MESSAGE_TYPES.TEXT_LONG: {
      const content = message.messageType === 'user' ? (message as any).message : '';
      const textData = {
        ...baseData,
        messageType,
        content,
        isLongText: messageType === MESSAGE_TYPES.TEXT_LONG,
      };
      return <TextMessage data={textData} isMine={isMine} />;
    }

    case MESSAGE_TYPES.FILE:
    case MESSAGE_TYPES.IMAGE:
    case MESSAGE_TYPES.VIDEO: {
      if (message.messageType === 'file') {
        const fileMessage = message as any;
        const fileData = {
          ...baseData,
          messageType,
          fileUrl: fileMessage.url || '',
          fileName: fileMessage.name || '',
          fileSize: fileMessage.size || 0,
          mimeType: fileMessage.type || '',
          thumbnailUrl: fileMessage.thumbnails?.[0]?.url,
        };
        return <FileMessage data={fileData} isMine={isMine} />;
      }
      break;
    }

    case MESSAGE_TYPES.CONTACT: {
      // 커스텀 데이터에서 연락처 정보 추출
      let contactData = null;
      try {
        if (message.messageType === 'user' && (message as any).data) {
          const customData = JSON.parse((message as any).data);
          contactData = customData.contact;
        }
      } catch (error) {
        console.warn('연락처 데이터 파싱 실패:', error);
      }

      if (contactData) {
        const data = {
          ...baseData,
          messageType: MESSAGE_TYPES.CONTACT,
          contact: contactData,
        };
        return <ContactMessage data={data} isMine={isMine} />;
      }
      break;
    }

    case MESSAGE_TYPES.NOTICE: {
      // 공지사항 데이터 추출
      let noticeData = null;
      try {
        if (message.messageType === 'user' && (message as any).data) {
          const customData = JSON.parse((message as any).data);
          noticeData = customData.notice;
        }
      } catch (error) {
        console.warn('공지사항 데이터 파싱 실패:', error);
      }

      if (noticeData) {
        const data = {
          ...baseData,
          messageType: MESSAGE_TYPES.NOTICE,
          notice: noticeData,
        };
        return <NoticeMessage data={data} isMine={isMine} />;
      }
      break;
    }

    case MESSAGE_TYPES.REPLY: {
      if (message.messageType === 'user') {
        const userMessage = message as any;
        const parentMessage = userMessage.parentMessage;

        if (parentMessage) {
          const replyData = {
            ...baseData,
            messageType: MESSAGE_TYPES.REPLY,
            content: userMessage.message || '',
            parentMessage: {
              messageId: parentMessage.messageId,
              content: parentMessage.message || '',
              senderName: parentMessage.sender?.nickname || '',
              messageType: getMessageType(parentMessage),
            },
          };
          return <ReplyMessage data={replyData} isMine={isMine} />;
        }
      }
      break;
    }

    case MESSAGE_TYPES.ADMIN: {
      if (message.messageType === 'admin') {
        const adminMessage = message as any;
        const adminData = {
          ...baseData,
          messageType: MESSAGE_TYPES.ADMIN,
          content: adminMessage.message || '',
          adminAction: adminMessage.data ? {
            type: adminMessage.data.type,
            data: adminMessage.data,
          } : undefined,
        };
        return <AdminMessage data={adminData} />;
      }
      break;
    }

    default:
      break;
  }

  // 기본 폴백: 텍스트 메시지로 처리
  const fallbackContent = message.messageType === 'user'
    ? (message as any).message || '메시지를 불러올 수 없습니다.'
    : '지원하지 않는 메시지 타입입니다.';

  const fallbackData = {
    ...baseData,
    messageType: MESSAGE_TYPES.TEXT,
    content: fallbackContent,
    isLongText: false,
  };

  return <TextMessage data={fallbackData} isMine={isMine} />;
}