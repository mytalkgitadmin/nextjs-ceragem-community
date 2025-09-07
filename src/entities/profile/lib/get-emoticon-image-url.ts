// public/assets 기반 경로 사용
const DEFAULT_SMALL_PROFILE = "/assets/profile/bemilyDefaultProfile.webp";

const pad3 = (num: number) => num.toString().padStart(3, "0");

export const getEmoticonImageUrl = (emoticonId: number): string => {
  if (Number.isFinite(emoticonId) && emoticonId >= 0) {
    const padded = pad3(emoticonId);
    return `/assets/profile/bemilyProfileSmall${padded}.webp`;
  }
  return DEFAULT_SMALL_PROFILE;
};
