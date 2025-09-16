import { FileMessageData } from "../../types/messageTypes";
import { getMessageTypeIcon } from "../../utils/messageTypeUtils";

interface FileMessageProps {
  data: FileMessageData;
  isMine: boolean;
}

export function FileMessage({ data, isMine }: FileMessageProps) {
  const { messageType, fileUrl, fileName, fileSize, mimeType, thumbnailUrl, duration } = data;

  // 파일 크기를 읽기 쉬운 형태로 변환
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // 시간을 MM:SS 형태로 변환
  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`max-w-xs md:max-w-md ${isMine ? 'ml-auto' : 'mr-auto'}`}>
      <div
        className={`
          rounded-lg overflow-hidden
          ${isMine
            ? 'bg-blue-500 text-white rounded-br-sm'
            : 'bg-gray-200 text-gray-800 rounded-bl-sm'
          }
        `}
      >
        {/* 이미지 메시지 */}
        {messageType === 'image' && (
          <div>
            <img
              src={thumbnailUrl || fileUrl}
              alt={fileName}
              className="w-full h-auto max-h-64 object-cover"
              loading="lazy"
            />
            <div className="px-3 py-2">
              <div className="text-xs opacity-75 flex items-center">
                🖼️ {fileName}
              </div>
              <div className="text-xs opacity-60 mt-1">
                {formatFileSize(fileSize)}
              </div>
            </div>
          </div>
        )}

        {/* 비디오 메시지 */}
        {messageType === 'video' && (
          <div>
            <div className="relative">
              <video
                src={fileUrl}
                poster={thumbnailUrl}
                controls
                className="w-full h-auto max-h-64"
                preload="metadata"
              />
              {duration && (
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                  {formatDuration(duration)}
                </div>
              )}
            </div>
            <div className="px-3 py-2">
              <div className="text-xs opacity-75 flex items-center">
                🎥 {fileName}
              </div>
              <div className="text-xs opacity-60 mt-1">
                {formatFileSize(fileSize)}
                {duration && ` • ${formatDuration(duration)}`}
              </div>
            </div>
          </div>
        )}

        {/* 일반 파일 메시지 */}
        {messageType === 'file' && (
          <div className="p-3">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">
                {getMessageTypeIcon(messageType)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">
                  {fileName}
                </div>
                <div className="text-xs opacity-75 mt-1">
                  {formatFileSize(fileSize)}
                </div>
                <div className="text-xs opacity-60">
                  {mimeType}
                </div>
              </div>
              <a
                href={fileUrl}
                download={fileName}
                className="flex-shrink-0 p-2 rounded-full hover:bg-black hover:bg-opacity-10 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}