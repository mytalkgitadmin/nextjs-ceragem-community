"use client";

import { ReactNode, useCallback } from "react";
import { useDrawerContext } from "./context";
import { DrawerConfig, OpenDrawerFunction, CloseDrawerFunction } from "./types";

/**
 * Drawer 제어를 위한 메인 훅
 */
export function useDrawer() {
  const context = useDrawerContext();

  const openDrawer: OpenDrawerFunction = useCallback(
    (content: ReactNode, config?: DrawerConfig) => {
      return context.openDrawer(content, config);
    },
    [context]
  );

  const closeDrawer: CloseDrawerFunction = useCallback(
    (id?: string) => {
      context.closeDrawer(id);
    },
    [context]
  );

  const closeAllDrawers = useCallback(() => {
    context.closeAllDrawers();
  }, [context]);

  return {
    /**
     * drawer 열기
     * @param content drawer에 표시할 내용
     * @param config drawer 설정 옵션
     * @returns drawer ID
     */
    openDrawer,
    /**
     * drawer 닫기
     * @param id drawer ID (없으면 가장 최근 drawer 닫기)
     */
    closeDrawer,
    /**
     * 모든 drawer 닫기
     */
    closeAllDrawers,
    /**
     * 현재 열린 drawer 목록
     */
    drawers: context.drawers,
    /**
     * drawer가 열려있는지 확인
     */
    hasOpenDrawer: context.hasOpenDrawer,
  };
}

/**
 * 간편한 drawer 유틸리티 함수들
 */
export const drawerUtils = {
  /**
   * 전역적으로 drawer 열기 (React 컴포넌트 밖에서도 사용 가능)
   * 주의: Provider 내부에서만 사용해야 함
   */
  openDrawer: (content: ReactNode, config?: DrawerConfig) => {
    // 이 함수는 실제로는 useDrawer 훅을 통해 사용해야 함
    console.warn(
      "drawerUtils.openDrawer는 deprecated입니다. useDrawer 훅을 사용해주세요."
    );
  },
  /**
   * 전역적으로 drawer 닫기
   */
  closeDrawer: (id?: string) => {
    console.warn(
      "drawerUtils.closeDrawer는 deprecated입니다. useDrawer 훅을 사용해주세요."
    );
  },
};
