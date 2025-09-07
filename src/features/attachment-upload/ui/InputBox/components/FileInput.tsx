import React from "react";
import { useFileUploadAcceptList } from "@/features/attachment-upload/model/useFileUploadAcceptList";
import { Icons } from "@/shared/ui/icon";
import { Loading } from "@/shared/ui/media";

import { FileValidationConfig, ProcessedFile } from "../types";
import { DEFAULT_FILE_CONFIG } from "@/shared/config/file-upload";
import {
  validateFileList,
  processValidFiles,
  handleValidationResult,
  categorizeFiles,
  getUploadStrategy,
} from "../utils";
import { showError } from "@/shared/ui/overlays/toast";
import {
  useImageGroupUpload,
  useFileUpload,
  useFileUploadHandlers,
} from "../hooks";
import { FileValidationModal } from "../components";
import styles from "../index.module.scss";

export default function FileInput() {
  const { data: acceptFileExtensions } = useFileUploadAcceptList("CHAT_FILE");
  const { isGroupUploading } = useImageGroupUpload();

  const {
    isFileUploading,
    setIsFileUploading,
    validationResult,
    setValidationResult,
    showValidationModal,
    setShowValidationModal,
    closeValidationModal,
    handleRemoveFile,
  } = useFileUpload();

  const { handleSingleFile, handleImageGroup, handleIndividualFiles } =
    useFileUploadHandlers();

  const getValidationConfig = (): FileValidationConfig => ({
    ...DEFAULT_FILE_CONFIG,
    acceptedExtensions: acceptFileExtensions
      ? acceptFileExtensions.split(",").map((ext: string) => ext.trim())
      : [],
  });

  const executeFileUpload = async (processedFiles: ProcessedFile[]) => {
    const { successFiles, imageFiles, nonImageFiles } =
      categorizeFiles(processedFiles);

    const strategy = getUploadStrategy(successFiles, imageFiles);

    switch (strategy) {
      case "SINGLE":
        await handleSingleFile(successFiles[0]);
        break;
      case "IMAGE_GROUP_AND_INDIVIDUAL":
        if (imageFiles.length > 1) {
          await handleImageGroup(imageFiles);
        }
        if (nonImageFiles.length > 0) {
          await handleIndividualFiles(nonImageFiles);
        }
        break;
      case "INDIVIDUAL_ONLY":
        await handleIndividualFiles(successFiles);
        break;
    }
  };

  const onChangeFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = event.target.files;
    if (!files || files.length === 0) {
      return;
    }

    setIsFileUploading(true);
    try {
      const config = getValidationConfig();
      const validationResult = validateFileList(files, config);
      const canProceed = handleValidationResult(
        validationResult,
        setValidationResult,
        setShowValidationModal
      );

      if (canProceed) {
        const processResult = await processValidFiles(
          validationResult.validFiles
        );
        if (processResult.successCount === 0) {
          showError("처리할 수 있는 파일이 없습니다.");
          return;
        }
        await executeFileUpload(processResult.processedFiles);
      }
    } catch (error) {
      console.error("파일 처리 중 오류:", error);
      showError("파일 처리 중 오류가 발생했습니다.");
    } finally {
      setIsFileUploading(false);
      event.target.value = "";
    }
  };

  const proceedWithValidFiles = async () => {
    if (!validationResult || validationResult.validFiles.length === 0) {
      return;
    }
    closeValidationModal();
    setIsFileUploading(true);
    try {
      const processResult = await processValidFiles(
        validationResult.validFiles
      );
      if (processResult.successCount === 0) {
        showError("처리할 수 있는 파일이 없습니다.");
        return;
      }
      await executeFileUpload(processResult.processedFiles);
    } catch (error) {
      console.error("파일 처리 중 오류:", error);
      showError("파일 처리 중 오류가 발생했습니다.");
    } finally {
      setIsFileUploading(false);
    }
  };

  const totalUploading = isFileUploading || isGroupUploading;

  return (
    <div className={styles.fileInput}>
      <input
        id="icon-button-file"
        type="file"
        multiple={true}
        accept={acceptFileExtensions}
        onChange={onChangeFile}
        disabled={totalUploading}
      />
      <label htmlFor="icon-button-file" className={styles.button}>
        {totalUploading ? <Loading /> : <Icons name="clip" />}
        <span className="a11y-hidden">
          {totalUploading ? "파일 전송 중" : "파일 전송"}
        </span>
      </label>
      {validationResult && (
        <FileValidationModal
          isOpen={showValidationModal}
          validationResult={validationResult}
          onCancel={closeValidationModal}
          onProceed={proceedWithValidFiles}
          onRemoveFile={handleRemoveFile}
        />
      )}
    </div>
  );
}
