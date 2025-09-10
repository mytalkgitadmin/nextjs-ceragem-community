/**
 * 텍스트를 클립보드에 복사하는 간단한 함수
 * @param text 복사할 텍스트
 * @returns 복사 성공 여부와 에러 타입
 */
export async function copyToClipboard(text: string): Promise<{
  success: boolean;
  error?: 'EMPTY_TEXT' | 'CLIPBOARD_API_FAILED' | 'EXEC_COMMAND_FAILED';
}> {
  if (!text) return { success: false, error: 'EMPTY_TEXT' };

  try {
    // 최신 Clipboard API 시도 (HTTPS 환경)
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return { success: true };
    }

    // 레거시 방식 (document.execCommand)
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';

    document.body.appendChild(textArea);
    textArea.select();

    const success = document.execCommand('copy');
    document.body.removeChild(textArea);

    if (success) {
      return { success: true };
    } else {
      return { success: false, error: 'EXEC_COMMAND_FAILED' };
    }
  } catch (error) {
    console.error('클립보드 복사 실패:', error);
    return { success: false, error: 'CLIPBOARD_API_FAILED' };
  }
}
