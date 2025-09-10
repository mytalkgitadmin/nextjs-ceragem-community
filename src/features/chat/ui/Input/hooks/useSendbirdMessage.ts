import { useGroupChannelContext } from "@sendbird/uikit-react/GroupChannel/context";

import { MessageCustomType, MessageInDataType } from "@/features/chat/model";
import { FileInfo, MessageData, UploadResult } from "../types";

const createMessageData = (
  uploadResult: UploadResult,
  fileRatio?: number,
  type: string = MessageInDataType.MESSAGE_FILE
) => {
  const fileInfo = uploadResult.resultData.info;
  const thumbnailInfo = uploadResult.resultData.thumbnailInfo1;

  const thumbUrl = thumbnailInfo?.directUrl
    ? fileRatio
      ? `${thumbnailInfo.directUrl}?sizeRate=${fileRatio}`
      : thumbnailInfo.directUrl
    : "";

  return {
    resource: [
      {
        fileType: fileInfo.fileKind.toLowerCase() || "file", // 'image', 'video' 등
        thumbUrl: thumbUrl || uploadResult.resultData.info.directUrl,
        originalUrl: fileInfo.directUrl,
        originalFileName: fileInfo.fileName,
        originalFileSize: fileInfo.fileSize || 0,
        shared: true,
      },
    ],
    type,
  };
};

const createFileMessageParams = (
  fileInfo: FileInfo,
  fileName: string,
  messageData: MessageData
) => ({
  fileUrl: fileInfo.directUrl, // 업로드된 파일 URL
  fileName,
  fileSize: fileInfo.fileSize || 0,
  mimeType: fileInfo.mimeType || "application/octet-stream",
  customType: MessageCustomType.BEFAMILY,
  data: JSON.stringify(messageData),
});

export default function useSendbirdMessage() {
  const { currentChannel } = useGroupChannelContext();

  /**
   * 업로드된 파일을 Sendbird 파일 메시지로 전송
   */
  const sendFileMessage = async (
    uploadResult: UploadResult,
    fileRatio?: number
  ) => {
    if (!currentChannel) {
      throw new Error("채널을 찾을 수 없습니다.");
    }

    try {
      console.log("Sendbird 파일 메시지 전송 시작:", uploadResult);

      if (!uploadResult?.resultData?.info) {
        throw new Error("업로드 결과가 유효하지 않습니다.");
      }

      const fileInfo = uploadResult.resultData.info;

      // 필수 필드 검증
      if (!fileInfo.directUrl || !fileInfo.fileName) {
        console.error("파일 정보가 불완전합니다:", fileInfo);
        throw new Error("파일 정보가 불완전합니다.");
      }

      const messageData = createMessageData(uploadResult, fileRatio);
      const params = createFileMessageParams(
        fileInfo,
        fileInfo.fileName,
        messageData
      );

      return new Promise((resolve, reject) => {
        currentChannel
          .sendFileMessage(params)
          .onSucceeded((message) => {
            console.log("✅ Sendbird 메시지 전송 완료:", message);
            resolve(message);
          })
          .onFailed((error) => {
            console.error("❌ Sendbird 메시지 전송 실패:", error);
            reject(error);
          });
      });
    } catch (error) {
      console.error("❌ Sendbird 메시지 전송 실패:", error);
      throw error;
    }
  };

  /**
   * 그룹 파일 메시지 전송(다중 이미지)
   */
  const sendGroupFileMessage = async (
    groupResult: {
      groupId: string;
      uploadResults: UploadResult[];
    },
    fileRatios?: { [fileName: string]: number }
  ) => {
    if (!currentChannel) {
      throw new Error("채널을 찾을 수 없습니다.");
    }

    try {
      console.log("Sendbird 파일 메시지 전송 시작:", groupResult);

      const { groupId, uploadResults } = groupResult;

      // 첫 번째 파일 - 메인파일
      const firstFile = uploadResults[0].resultData.info;

      const resourceArray = uploadResults.map((result) => {
        const fileInfo = result.resultData.info;
        const thumbnailInfo = result.resultData.thumbnailInfo1;
        const fileName = fileInfo.fileName;
        const ratio = fileRatios?.[fileName];

        const thumbUrl = thumbnailInfo?.directUrl
          ? ratio
            ? `${thumbnailInfo.directUrl}?sizeRate=${ratio}`
            : thumbnailInfo.directUrl
          : "";

        return {
          fileType: fileInfo.fileKind.toLowerCase() || "file",
          thumbUrl: thumbUrl || result.resultData.info.directUrl,
          originalUrl: fileInfo.directUrl,
          originalFileName: fileInfo.fileName,
          originalFileSize: fileInfo.fileSize || 0,
          shared: true,
        };
      });

      const messageData = {
        resource: resourceArray,
        type: MessageInDataType.MESSAGE_FILE,
      };

      const params = createFileMessageParams(
        firstFile,
        `${groupId}_${uploadResults.length}개_이미지`,
        messageData
      );

      console.log("그룹 메시지 파라미터:", params);
      console.log("그룹 메시지 resource 개수:", resourceArray.length);

      return new Promise((resolve, reject) => {
        currentChannel
          .sendFileMessage(params)
          .onSucceeded((message) => {
            console.log(
              `✅ 그룹 메시지 전송 완료 (${resourceArray.length}개 파일):`,
              message
            );
            resolve(message);
          })
          .onFailed((error) => {
            console.error("❌ 그룹 메시지 전송 실패:", error);
            reject(error);
          });
      });
    } catch (error) {
      console.error("❌ Sendbird 메시지 전송 실패:", error);
      throw error;
    }
  };

  return {
    sendFileMessage,
    sendGroupFileMessage,
  };
}
