import { get, post } from "@/shared/api/client";
import { ChannelType } from "../constants";

export const getChannelList = async () => {
  const response = await get({
    url: "/channel/list",
  });
  return response;
};

export interface CreateChatRoomRequestData {
  channelType: ChannelType;
  accountIds: string[];
}

export interface CreateChatRoomResponseData {
  channelId: number;
  channelUrl: string;
}

export const createChatRoom = async (
  data: CreateChatRoomRequestData
): Promise<{ result: boolean; resultData: CreateChatRoomResponseData }> => {
  const response = await post({
    url: "/channel",
    data,
  });
  return response;
};

export interface InviteChatRoomRequestData {
  channelUrl: string;
  accountIds: string[];
}

export interface InviteChatRoomResponseData {
  channelId: number;
  channelUrl: string;
}

export const inviteChatRoom = async (
  data: InviteChatRoomRequestData
): Promise<{ result: boolean; resultData: InviteChatRoomResponseData }> => {
  const response = await post({
    url: "/channel/invite",
    data,
  });
  return response;
};
