// src/features/friend/hooks/useCategorizedFriends.ts
import { useMemo } from 'react';
import { Friend, useFriends } from '@/features/friend/api';
import { isUpdatedProfile } from '@/shared/lib/dateFormatter';
import { sortFriendsByName } from '@/features/friend/lib/friendUtils';

interface CategorizedFriends {
  allFriends: Friend[];
  favoriteFriends: Friend[];
  newFriends: Friend[];
  updatedFriends: Friend[];
  requestFriends: Friend[];

  // 관리 대상
  hideFriends: Friend[];
  blockFriends: Friend[];

  isLoading: boolean;
  error: Error | null;
}

export function useCategorizedFriends(): CategorizedFriends {
  const { data, isLoading, error } = useFriends({
    friendType: ['NORMAL', 'FAVORITE', 'REQUESTED', 'HIDE', 'BLOCK'],
  });

  return useMemo(() => {
    if (!data?.friends) {
      return {
        allFriends: [],
        favoriteFriends: [],
        newFriends: [],
        updatedFriends: [],
        requestFriends: [],
        hideFriends: [],
        blockFriends: [],
        isLoading,
        error,
      };
    }

    const { friends } = data;

    const allFriends: Friend[] = [];
    const favoriteFriends: Friend[] = [];
    const newFriends: Friend[] = [];
    const updatedFriends: Friend[] = [];
    const requestFriends: Friend[] = [];
    const hideFriends: Friend[] = [];
    const blockFriends: Friend[] = [];

    for (const friend of friends) {
      switch (friend.relationType) {
        // 즐겨찾기 친구 분류
        case 'FAVORITE':
          favoriteFriends.push(friend);
          allFriends.push(friend);
          break;

        //  친구 요청 vs 일반 친구 분류
        case 'REQUESTED':
          requestFriends.push(friend);
          break;

        case 'HIDE':
          hideFriends.push(friend);
          break;

        case 'BLOCK':
          blockFriends.push(friend);
          break;

        case 'NORMAL':
        default:
          allFriends.push(friend);
      }

      if (friend.relationType !== 'HIDE' && friend.relationType !== 'BLOCK') {
        // 새로운 친구 분류
        if (friend?.isNew) {
          newFriends.push(friend);
        }

        // 프로필 업데이트한 친구 분류
        if (isUpdatedProfile(friend.profile.lastModifiedDate)) {
          updatedFriends.push(friend);
        }
      }
    }

    return {
      allFriends: sortFriendsByName(allFriends),
      favoriteFriends: sortFriendsByName(favoriteFriends),
      newFriends: sortFriendsByName(newFriends),
      updatedFriends: sortFriendsByName(updatedFriends),
      requestFriends: sortFriendsByName(requestFriends),
      hideFriends: sortFriendsByName(hideFriends),
      blockFriends: sortFriendsByName(blockFriends),
      isLoading,
      error,
    };
  }, [data, isLoading, error]);
}
