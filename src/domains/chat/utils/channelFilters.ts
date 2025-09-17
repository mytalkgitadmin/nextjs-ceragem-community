import { GroupChannel } from "@sendbird/chat/groupChannel";
// import

// /**
//  * 제외할 채널 타입인지 확인
//  * @param channel - 채널 객체
//  * @returns 제외할 채널 타입인지 여부
//  */

// const EXCLUDED_CHANNEL_TYPES = ["MY", "PRIVATE"] as const; // 'MY', 'PRIVATE' 채널 제외

// export const shouldExcludeChannel = (channel: GroupChannel): boolean => {
//   return EXCLUDED_CHANNEL_TYPES.includes(channel.customType as any);
// };

// /**
//  * 채널 타입에 따라 채널 필터링
//  * @param channel - 채널 객체
//  * @param channelType - 채널 타입
//  * @returns 채널 필터링 여부
//  */

// export const shouldFilterByChannelType = (
//   channel: GroupChannel,
//   channelType: string
// ): boolean => {
//   if (channelType === "GENERAL") {
//     return channel.customType === "FAMILY";
//   }

//   if (channelType === "FAMILY") {
//     return ["GROUP", "MY", "DIRECT"].includes(channel.customType);
//   }

//   return false;
// };

/**
 * 채널 목록에 포함되는 채널인지 확인
 * @param channel - 채널 객체
 * @returns 채널 목록에 포함되는 채널인지 여부
 */

export const shouldIncludeChannel = (channel: GroupChannel): boolean => {
  if (!channel?.lastMessage?.createdAt) return false;

  return true;
};
