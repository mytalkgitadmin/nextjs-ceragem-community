// 활성 탭 인디케이터 컴포넌트
interface TabIndicatorProps {
  position: { left: number; width: number };
}

export function TabIndicator({ position }: TabIndicatorProps) {
  return (
    <div
      className="absolute bottom-0 h-0.5 bg-blue-600 transition-all duration-300 ease-in-out rounded-full"
      style={{
        left: position.left,
        width: position.width,
      }}
    />
  );
}
