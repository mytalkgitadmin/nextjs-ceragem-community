import { isEmpty } from "lodash-es";

/**
 * 멤버 프로필 이미지 반환
 * @param member - 멤버 객체
 * @returns 멤버 프로필 이미지
 */

const FILE_TEMP_DOMAIN = process.env.NEXT_PUBLIC_BASE_DOMAIN;
const NICKNAME_NONE = "(알 수 없음)";

export const memberProfileShortImg = (member: any, size: string) => {
  const memberProfile = member.profile;
  const memberStatus = member.accountStatus;

  let img = "/assets/profile/bemily_default_profile.webp";

  if (memberStatus && memberStatus === "EXIT") {
    return (img = "/assets/profile/exit_profile.png");
  } else if (memberStatus && memberStatus === "LEAVE") {
    return (img = "/assets/profile/leave_profile.png");
  }

  if (memberProfile?.profileKind === "normal") {
    if (size === "short") {
      if (!isEmpty(memberProfile?.profileSmallThumbnail))
        img = `${FILE_TEMP_DOMAIN}${memberProfile?.profileSmallThumbnail}`;
      else img = `${FILE_TEMP_DOMAIN}${memberProfile?.profileThumbnail}`;
    } else {
      if (!isEmpty(memberProfile?.profileOriginal))
        img = `${FILE_TEMP_DOMAIN}${memberProfile?.profileOriginal}`;
    }
  } else if (memberProfile?.profileKind === "emoticon") {
    img =
      size === "short"
        ? `/assets/profile/bemily_small_profile$${String(memberProfile?.emoticonId || 0).padStart(3, "0")}.png`
        : `/assets/profile/bemily_profile${String(memberProfile?.emoticonId || 0).padStart(3, "0")}.png`;
  } else if (memberProfile?.profileKind === "basic") {
    if (memberProfile?.profileName === NICKNAME_NONE) {
      img = "/assets/profile/exit_profile.png";
    } else {
      img = "/assets/profile/bemily_default_profile.webp";
    }
  }
  return img;
};
