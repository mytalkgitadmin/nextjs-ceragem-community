import React, { ReactNode } from "react";
import { ModalConfig, useModal } from "@/modal-system";

interface AutoModalConfig extends ModalConfig {
  autoCloseCallbacks?: string[]; // 자동으로 닫을 콜백 이름들
  autoDetect?: boolean; // on으로 시작하는 콜백 자동 감지
}

export const useAutoModal = () => {
  const { openModal, requestCloseModal } = useModal();

  // 방법 2-개선: 더 타입 안전한 버전
  // 개선된 버전: 옵션으로 전달하거나 자동 감지
  const openAutoCloseModal = <T extends Record<string, any>>(
    title: string,
    Component: React.ComponentType<T>,
    props: T,
    config: AutoModalConfig = {}
  ) => {
    const {
      autoCloseCallbacks,
      autoDetect = false,
      size = "md",
      ...restConfig
    } = config;

    let callbacksToWrap: Array<keyof T> = [];

    if (autoCloseCallbacks) {
      // 명시적으로 지정된 콜백들
      callbacksToWrap = autoCloseCallbacks;
    } else if (autoDetect) {
      // on으로 시작하는 콜백들 자동 감지
      callbacksToWrap = Object.keys(props).filter(
        (key) =>
          key.startsWith("on") && typeof props[key as keyof T] === "function"
      ) as Array<keyof T>;
    }

    const modalId = openModal(
      React.createElement(Component, {
        ...props,
        ...Object.fromEntries(
          callbacksToWrap.map((callbackName) => [
            callbackName,
            (...args: any[]) => {
              const originalCallback = props[callbackName];
              if (typeof originalCallback === "function") {
                originalCallback(...args);
              }
              requestCloseModal(modalId);
            },
          ])
        ),
      } as T),
      {
        title,
        size,
        ...restConfig,
      }
    );

    return {
      modalId,
      close: () => requestCloseModal(modalId),
    };
  };

  return {
    openAutoCloseModal, // 명시적 콜백 지정
  };
};
