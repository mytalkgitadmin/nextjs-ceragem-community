import Image from "next/image";
import { ReplyMessageData } from "../../types/messageTypes";
import {
  CommentOutlined,
  CopyOutlined,
  FileTextOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import { removeEditPrefix } from "../../utils/messageTextUtils";
import { MessageText } from "../common/MessageText";
import { FileNameDisplay } from "../common/FileNameDisplay";

interface ReplyMessageProps {
  data: ReplyMessageData;
  isMine: boolean;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_DOMAIN;
export function ReplyMessage({ data, isMine }: ReplyMessageProps) {
  const { content, parentMessage, isLongText = false } = data;

  return (
    <div
      className={`max-w-[calc(100vw-120px)] md:max-w-md ${isMine ? "ml-auto" : "mr-auto"}`}
    >
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
            p-3
            flex gap-2 items-center
            w-full
            ${
              isMine
                ? "bg-blue-400 border-blue-200"
                : "bg-gray-100 border-gray-400"
            }
          `}
        >
          {parentMessage.messageType === "file" ? (
            <div className="w-10 h-10 flex items-center justify-center bg-white bg-opacity-30 rounded-md shrink-0">
              <FileTextOutlined />
            </div>
          ) : parentMessage.messageType === "video" ? (
            <div className="w-10 h-10 bg-blue-50 rounded-lg overflow-hidden relative">
              <div className="w-full h-full absolute top-0 left-0 bg-black opacity-50"></div>
              <PlayCircleOutlined className="text-xl z-10 absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]" />
              <Image
                src={`${BASE_URL}${parentMessage.resource?.thumbUrl}`}
                alt=""
                width={100}
                height={100}
                className="w-full h-full object-cover"
              />
            </div>
          ) : parentMessage.messageType === "image" ? (
            <div className="w-10 h-10 bg-blue-50 rounded-lg overflow-hidden relative">
              <Image
                src={`${BASE_URL}${parentMessage.resource?.thumbUrl}`}
                alt=""
                width={100}
                height={100}
                className="w-full h-full object-cover"
              />
            </div>
          ) : parentMessage.messageType === "images" ? (
            <div className="w-10 h-10 bg-blue-50 rounded-lg overflow-hidden relative">
              <CopyOutlined
                className="absolute right-1 bottom-1 text-white"
                style={{
                  filter: "drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.8))",
                }}
              />
              <Image
                src={`${BASE_URL}${parentMessage.resource?.thumbUrl}`}
                alt=""
                width={100}
                height={100}
                className="w-full h-full object-cover"
              />
            </div>
          ) : null}

          <div className="min-w-0 flex-1">
            <div className="flex items-center mb-1">
              <span className="text-xs font-medium ">
                <CommentOutlined />{" "}
                {isMine ? "나" : `${parentMessage.senderName}(님)`}에게 답장
              </span>
            </div>

            {parentMessage.messageType.includes("text") ? (
              <div className="text-xs opacity-75 line-clamp-2">
                {removeEditPrefix(parentMessage.content)}
              </div>
            ) : parentMessage.messageType === "file" ? (
              <FileNameDisplay
                fileName={parentMessage.resource?.originalFileName || "파일"}
                className="text-xs min-w-0"
              />
            ) : parentMessage.messageType === "video" ? (
              <p className="text-xs opacity-80">동영상</p>
            ) : parentMessage.messageType === "image" ? (
              <p className="text-xs opacity-80">사진</p>
            ) : parentMessage.messageType === "images" ? (
              <p className="text-xs opacity-80">
                사진 {parentMessage.fileCount}장
              </p>
            ) : null}
          </div>
        </div>

        {/* 답장 내용 */}
        <div className="p-3">
          <MessageText content={content} isLongText={isLongText} />
        </div>
      </div>
    </div>
  );
}
