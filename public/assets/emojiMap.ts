const emojiMap: Record<string, string> = {
  // Sendbird 기본 리액션들
  emoji_01: new URL('@/assets/emoji/emoji_01.webp', import.meta.url).href,
  emoji_02: new URL('@/assets/emoji/emoji_02.webp', import.meta.url).href,
  emoji_03: new URL('@/assets/emoji/emoji_03.webp', import.meta.url).href,
  emoji_04: new URL('@/assets/emoji/emoji_04.webp', import.meta.url).href,
  emoji_05: new URL('@/assets/emoji/emoji_05.webp', import.meta.url).href,
  emoji_06: new URL('@/assets/emoji/emoji_06.webp', import.meta.url).href,
};

// 기본 이모지 (존재하지 않는 키일 때 사용)
const DEFAULT_EMOJI = new URL('@/assets/emoji/default.webp', import.meta.url)
  .href;

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
