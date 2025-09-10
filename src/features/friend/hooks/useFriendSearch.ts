import { useMemo, useState } from 'react';
import { Friend } from '../api';

export default function useFriendSearch({ friends }: { friends: Friend[] }) {
  const [searchQuery, setSearchQuery] = useState('');

  // 검색 결과 필터링
  const filteredFriends = useMemo(() => {
    if (!searchQuery.trim()) return friends;

    const query = searchQuery.toLocaleLowerCase().trim();
    return friends.filter((friend) =>
      friend.profile.profileName.toLowerCase().includes(query),
    );
  }, [friends, searchQuery]);

  const clearSearch = () => setSearchQuery('');

  return {
    searchQuery,
    setSearchQuery,
    filteredFriends,
    clearSearch,
    hasSearchQuery: searchQuery.trim.length > 0,
  };
}
