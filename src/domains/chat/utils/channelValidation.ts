import { GroupChannel } from "@sendbird/chat/groupChannel";
import { isYesterday } from "@/shared/utils/dateUtils";

/**
 * 채널에 마지막 메시지가 있는지 확인
 * @param channel - 채널 객체
 * @returns 채널에 마지막 메시지가 있는지 여부
 */

export const hasChannelLastMessage = (channel: GroupChannel): boolean => {
  return !!(channel?.lastMessage && channel?.lastMessage?.createdAt);
};

/**
 * 채널의 마지막 메시지가 어제인지 확인
 * @param channel - 채널 객체
 * @returns 채널의 마지막 메시지가 어제인지 여부
 */

export const isChannelLastMessageYesterday = (
  channel: GroupChannel
): boolean => {
  if (!channel?.lastMessage?.createdAt) return false;
  return isYesterday(Number(channel.lastMessage.createdAt));
};

// export const findChannelInfo = (
//   channelList: any[],
//   channelUrl: string
// ): any | undefined => {
//   return channelList?.find((item: any) => item.channelUrl === channelUrl);
// };

// export const getUnreadMessageCount = (channel: any): number => {
//   return channel?.unreadMessageCount || 0;
// };

// export const getMyPushTriggerOption = (channel: any): "on" | "off" => {
//   return channel?.myPushTriggerOption || "on";
// };
