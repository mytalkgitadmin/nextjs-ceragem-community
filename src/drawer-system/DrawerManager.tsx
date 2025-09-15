"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useDrawerContext } from "./context";
import { Drawer } from "./components/Drawer";

/**
 * 포털 기반 Drawer 렌더링 매니저
 */
export function DrawerManager() {
  const { drawers, closeDrawer } = useDrawerContext();
  const [mounted, setMounted] = useState(false);

  // 클라이언트에서만 포털 사용
  useEffect(() => {
    setMounted(true);
  }, []);

  // body scroll 방지/복원
  useEffect(() => {
    if (drawers.length > 0) {
      // drawer가 하나라도 열려있으면 body scroll 방지
      document.body.style.overflow = "hidden";
    } else {
      // 모든 drawer가 닫히면 body scroll 복원
      document.body.style.overflow = "unset";
    }

    // cleanup
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [drawers.length]);

  // 서버 사이드에서는 렌더링하지 않음
  if (!mounted) return null;

  // drawer가 없으면 아무것도 렌더링하지 않음
  if (drawers.length === 0) return null;

  return createPortal(
    <>
      {drawers.map((drawerItem, index) => {
        const { id, content, config } = drawerItem;
        const {
          title,
          showBackButton = true,
          headerActions,
          width = "max-w-md",
          disableBackdropClick = false,
          disableEscapeKeyDown = false,
          className = "",
          onClose,
        } = config;

        return (
          <Drawer
            key={id}
            isOpen={true}
            onClose={() => {
              onClose?.();
              closeDrawer(id);
            }}
            title={title}
            showBackButton={showBackButton}
            headerActions={headerActions}
            width={width}
            disableBackdropClick={disableBackdropClick}
            disableEscapeKeyDown={disableEscapeKeyDown}
            className={className}
            zIndex={50 + index} // 나중에 열린 drawer가 더 위에 오도록
          >
            {content}
          </Drawer>
        );
      })}
    </>,
    document.body
  );
}
