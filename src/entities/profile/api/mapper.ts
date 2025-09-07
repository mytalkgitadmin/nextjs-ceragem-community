import type { AccountProfileEntity } from "../model/entity-types";
import { AccountProfileDTO } from "./dto-types";

export function profileMapper(input: AccountProfileDTO): AccountProfileEntity {
  const { accountId, editedName, syncName, profile } = input;

  return {
    accountId: Number(accountId ?? 0),
    editedName: String(editedName ?? ""),
    syncName: String(syncName ?? ""),
    profile: {
      profileId: Number(profile?.profileId ?? 0),
      profileName: String(profile?.profileName ?? ""),
      profileMessage: String(profile?.profileMessage ?? ""),
      profileThumbnail: String(profile?.profileThumbnail ?? ""),
      profileSmallThumbnail: String(profile?.profileSmallThumbnail ?? ""),
      profileOriginal: String(profile?.profileOriginal ?? ""),
      emoticonId: Number(profile?.emoticonId ?? 0),
      groupId: Number(profile?.groupId ?? 0),
      profileKind: (profile?.profileKind as any) ?? "normal",
      lastModifiedDate: String(profile?.lastModifiedDate ?? ""),
    },
  };
}
