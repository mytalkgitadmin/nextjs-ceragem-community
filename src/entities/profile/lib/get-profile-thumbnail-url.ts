import { getApiBaseUrl } from "@/shared/api";
import type { Profile } from "@/entities/friend";

const DEFAULT_PROFILE_SMALL = "/assets/profile/bemilyDefaultProfile.webp";

export function getProfileThumbnailUrl(
  profile: Profile | undefined | null
): string {
  if (!profile) return DEFAULT_PROFILE_SMALL;

  if (profile.profileKind === "emoticon") {
    return DEFAULT_PROFILE_SMALL;
  }

  if (profile.profileThumbnail) {
    return `${getApiBaseUrl()}${profile.profileThumbnail}`;
  }

  if (profile.profileSmallThumbnail) {
    return `${getApiBaseUrl()}${profile.profileSmallThumbnail}`;
  }

  if (profile.profileOriginal) {
    return `${getApiBaseUrl()}${profile.profileOriginal}`;
  }

  return DEFAULT_PROFILE_SMALL;
}
