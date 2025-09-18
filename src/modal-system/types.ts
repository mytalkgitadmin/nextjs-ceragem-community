import { ReactNode } from "react";

/**
 * Modal 크기 옵션
 */
export type ModalSize = "sm" | "md" | "lg" | "xl" | "2xl" | "full";

/**
 * Modal 설정 옵션
 */
export interface ModalConfig {
  /**
   * Modal 제목
   */
  title?: string;
  /**
   * Modal 크기
   */
  size?: ModalSize;
  /**
   * 헤더 표시 여부
   */
  showHeader?: boolean;
  /**
   * 닫기 버튼 표시 여부
   */
  showCloseButton?: boolean;
  /**
   * 헤더 오른쪽 액션 버튼들
   */
  headerActions?: ReactNode;
  /**
   * 푸터 내용
   */
  footer?: ReactNode;
  /**
   * 외부 클릭 시 닫기 비활성화
   */
  disableBackdropClick?: boolean;
  /**
   * ESC 키로 닫기 비활성화
   */
  disableEscapeKeyDown?: boolean;
  /**
   * 추가 CSS 클래스
   */
  className?: string;
  /**
   * 닫기 요청 플래그
   */
  requestClose?: boolean;
  /**
   * Modal 닫기 시 콜백
   */
  onClose?: () => void;
}

/**
 * Modal 항목 정보
 */
export interface ModalItem {
  /**
   * 고유 ID
   */
  id: string;
  /**
   * Modal 내용
   */
  content: ReactNode;
  /**
   * Modal 설정
   */
  config: ModalConfig;
}

/**
 * ModalContext 상태
 */
export interface ModalContextState {
  /**
   * 현재 활성화된 modal 목록 (스택 형태)
   */
  modals: ModalItem[];
  /**
   * modal 열기
   */
  openModal: (content: ReactNode, config?: ModalConfig) => string;
  /**
   * modal 닫기 (ID 없으면 가장 최근 modal 닫기)
   */
  closeModal: (id?: string) => void;
  /**
   * 모든 modal 닫기
   */
  closeAllModals: () => void;
  /**
   * 현재 modal이 열려있는지 확인
   */
  hasOpenModal: boolean;
  /**
   * modal에 닫기 요청 (ID 없으면 가장 최근 modal에 요청)
   */
  requestCloseModal: (id?: string) => void;
}

/**
 * 유틸리티 함수 타입들
 */
export type OpenModalFunction = (
  content: ReactNode,
  config?: ModalConfig
) => string;

export type CloseModalFunction = (id?: string) => void;
