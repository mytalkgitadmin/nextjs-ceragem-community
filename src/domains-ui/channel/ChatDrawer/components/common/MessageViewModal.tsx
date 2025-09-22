import { Modal } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import { removeEditPrefix } from "../../utils/messageTextUtils";

interface MessageViewModalProps {
  open: boolean;
  onClose: () => void;
  content: string;
  senderName?: string;
}

export function MessageViewModal({
  open,
  onClose,
  content,
  senderName,
}: MessageViewModalProps) {
  const displayContent = removeEditPrefix(content);

  const handleCopy = async () => {
    try {
      // 최신 브라우저에서 클립보드 API 사용
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(displayContent);
      } else {
        // 폴백: 기존 방식 사용
        const textArea = document.createElement("textarea");
        textArea.value = displayContent;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      // TODO: 복사 완료 토스트 메시지 추가
      console.log("복사 완료");
    } catch (error) {
      console.error("복사 실패:", error);
    }
  };

  return (
    <Modal
      title={
        <div className="flex items-center justify-between">
          <span>
            {senderName
              ? senderName === "나"
                ? `나의 메시지`
                : `${senderName}(님)의 메시지`
              : "메시지 전체보기"}
          </span>
        </div>
      }
      open={open}
      onCancel={onClose}
      footer={null}
      width={600}
      className="message-view-modal"
      centered
    >
      <div className="max-h-96 overflow-y-auto">
        <div className="whitespace-pre-wrap break-words text-sm leading-relaxed">
          {displayContent}
        </div>
      </div>

      <div className="mt-2 pt-3  flex items-center justify-between">
        <div className="text-xs text-gray-500">
          총 {displayContent.length.toLocaleString()}자
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-2 py-1 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded transition-colors"
        >
          <CopyOutlined />
          복사
        </button>
      </div>
    </Modal>
  );
}
