"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useModalContext } from "./context";
import { Modal } from "./components/Modal";

/**
 * 포털 기반 Modal 렌더링 매니저
 */
export function ModalManager() {
  const { modals, closeModal } = useModalContext();
  const [mounted, setMounted] = useState(false);

  // 클라이언트에서만 포털 사용
  useEffect(() => {
    setMounted(true);
  }, []);

  // body scroll 방지/복원
  useEffect(() => {
    if (modals.length > 0) {
      // modal이 하나라도 열려있으면 body scroll 방지
      document.body.style.overflow = "hidden";
    } else {
      // 모든 modal이 닫히면 body scroll 복원
      document.body.style.overflow = "unset";
    }

    // cleanup
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [modals.length]);

  // 서버 사이드에서는 렌더링하지 않음
  if (!mounted) return null;

  // modal이 없으면 아무것도 렌더링하지 않음
  if (modals.length === 0) return null;

  return createPortal(
    <>
      {modals.map((modalItem, index) => {
        const { id, content, config } = modalItem;
        const {
          title,
          size = "md",
          showHeader = true,
          showCloseButton = true,
          headerActions,
          footer,
          disableBackdropClick = false,
          disableEscapeKeyDown = false,
          className = "",
          requestClose = false,
          onClose,
        } = config;

        return (
          <Modal
            key={id}
            isOpen={true}
            onClose={() => {
              onClose?.();
              closeModal(id);
            }}
            title={title}
            size={size}
            showHeader={showHeader}
            showCloseButton={showCloseButton}
            headerActions={headerActions}
            footer={footer}
            disableBackdropClick={disableBackdropClick}
            disableEscapeKeyDown={disableEscapeKeyDown}
            className={className}
            zIndex={50 + index} // 나중에 열린 modal이 더 위에 오도록
            requestClose={requestClose}
          >
            {content}
          </Modal>
        );
      })}
    </>,
    document.body
  );
}
