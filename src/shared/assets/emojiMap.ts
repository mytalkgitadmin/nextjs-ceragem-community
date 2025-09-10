const emojiMap: Record<string, string> = {
  // Sendbird 기본 리액션들
  emoji_01: "/assets/emoji/emoji_01.webp",
  emoji_02: "/assets/emoji/emoji_02.webp",
  emoji_03: "/assets/emoji/emoji_03.webp",
  emoji_04: "/assets/emoji/emoji_04.webp",
  emoji_05: "/assets/emoji/emoji_05.webp",
  emoji_06: "/assets/emoji/emoji_06.webp",
};

// 기본 이모지 (존재하지 않는 키일 때 사용)
const DEFAULT_EMOJI = "/assets/emoji/emoji_01.webp"; // 기본값으로 첫 번째 이모지 사용

/**
 * 이모지 키로 이미지 URL 가져오기
 * @param key - 이모지 키 (예: 'like', 'love')
 * @returns 이모지 이미지 URL
 */
export const getEmojiUrl = (key: string): string => {
  return emojiMap[key] || DEFAULT_EMOJI;
};

/**
 * 사용 가능한 모든 이모지 키 목록
 */
export const getAvailableEmojiKeys = (): string[] => {
  return Object.keys(emojiMap);
};

export { emojiMap };
