import { UNKNOWN_USER } from "../constants";

/**
 * 사용자 프로필에서 이름을 추출하는 함수
 * @param profile 사용자 프로필 객체
 * @returns 이름
 */

export const getUserNameFromProfile = (profile: any): string => {
  if (!profile) return UNKNOWN_USER;

  return (
    profile.editedName ||
    profile.syncName ||
    profile.profile?.profileName ||
    UNKNOWN_USER
  );
};
