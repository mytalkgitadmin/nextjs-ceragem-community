export function ChannelListLoading() {
  return (
    <div className="flex flex-col items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
      <p className="text-sm text-gray-500">채팅방을 불러오는 중...</p>
    </div>
  );
}
