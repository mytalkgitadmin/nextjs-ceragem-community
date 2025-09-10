// src/shared/ui/Toast/toastUtils.ts
import { toast } from 'sonner';

/**
 * 토큰 관련 알림을 위한 Toast 유틸리티 함수들
 * @description 일관된 스타일과 메시지로 사용자에게 알림 제공
 */

/**
 * 일반적인 성공 알림
 */
export const showSuccess = (title: string, description?: string) => {
  toast.success(title, {
    description,
    duration: 3000,
  });
};

/**
 * 일반적인 에러 알림
 */
export const showError = (title: string, description?: string) => {
  toast.error(title, {
    description: description || '문제가 발생했습니다. 다시 시도해주세요.',
    duration: 5000,
  });
};

/**
 * 정보 알림
 */
export const showInfo = (title: string, description?: string) => {
  toast.info(title, {
    description,
    duration: 4000,
  });
};

/**
 * 경고 알림
 */
export const showWarning = (title: string, description?: string) => {
  toast.warning(title, {
    description,
    duration: 5000,
  });
};
