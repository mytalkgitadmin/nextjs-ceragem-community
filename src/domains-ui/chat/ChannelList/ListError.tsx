export function ChannelListError() {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-gray-500">
      <svg
        className="w-16 h-16 mb-4 text-gray-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <p className="text-sm">채팅방을 불러올 수 없습니다.</p>
      <p className="text-xs text-gray-400">다시 시도해 주세요.</p>
    </div>
  );
}
