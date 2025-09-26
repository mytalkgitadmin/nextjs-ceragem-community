import { ChannelType } from "../constants";
import {
  createChatRoom as createChatRoomAPI,
  inviteChatRoom as inviteChatRoomAPI,
  type InviteChatRoomResponseData,
  type CreateChatRoomResponseData,
} from "../api";

/**
 * 신규 채널 생성
 * @param myId 내 아이디
 * @param memberIds 초대할 멤버 아이디 목록
 * @returns { channelId: number; channelUrl: string }
 */

export interface CreateChatRoomInput {
  myId: string;
  memberIds: string[];
}

export const createChatRoom = async (
  input: CreateChatRoomInput
): Promise<CreateChatRoomResponseData> => {
  const { myId } = input;
  let { memberIds } = input;

  memberIds = memberIds.filter((id) => id !== myId);

  const accountIds = [myId, ...memberIds];

  let channelType = ChannelType.DIRECT;
  if (memberIds.length > 2) {
    channelType = ChannelType.GROUP;
  }

  const response = await createChatRoomAPI({
    channelType,
    accountIds,
  });

  return response.resultData;
};

/**
 * 채널 초대
 * @param channelUrl 채널 URL
 * @param members 초대할 멤버 목록
 * @param kickedMembers 강제 퇴장된 멤버 목록
 * @param addMemberIds 추가할 멤버 아이디 목록
 * @returns { channelId: number; channelUrl: string }
 */

export interface InviteChatRoomInput {
  channelUrl: string;
  members: any[];
  kickedMembers: any[];
  addMemberIds: string[];
}

export const inviteChatRoom = async (
  input: InviteChatRoomInput
): Promise<InviteChatRoomResponseData> => {
  const { channelUrl, members, kickedMembers, addMemberIds } = input;

  if (members.length <= 2) {
    //1:1 대화방일때 신규 방 생성 작업 필요
    const accountIds = [
      ...members.map((member: any) => member.accountId as string),
      ...addMemberIds,
    ];

    const response = await createChatRoomAPI({
      channelType: ChannelType.GROUP,
      accountIds,
    });

    return response.resultData;
  } else {
    const isMaster = members.some(
      (member: any) =>
        member.participantType === "MASTER" && member.relationType === "ME"
    );

    if (!isMaster) {
      const hasKickedMember = kickedMembers.some((member: any) =>
        addMemberIds.includes(member.accountId)
      );
      if (hasKickedMember) {
        throw new Error("강제 퇴장된 멤버 초대 불가");
      }
    }

    const response = await inviteChatRoomAPI({
      channelUrl,
      accountIds: [
        ...members.map((member: any) => member.accountId as string),
        ...addMemberIds,
      ],
    });

    return response.resultData;
  }
};
