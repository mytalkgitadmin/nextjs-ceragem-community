import { ReactNode } from "react";

/**
 * Drawer 설정 옵션
 */
export interface DrawerConfig {
  /**
   * Drawer 제목
   */
  title?: string;
  /**
   * 뒤로가기 버튼 표시 여부
   */
  showBackButton?: boolean;
  /**
   * 헤더 오른쪽 액션 버튼들
   */
  headerActions?: ReactNode;
  /**
   * Drawer 너비 (기본값: max-w-md)
   */
  width?: string;
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
   * Drawer 닫기 시 콜백
   */
  onClose?: () => void;
}

/**
 * Drawer 항목 정보
 */
export interface DrawerItem {
  /**
   * 고유 ID
   */
  id: string;
  /**
   * Drawer 내용
   */
  content: ReactNode;
  /**
   * Drawer 설정
   */
  config: DrawerConfig;
}

/**
 * DrawerContext 상태
 */
export interface DrawerContextState {
  /**
   * 현재 활성화된 drawer 목록 (스택 형태)
   */
  drawers: DrawerItem[];
  /**
   * drawer 열기
   */
  openDrawer: (content: ReactNode, config?: DrawerConfig) => string;
  /**
   * drawer 닫기 (ID 없으면 가장 최근 drawer 닫기)
   */
  closeDrawer: (id?: string) => void;
  /**
   * 모든 drawer 닫기
   */
  closeAllDrawers: () => void;
  /**
   * 현재 drawer가 열려있는지 확인
   */
  hasOpenDrawer: boolean;
  /**
   * drawer에 닫기 요청 (ID 없으면 가장 최근 drawer에 요청)
   */
  requestCloseDrawer: (id?: string) => void;
}

/**
 * 유틸리티 함수 타입들
 */
export type OpenDrawerFunction = (
  content: ReactNode,
  config?: DrawerConfig
) => string;

export type CloseDrawerFunction = (id?: string) => void;
