import { useMemo } from "react";
import { GroupChannel } from "@sendbird/chat/groupChannel";
import { useChannelData } from "@/domains/chat/hooks";
import {
  sortMembersByPriority,
  getMemberName,
  generateChannelName,
} from "../utils";

const DEFAULT_CHANNEL_NAMES = [
  "메모 채널",
  "그룹 채널",
  "가족 채널",
  "1:1 채널",
  "Private 채널",
];

interface UseChannelNameOptions {
  includesMyProfile?: boolean;
}

export function useChannelName(
  channel: GroupChannel,
  options: UseChannelNameOptions = {}
) {
  const { includesMyProfile = false } = options;
  const channelData = useChannelData(channel.url);

  // 활성 멤버 필터링
  const filteredMembers = useMemo(() => {
    if (!channelData?.members) return [];

    const filtered = includesMyProfile
      ? channelData.members.filter(
          (member: any) =>
            member.accountStatus !== "EXIT" &&
            member.participantType !== "KICKED"
        )
      : channelData.members.filter(
          (member: any) =>
            member.relationType !== "ME" &&
            member.accountStatus !== "EXIT" &&
            member.participantType !== "KICKED"
        );
    return filtered;
  }, [channelData, includesMyProfile]);

  const channelName = useMemo(() => {
    const { customType, name } = channel;

    // 커스텀 채널명이 설정된 경우
    if (!DEFAULT_CHANNEL_NAMES.includes(name)) {
      return name;
    }

    // 채널 타입별로 이름과 멤버 리스트 결정
    switch (customType) {
      case "MY":
        return "MY 메모";

      case "DIRECT":
        if (!filteredMembers || filteredMembers.length === 0) {
          return "대화 상대 없음";
        } else {
          // DIRECT 채널에서는 나 → 상대방 순서로 정렬
          const sortedMembers = sortMembersByPriority(
            filteredMembers,
            "DIRECT"
          );
          return getMemberName(filteredMembers[0]);
        }

      case "GROUP":
      case "FAMILY":
        if (!filteredMembers || filteredMembers.length === 0) {
          return "대화 상대 없음";
        } else {
          // GROUP/FAMILY 채널에서는 방장 → 나 → 일반 멤버 순서로 정렬
          const sortedMembers = sortMembersByPriority(
            filteredMembers,
            customType
          );
          const channelName = generateChannelName(sortedMembers);

          return channelName;
        }
      default:
        return name;
    }
  }, [channel, filteredMembers]);

  return {
    channelName,
    filteredMembers,
    channelData,
  };
}