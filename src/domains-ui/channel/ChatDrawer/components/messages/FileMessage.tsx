import { DownloadOutlined, FileTextOutlined } from "@ant-design/icons";
import { FileMessageData } from "../../types/messageTypes";
import { FileNameDisplay } from "../common/FileNameDisplay";

interface FileMessageProps {
  data: FileMessageData;
  isMine: boolean;
}

export function FileMessage({ data, isMine }: FileMessageProps) {
  const {
    messageType,
    fileUrl,
    fileName,
    fileSize,
    thumbnailUrl,
    duration,
    resources,
  } = data;

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_DOMAIN;

  // 파일 크기를 읽기 쉬운 형태로 변환
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // 시간을 MM:SS 형태로 변환
  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // 공통 이미지 스타일
  const getCommonImageStyle = (isVideo = false) => ({
    minWidth: isVideo ? "200px" : "80px",
    minHeight: isVideo ? "200px" : "80px",
    maxWidth: "min(300px, 60vw)",
    maxHeight: "min(300px, 60vw)",
  });

  // 이미지 그룹 렌더링 (Tailwind CSS 사용)
  const renderImageGroup = (
    images: Array<{
      originalUrl: string;
      thumbUrl?: string;
      originalFileName: string;
    }>
  ) => {
    const displayImages = images.slice(0, 6);
    const hasMoreImages = images.length > 6;
    const imageCount = hasMoreImages ? 6 : images.length;

    // 이미지 개수에 따른 그리드 클래스 결정
    const getGridClasses = (count: number) => {
      const base =
        "grid gap-1 min-w-[80px] min-h-[80px] max-w-[min(300px,60vw)]";
      const configs = {
        1: "grid-cols-1",
        2: "grid-cols-2 aspect-[2/1] min-h-[150px]",
        3: "grid-cols-2 grid-rows-2 aspect-square min-h-[200px]",
        4: "grid-cols-2 grid-rows-2 aspect-square min-h-[200px]",
        5: "grid-cols-6 grid-rows-[1fr_1fr] aspect-[4/3] min-h-[200px]",
      };
      return `${base} ${configs[count as keyof typeof configs] || "grid-cols-3 grid-rows-2 aspect-[3/2] min-h-[200px]"}`;
    };

    // 개별 이미지 스타일 결정
    const getImageClasses = (index: number, count: number) => {
      const base = "w-full h-full object-cover rounded cursor-pointer";

      if (count === 1) return `${base} aspect-auto max-h-[min(300px,60vw)]`;
      if (count === 3 && index === 0) return `${base} col-span-2 aspect-square`;
      if (count === 5) {
        const span5Configs = [
          "col-span-3",
          "col-span-3",
          "col-span-2",
          "col-span-2",
          "col-span-2",
        ];
        return `${base} ${span5Configs[index] || ""} aspect-square`;
      }
      if (count === 6 && index === 5) {
        return `${base} row-start-2 col-start-3 col-span-1 aspect-square`;
      }
      return `${base} aspect-square`;
    };

    // 이미지 인라인 스타일 생성
    const getImageStyle = (count: number) => ({
      minWidth: "80px",
      minHeight: "80px",
      maxWidth: count === 1 ? "min(300px, 60vw)" : "100%",
      maxHeight: count === 1 ? "min(300px, 60vw)" : "100%",
    });

    return (
      <div className={getGridClasses(imageCount)}>
        {displayImages.map((image, index) => {
          const isLastImage = index === displayImages.length - 1;
          const shouldShowOverlay = hasMoreImages && isLastImage;

          return (
            <div key={index} className="relative">
              <img
                src={`${BASE_URL}${image.thumbUrl || image.originalUrl}`}
                alt={image.originalFileName}
                className={getImageClasses(index, imageCount)}
                loading="lazy"
                style={getImageStyle(imageCount)}
              />
              {shouldShowOverlay && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded text-white text-lg font-bold">
                  +{images.length - 6}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={`max-w-xs md:max-w-md ${isMine ? "ml-auto" : "mr-auto"}`}>
      <div
        className={`
          rounded-lg overflow-hidden
          ${
            isMine
              ? "bg-blue-500 text-white rounded-br-sm"
              : "bg-gray-200 text-gray-800 rounded-bl-sm"
          }
        `}
      >
        {/* 이미지 메시지 */}
        {messageType === "image" && (
          <div>
            {resources && resources.length > 1 ? (
              // 여러 이미지가 있는 경우 그룹으로 렌더링
              renderImageGroup(resources.filter((r) => r.fileType === "image"))
            ) : (
              // 단일 이미지인 경우 기존 방식
              <img
                src={`${BASE_URL}${thumbnailUrl || fileUrl}`}
                alt={fileName}
                className="w-full h-auto max-h-64 object-cover"
                loading="lazy"
                style={getCommonImageStyle()}
              />
            )}
          </div>
        )}

        {/* 비디오 메시지 */}
        {messageType === "video" && (
          <div>
            <div className="relative">
              <video
                src={`${BASE_URL}${fileUrl}`}
                poster={`${BASE_URL}${thumbnailUrl}`}
                controls
                className="w-full h-auto max-h-64"
                preload="metadata"
                style={getCommonImageStyle(true)}
              />
              {duration && (
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                  {formatDuration(duration)}
                </div>
              )}
            </div>
          </div>
        )}

        {/* 일반 파일 메시지 */}
        {messageType === "file" && (
          <div className="p-3">
            <div className="flex items-center space-x-3">
              <FileTextOutlined style={{ fontSize: "32px" }} />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{fileName}</div>
                <div className="text-xs opacity-75 mt-1">
                  {formatFileSize(fileSize)}
                </div>
              </div>
              <a
                href={fileUrl}
                download={fileName}
                className="flex-shrink-0 p-2 rounded-full hover:bg-black hover:bg-opacity-10 transition-colors"
              >
                <DownloadOutlined />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
