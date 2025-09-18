interface FileNameDisplayProps {
  fileName: string;
  className?: string;
}

export function FileNameDisplay({ fileName, className = "" }: FileNameDisplayProps) {
  if (!fileName) return <span className={className}>파일</span>;

  const lastDotIndex = fileName.lastIndexOf(".");

  // 확장자가 없거나 파일명이 .로 시작하는 경우
  if (lastDotIndex <= 0) {
    return <span className={`truncate ${className}`}>{fileName}</span>;
  }

  const name = fileName.substring(0, lastDotIndex);
  const extension = fileName.substring(lastDotIndex);

  return (
    <span className={className}>
      <span className="truncate">{name}</span>
      <span className="flex-shrink-0">{extension}</span>
    </span>
  );
}