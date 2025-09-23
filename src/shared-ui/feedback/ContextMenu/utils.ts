import type { Position, Placement } from "./types";

/**
 * 메뉴가 화면 밖으로 나가지 않도록 위치를 조정합니다
 */
export const getAdjustedPosition = (
  position: Position,
  menuElement: HTMLElement | null
): Position => {
  if (!menuElement) return position;

  const { innerWidth, innerHeight } = window;
  const { offsetWidth, offsetHeight } = menuElement;

  let { x, y } = position;

  // 오른쪽 경계 체크
  if (x + offsetWidth > innerWidth) {
    x = innerWidth - offsetWidth - 10;
  }

  // 아래쪽 경계 체크
  if (y + offsetHeight > innerHeight) {
    y = innerHeight - offsetHeight - 10;
  }

  // 최소값 보장
  x = Math.max(10, x);
  y = Math.max(10, y);

  return { x, y };
};

/**
 * 외부 클릭 감지 및 윈도우 이벤트 리스너들을 설정합니다
 */
export const setupOutsideClickListeners = (
  menuRef: React.RefObject<HTMLElement>,
  onClose: () => void
) => {
  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  const handleEscape = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  const handleResize = () => {
    onClose();
  };

  const handleScroll = () => {
    onClose();
  };

  // 이벤트 리스너 등록
  document.addEventListener("mousedown", handleClickOutside);
  document.addEventListener("keydown", handleEscape);
  window.addEventListener("resize", handleResize);
  window.addEventListener("scroll", handleScroll, true); // capture phase로 모든 스크롤 이벤트 감지

  // 클린업 함수 반환
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
    document.removeEventListener("keydown", handleEscape);
    window.removeEventListener("resize", handleResize);
    window.removeEventListener("scroll", handleScroll, true);
  };
};

/**
 * 트리거 요소를 기준으로 placement에 따른 위치를 계산합니다
 */
export const calculatePlacementPosition = (
  triggerElement: HTMLElement,
  placement: Placement = "bottom-start",
  offset: number = 8
): Position => {
  const triggerRect = triggerElement.getBoundingClientRect();

  const positions: Record<Placement, Position> = {
    // Top placements
    top: {
      x: triggerRect.left + triggerRect.width / 2,
      y: triggerRect.top - offset,
    },
    "top-start": {
      x: triggerRect.left,
      y: triggerRect.top - offset,
    },
    "top-end": {
      x: triggerRect.right,
      y: triggerRect.top - offset,
    },

    // Bottom placements
    bottom: {
      x: triggerRect.left + triggerRect.width / 2,
      y: triggerRect.bottom + offset,
    },
    "bottom-start": {
      x: triggerRect.left,
      y: triggerRect.bottom + offset,
    },
    "bottom-end": {
      x: triggerRect.right,
      y: triggerRect.bottom + offset,
    },

    // Left placements
    left: {
      x: triggerRect.left - offset,
      y: triggerRect.top + triggerRect.height / 2,
    },
    "left-start": {
      x: triggerRect.left - offset,
      y: triggerRect.top,
    },
    "left-end": {
      x: triggerRect.left - offset,
      y: triggerRect.bottom,
    },

    // Right placements
    right: {
      x: triggerRect.right + offset,
      y: triggerRect.top + triggerRect.height / 2,
    },
    "right-start": {
      x: triggerRect.right + offset,
      y: triggerRect.top,
    },
    "right-end": {
      x: triggerRect.right + offset,
      y: triggerRect.bottom,
    },
  };

  return positions[placement];
};

/**
 * 메뉴 위치를 조정하여 화면 밖으로 나가지 않게 합니다
 */
export const adjustMenuPosition = (
  position: Position,
  menuElement: HTMLElement | null,
  placement: Placement
): Position => {
  if (!menuElement) return position;

  const { innerWidth, innerHeight } = window;
  const { offsetWidth, offsetHeight } = menuElement;
  let { x, y } = position;

  // placement에 따른 기준점 조정
  if (placement.includes("end")) {
    x = x - offsetWidth;
  } else if (placement.includes("top") || placement.includes("bottom")) {
    if (!placement.includes("start") && !placement.includes("end")) {
      x = x - offsetWidth / 2; // center alignment
    }
  }

  if (placement.includes("top")) {
    y = y - offsetHeight;
  } else if (placement.includes("left") || placement.includes("right")) {
    if (placement.includes("end")) {
      y = y - offsetHeight;
    } else if (!placement.includes("start")) {
      y = y - offsetHeight / 2; // center alignment
    }
  }

  // 화면 경계 체크
  if (x + offsetWidth > innerWidth) {
    x = innerWidth - offsetWidth - 10;
  }
  if (y + offsetHeight > innerHeight) {
    y = innerHeight - offsetHeight - 10;
  }
  if (x < 10) x = 10;
  if (y < 10) y = 10;

  return { x, y };
};
