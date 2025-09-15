"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { DrawerContextState, DrawerItem, DrawerConfig } from "./types";

/**
 * Drawer Context
 */
const DrawerContext = createContext<DrawerContextState | null>(null);

/**
 * 고유 ID 생성 함수
 */
const generateId = () => {
  return `drawer-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Drawer Provider Props
 */
interface DrawerProviderProps {
  children: ReactNode;
}

/**
 * Drawer Provider 컴포넌트
 */
export function DrawerProvider({ children }: DrawerProviderProps) {
  const [drawers, setDrawers] = useState<DrawerItem[]>([]);

  /**
   * Drawer 열기
   */
  const openDrawer = (content: ReactNode, config: DrawerConfig = {}) => {
    const id = generateId();

    const drawerItem: DrawerItem = {
      id,
      content,
      config: {
        ...config,
        onClose: () => {
          config.onClose?.();
          closeDrawer(id);
        },
      },
    };

    setDrawers((prevDrawers) => [...prevDrawers, drawerItem]);
    return id;
  };

  /**
   * Drawer 닫기
   */
  const closeDrawer = (id?: string) => {
    if (!id) {
      // ID가 없으면 가장 최근(마지막) drawer 닫기
      setDrawers((prevDrawers) => prevDrawers.slice(0, -1));
    } else {
      // 특정 ID의 drawer 닫기
      setDrawers((prevDrawers) =>
        prevDrawers.filter((drawer) => drawer.id !== id)
      );
    }
  };

  /**
   * 모든 Drawer 닫기
   */
  const closeAllDrawers = () => {
    setDrawers([]);
  };

  /**
   * 현재 drawer가 열려있는지 확인
   */
  const hasOpenDrawer = drawers.length > 0;

  const value: DrawerContextState = {
    drawers,
    openDrawer,
    closeDrawer,
    closeAllDrawers,
    hasOpenDrawer,
  };

  return (
    <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>
  );
}

/**
 * DrawerContext 사용 훅
 */
export function useDrawerContext(): DrawerContextState {
  const context = useContext(DrawerContext);

  if (!context) {
    throw new Error("useDrawerContext must be used within a DrawerProvider");
  }

  return context;
}
