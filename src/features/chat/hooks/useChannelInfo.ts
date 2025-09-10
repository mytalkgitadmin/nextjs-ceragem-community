import { useMemo } from 'react';
import type { GroupChannel } from '@sendbird/chat/groupChannel';
import { Channel, Member } from '@/features/chat/model';

import { useChannelList } from '../api';
import { DEFAULT_CHANNEL_NAMES } from '../constants';
import {
  generateChannelName,
  getMemberName,
  sortMembersByPriority,
} from '../lib';

interface ChannelInfo {
  channelName: string;
  membersList: Member[];
}

export default function useChannelInfo(
  channel: GroupChannel | null,
  includesMyProfile: boolean = false,
): ChannelInfo {
  // 채널 상세 정보를 가져오는 API 호출
  const { data } = useChannelList(channel?.url || '');

  // API 응답에서 현재 채널에 해당하는 데이터 찾기
  const bChannel = useMemo(() => {
    if (!data?.resultData || !channel?.url) return null;
    return (data.resultData as Channel[]).find(
      (item) => item.channelUrl === channel.url,
    );
  }, [data, channel?.url]);

  // 활성 멤버 필터링 (나 포함 여부 )
  const filteredMembers = useMemo(() => {
    if (!bChannel?.members) return [];

    const filtered = includesMyProfile
      ? bChannel.members.filter(
          (member: Member) =>
            member.accountStatus !== 'EXIT' &&
            member.participantType !== 'KICKED',
        )
      : bChannel.members.filter(
          (member: Member) =>
            member.relationType !== 'ME' &&
            member.accountStatus !== 'EXIT' &&
            member.participantType !== 'KICKED',
        );
    return filtered;
  }, [bChannel, includesMyProfile]);

  // 채널 이름과 멤버 리스트 계산
  const channelInfo = useMemo((): ChannelInfo => {
    if (!channel) {
      return { channelName: '', membersList: [] };
    }

    const { customType, name } = channel;

    // 커스텀 채널명이 설정된 경우
    if (!DEFAULT_CHANNEL_NAMES.includes(name)) {
      return { channelName: name, membersList: [...filteredMembers] };
    }

    // 채널 타입별로 이름과 멤버 리스트 결정
    switch (customType) {
      case 'MY':
        return { channelName: 'MY 메모', membersList: [] };

      case 'DIRECT':
        if (!filteredMembers || filteredMembers.length === 0) {
          return { channelName: '대화 상대 없음', membersList: [] };
        } else {
          // DIRECT 채널에서는 나 → 상대방 순서로 정렬
          const sortedMembers = sortMembersByPriority(
            filteredMembers,
            'DIRECT',
          );
          return {
            channelName: getMemberName(filteredMembers[0]),
            membersList: [...sortedMembers],
          };
        }

      case 'GROUP':
      case 'FAMILY':
        if (!filteredMembers || filteredMembers.length === 0) {
          return { channelName: '대화 상대 없음', membersList: [] };
        } else {
          // GROUP/FAMILY 채널에서는 방장 → 나 → 일반 멤버 순서로 정렬
          const sortedMembers = sortMembersByPriority(
            filteredMembers,
            customType,
          );
          const channelName = generateChannelName(sortedMembers);

          return { channelName, membersList: [...sortedMembers] };
        }
      default:
        return { channelName: name, membersList: [] };
    }
  }, [channel, filteredMembers]);

  return channelInfo;
}
