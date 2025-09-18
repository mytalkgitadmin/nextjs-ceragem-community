"use client";

import { ReactNode, useCallback } from "react";
import { useModalContext } from "./context";
import { ModalConfig, OpenModalFunction, CloseModalFunction } from "./types";

/**
 * Modal 제어를 위한 메인 훅
 */
export function useModal() {
  const context = useModalContext();

  const openModal: OpenModalFunction = useCallback(
    (content: ReactNode, config?: ModalConfig) => {
      return context.openModal(content, config);
    },
    [context]
  );

  const closeModal: CloseModalFunction = useCallback(
    (id?: string) => {
      context.closeModal(id);
    },
    [context]
  );

  const closeAllModals = useCallback(() => {
    context.closeAllModals();
  }, [context]);

  const requestCloseModal = useCallback(
    (id?: string) => {
      context.requestCloseModal(id);
    },
    [context]
  );

  return {
    /**
     * modal 열기
     * @param content modal에 표시할 내용
     * @param config modal 설정 옵션
     * @returns modal ID
     */
    openModal,
    /**
     * modal 닫기
     * @param id modal ID (없으면 가장 최근 modal 닫기)
     */
    closeModal,
    /**
     * 모든 modal 닫기
     */
    closeAllModals,
    /**
     * 현재 열린 modal 목록
     */
    modals: context.modals,
    /**
     * modal이 열려있는지 확인
     */
    hasOpenModal: context.hasOpenModal,
    /**
     * modal에 닫기 요청
     * @param id modal ID (없으면 가장 최근 modal 닫기)
     */
    requestCloseModal,
  };
}

/**
 * 간편한 modal 유틸리티 함수들
 */
export const modalUtils = {
  /**
   * 전역적으로 modal 열기 (React 컴포넌트 밖에서도 사용 가능)
   * 주의: Provider 내부에서만 사용해야 함
   */
  openModal: (content: ReactNode, config?: ModalConfig) => {
    // 이 함수는 실제로는 useModal 훅을 통해 사용해야 함
    console.warn(
      "modalUtils.openModal는 deprecated입니다. useModal 훅을 사용해주세요."
    );
  },
  /**
   * 전역적으로 modal 닫기
   */
  closeModal: (id?: string) => {
    console.warn(
      "modalUtils.closeModal는 deprecated입니다. useModal 훅을 사용해주세요."
    );
  },
};
