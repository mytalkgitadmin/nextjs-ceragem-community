// 채널 생성 feature 엔티티 타입

// 채널 생성 엔티티
export interface ChannelCreateEntity {
  channelUrl: string;
  channelName: string | null;
  memberIds: string[];
}
