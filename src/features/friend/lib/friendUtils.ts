import { Friend } from '@/features/friend/api';
import { compareByName } from '@/shared/lib/sortUtils';

/**
 * 친구의 표시 이름을 가져오는 함수
 * 우선순위: editedName > syncName > profileName
 * @param friend - 친구 객체
 * @returns 표시할 이름
 */
export const getDisplayName = (friend: Friend): string => {
  return (
    friend.editedName || friend.syncName || friend.profile.profileName || ''
  );
};

/**
 * 친구 목록을 이름에 따라 정렬하는 함수
 * 정렬 순서: 한글 → 영어 → 숫자 → 이모티콘
 * @param friends - 친구 배열
 * @returns 정렬된 친구 배열
 */
export const sortFriendsByName = (friends: Friend[]): Friend[] => {
  if (!friends || friends.length === 0) return [];

  try {
    const friendsCopy = [...friends];

    return friendsCopy.sort((a, b) => {
      const nameA = getDisplayName(a);
      const nameB = getDisplayName(b);

      return compareByName(nameA, nameB);
    });
  } catch (error) {
    console.error('친구 목록 정렬 중 오류 발생:', error);
    return friends;
  }
};
