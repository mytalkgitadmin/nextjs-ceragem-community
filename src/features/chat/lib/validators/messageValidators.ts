import {
  MessageCustomType,
  MessageInDataType,
  MessageType,
} from '@/features/chat/model';

/**
 * 메시지 유효성 검증 유틸리티
 */
export const isValidMessage = (message: string): boolean => {
  return (
    message.replace(/\n/g, '').replace(/\s*/g, '').replaceAll(' ', '').length >
    0
  );
};

export const isAdminMessage = (
  messageType: string,
  customType: string,
  messageInDataType: string,
): boolean => {
  return (
    messageType === MessageType.ADMIN ||
    customType === MessageCustomType.SENDBIRD ||
    (customType === MessageCustomType.BEFAMILY &&
      [
        MessageInDataType.USER_LEAVE,
        MessageInDataType.USER_JOIN,
        MessageInDataType.CHANNEL_KICK_USERS,
        MessageInDataType.CHANNEL_ASSIGN_MASTER,
      ].includes(messageInDataType as MessageInDataType))
  );
};
