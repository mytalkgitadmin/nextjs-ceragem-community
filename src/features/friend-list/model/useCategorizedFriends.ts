import { useMemo } from "react";

import type { FriendEntity, FriendType } from "@/entities/friend";
import useFriends from "./useFriends";
import { compareByName } from "@/shared/lib/sort";
import { isUpdatedProfile } from "@/entities/profile/lib/is-updated-profile";

interface CategorizedFriends {
  allFriends: FriendEntity[];
  favoriteFriends: FriendEntity[];
  newFriends: FriendEntity[];
  updatedFriends: FriendEntity[];
  requestFriends: FriendEntity[];
  hideFriends: FriendEntity[];
  blockFriends: FriendEntity[];
  isLoading: boolean;
  error: Error | null;
}

const FRIEND_TYPES: FriendType[] = [
  "NORMAL",
  "FAVORITE",
  "REQUESTED",
  "HIDE",
  "BLOCK",
];

const getDisplayName = (friend: FriendEntity): string => {
  return (
    friend.editedName || friend.syncName || friend.profile.profileName || ""
  );
};

const sortFriendsByName = (friends: FriendEntity[]): FriendEntity[] => {
  if (!friends || friends.length === 0) return [];
  try {
    const copy = [...friends];
    return copy.sort((a, b) =>
      compareByName(getDisplayName(a), getDisplayName(b))
    );
  } catch (e) {
    return friends;
  }
};

export function useCategorizedFriends(): CategorizedFriends {
  const { data, isLoading, error } = useFriends({
    friendType: FRIEND_TYPES,
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
        error: (error as Error) ?? null,
      };
    }

    const { friends } = data;

    const allFriends: FriendEntity[] = [];
    const favoriteFriends: FriendEntity[] = [];
    const newFriends: FriendEntity[] = [];
    const updatedFriends: FriendEntity[] = [];
    const requestFriends: FriendEntity[] = [];
    const hideFriends: FriendEntity[] = [];
    const blockFriends: FriendEntity[] = [];

    for (const friend of friends) {
      switch (friend.relationType) {
        case "FAVORITE":
          favoriteFriends.push(friend);
          allFriends.push(friend);
          break;
        case "REQUESTED":
          requestFriends.push(friend);
          break;
        case "HIDE":
          hideFriends.push(friend);
          break;
        case "BLOCK":
          blockFriends.push(friend);
          break;
        case "NORMAL":
        default:
          allFriends.push(friend);
      }

      if (friend.relationType !== "HIDE" && friend.relationType !== "BLOCK") {
        if (friend?.isNew) {
          newFriends.push(friend);
        }
        if (
          friend.profile?.lastModifiedDate &&
          isUpdatedProfile(friend.profile.lastModifiedDate)
        ) {
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
      error: (error as Error) ?? null,
    };
  }, [data, isLoading, error]);
}

export { useCategorizedFriends as default };
