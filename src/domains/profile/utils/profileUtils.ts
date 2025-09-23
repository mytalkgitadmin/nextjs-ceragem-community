/**
 * 사용자 프로필에서 이름을 추출하는 함수
 * @param accountProfile 계정 프로필 객체
 * @returns 이름
 */

export const getUserNameFromProfile = (
  accountProfile: any,
  unknownUser: string = ""
): string => {
  if (!accountProfile) return unknownUser;

  return (
    accountProfile.editedName ||
    accountProfile.syncName ||
    accountProfile.profile?.profileName ||
    unknownUser
  );
};

/**
 * 사용자 프로필에서 이미지를 추출하는 함수
 * @param profile 사용자 프로필 객체
 * @returns 이미지
 */

export const getImgFromProfile = (profile: any): string => {
  if (profile?.profileKind === "normal" && profile.profileSmallThumbnail) {
    return `${process.env.NEXT_PUBLIC_BASE_DOMAIN}${profile.profileSmallThumbnail}`;
  }

  if (profile?.emoticonId !== undefined) {
    return `/assets/images/profile/bemily_small_profile${String(profile?.emoticonId || 0).padStart(3, "0")}.png`;
  }

  return "/assets/images/profile/bemily_profile000.png";
};
