import {
  isHeic,
  isSvg,
  convertToJpeg,
  calculateImageRatio,
  calculateVideoRatio,
} from "@/shared/utils";
import { MessageCustomType, MessageDataType } from "../constants";
import sendBirdSelectors from "@sendbird/uikit-react/sendbirdSelectors";
import { uploadFile } from "../api";
import { UploadFileResponseData } from "../api";

const MAX_FILE_SIZE = 200 * 1024 * 1024; // 200MB

const checkFileSize = (files: FileList): boolean => {
  if (!files || files.length === 0) {
    return true;
  }
  return files[0].size <= MAX_FILE_SIZE;
};

/**
 * 파일 메시지 전송
 * @param files 파일 리스트
 * @param callbacks 콜백 함수
 */

export const sendFileMessage = async (
  channelUrl: string,
  files: FileList,
  options: {
    imageGrouping: boolean;
  },
  callbacks: {
    onOverSize: () => void;
    onError: () => void;
    onUploaded: (
      resultData: UploadFileResponseData[],
      fileRatio: Record<string, number>
    ) => void;
  }
) => {
  if (!files || files.length === 0) return;

  if (!checkFileSize(files)) {
    callbacks.onOverSize();
    return;
  }

  try {
    const fileArray = Array.from(files);
    const fileRatio: Record<string, number> = {};
    const groupIndexMap = new Map<string, number>();
    let imageCount = 0;

    //
    const groupingFiles = await Promise.all(
      fileArray.map(async (file, i) => {
        if (isHeic(file) || isSvg(file)) {
          file = (await convertToJpeg(file)) as File;
        }
        if (file.type.startsWith("image/")) {
          fileRatio[file.name] = await calculateImageRatio(file);
        } else if (file.type.startsWith("video/")) {
          fileRatio[file.name] = await calculateVideoRatio(file);
        }

        let groupId = `${file.type}_${i}`;
        if (file.type.startsWith("image/") && options.imageGrouping) {
          groupId = `image${Math.floor(imageCount++ / 30)}`;
        }
        const groupIdx = (groupIndexMap.get(groupId) ?? -1) + 1;
        groupIndexMap.set(groupId, groupIdx);

        return {
          file,
          groupId,
          sort: file.type.startsWith("image/") ? 0 : 1,
          groupIdx,
        };
      })
    );

    const sortedFiles = groupingFiles.sort(
      (a, b) => a.sort - b.sort || a.groupId.localeCompare(b.groupId)
    );

    const results = await Promise.all(
      sortedFiles.map(async ({ file, groupId, groupIdx }, i) => {
        return await uploadFile({
          subCategory: "CHAT_FILE",
          autoEnable: false,
          contentId: channelUrl,
          file: file,
          openMetadata: JSON.stringify({ groupId, groupIdx }),
        });

        // if (groupIdx === 0) { //CHECK 사용안함
        //   callbacks.onSended([file]);
        // }
      })
    );

    const resultData = results.map((result) => result.resultData);

    callbacks.onUploaded(resultData, fileRatio);
  } catch (error) {
    callbacks.onError();
  }
  return;
};

/**
 * Sendbird 파일 메시지 전송을 위한 파라미터 리스트 생성
 * @param input 파일 메시지 파라미터 리스트
 * @param options 옵션
 * @returns 파일 메시지 파라미터 리스트
 */

export const getSendirdFileMessageParamsList = (
  input: UploadFileResponseData[],
  options: {
    fileRatio: Record<string, number>;
    expiredSecond?: number;
  }
) => {
  const groupedInput = Object.groupBy(
    input,
    (item) => item.info.metadata.groupId
  );

  const paramsList = [];
  for (const groupId in groupedInput) {
    const group = groupedInput[groupId];
    if (!group) continue;

    const params = {
      customType: MessageCustomType.BEFAMILY,
      data: "",
      fileUrl: "",
    };

    const resource = [];
    for (const item of group) {
      if (item.info.metadata.groupIdx === "0") {
        params.fileUrl = item.info.directUrl;
      }
      const fileName = item.info.fileName;
      let thumbUrl = item.thumbnailInfo1.directUrl;
      if (thumbUrl && options.fileRatio[fileName]) {
        thumbUrl = thumbUrl + `&sizeRate=${options.fileRatio[fileName]}`;
      }
      resource.push({
        fileType: item.info.fileKind.toLowerCase(),
        thumbUrl,
        originalFileName: fileName,
        originalUrl: item.info.directUrl,
        originalFileSize: item.info.fileSize,
        shared: true,
      });
    }

    const data = {
      resource,
      type: MessageDataType.MESSAGE_FILE,
      ...(options.expiredSecond && { expiredSecond: options.expiredSecond }),
    };
    params.data = JSON.stringify(data);

    paramsList.push(params);
  }

  return paramsList;
};
