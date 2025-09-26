import React, { ReactNode } from "react";
import { DrawerConfig, useDrawer } from "@/drawer-system";

interface AutoDrawerConfig extends DrawerConfig {
  autoCloseCallbacks?: string[]; // 자동으로 닫을 콜백 이름들
  autoDetect?: boolean; // on으로 시작하는 콜백 자동 감지
}

export const useAutoDrawer = () => {
  const { openDrawer, requestCloseDrawer } = useDrawer();

  // 방법 2-개선: 더 타입 안전한 버전
  // 개선된 버전: 옵션으로 전달하거나 자동 감지
  const openAutoCloseDrawer = <T extends Record<string, any>>(
    Component: React.ComponentType<T>,
    props: T,
    config: AutoDrawerConfig = {}
  ) => {
    const { autoCloseCallbacks, autoDetect = false, ...restConfig } = config;

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

    const modalId = openDrawer(
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
              requestCloseDrawer(modalId);
            },
          ])
        ),
      } as T),
      {
        ...restConfig,
      }
    );

    return {
      modalId,
      close: () => requestCloseDrawer(modalId),
    };
  };

  return {
    openAutoCloseDrawer, // 명시적 콜백 지정
  };
};
