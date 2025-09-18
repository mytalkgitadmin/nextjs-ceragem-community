"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { ModalContextState, ModalItem, ModalConfig } from "./types";

/**
 * Modal Context
 */
const ModalContext = createContext<ModalContextState | null>(null);

/**
 * 고유 ID 생성 함수
 */
const generateId = () => {
  return `modal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Modal Provider Props
 */
interface ModalProviderProps {
  children: ReactNode;
}

/**
 * Modal Provider 컴포넌트
 */
export function ModalProvider({ children }: ModalProviderProps) {
  const [modals, setModals] = useState<ModalItem[]>([]);

  /**
   * Modal 열기
   */
  const openModal = (content: ReactNode, config: ModalConfig = {}) => {
    const id = generateId();

    const modalItem: ModalItem = {
      id,
      content,
      config: {
        ...config,
        onClose: () => {
          config.onClose?.();
          closeModal(id);
        },
      },
    };

    setModals((prevModals) => [...prevModals, modalItem]);
    return id;
  };

  /**
   * Modal 닫기
   */
  const closeModal = (id?: string) => {
    if (!id) {
      // ID가 없으면 가장 최근(마지막) modal 닫기
      setModals((prevModals) => prevModals.slice(0, -1));
    } else {
      // 특정 ID의 modal 닫기
      setModals((prevModals) => prevModals.filter((modal) => modal.id !== id));
    }
  };

  /**
   * Modal에 닫기 요청
   */
  const requestCloseModal = (id?: string) => {
    if (id) {
      setModals((prev) =>
        prev.map((modal) =>
          modal.id === id
            ? { ...modal, config: { ...modal.config, requestClose: true } }
            : modal
        )
      );
    } else {
      setModals((prev) =>
        prev.map((modal) => ({
          ...modal,
          config: { ...modal.config, requestClose: true },
        }))
      );
    }
  };

  /**
   * 모든 Modal 닫기
   */
  const closeAllModals = () => {
    setModals([]);
  };

  /**
   * 현재 modal이 열려있는지 확인
   */
  const hasOpenModal = modals.length > 0;

  const value: ModalContextState = {
    modals,
    openModal,
    closeModal,
    requestCloseModal,
    closeAllModals,
    hasOpenModal,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}

/**
 * ModalContext 사용 훅
 */
export function useModalContext(): ModalContextState {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }

  return context;
}
