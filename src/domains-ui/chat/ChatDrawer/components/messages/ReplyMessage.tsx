import Image from "next/image";
import { ReplyMessageData } from "../../types/messageTypes";
import {
  CopyOutlined,
  FileTextOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import { removeEditPrefix } from "../../utils/messageTextUtils";

interface ReplyMessageProps {
  data: ReplyMessageData;
  isMine: boolean;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_DOMAIN;
export function ReplyMessage({ data, isMine }: ReplyMessageProps) {
  const { content, parentMessage } = data;

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
        {/* 원본 메시지 인용 */}
        <div
          className={`
            p-3 border-l-4
            ${
              isMine
                ? "bg-blue-400 border-blue-200"
                : "bg-gray-100 border-gray-400"
            }
          `}
        >
          <div className="flex items-center mb-1">
            <span className="text-xs font-medium opacity-75">
              {parentMessage.senderName}
            </span>
          </div>

          {parentMessage.messageType.includes("text") ? (
            <div className="text-xs opacity-75 line-clamp-2">
              {removeEditPrefix(parentMessage.content)}
            </div>
          ) : parentMessage.messageType === "file" ? (
            <>
              <FileTextOutlined />
              {parentMessage.resource?.originalFileName}
            </>
          ) : (
            <div className="w-12 h-12 bg-blue-50 rounded-lg overflow-hidden relative">
              {parentMessage.messageType === "video" ? (
                <>
                  <div className="w-full h-full absolute top-0 left-0 bg-black opacity-50"></div>
                  <PlayCircleOutlined className="text-xl z-10 absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]" />
                  <Image
                    src={`${BASE_URL}${parentMessage.resource?.thumbUrl}`}
                    alt=""
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </>
              ) : parentMessage.messageType === "image" ? (
                <Image
                  src={`${BASE_URL}${parentMessage.resource?.thumbUrl}`}
                  alt=""
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                />
              ) : parentMessage.messageType === "images" ? (
                <>
                  <CopyOutlined className="absolute right-1 bottom-1" />
                  <Image
                    src={`${BASE_URL}${parentMessage.resource?.thumbUrl}`}
                    alt=""
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </>
              ) : (
                <></>
              )}
            </div>
          )}
        </div>

        {/* 답장 내용 */}
        <div className="p-3">
          <div className="text-sm whitespace-pre-wrap">
            {removeEditPrefix(content)}
          </div>
        </div>
      </div>
    </div>
  );
}
