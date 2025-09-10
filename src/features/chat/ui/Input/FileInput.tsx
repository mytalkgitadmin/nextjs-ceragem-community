import { useFileUploadAcceptList } from '@/features/chat/api';
import Icons from '@/shared/ui/Icons';
import Loading from '@/shared/ui/Loading';

import { FileValidationConfig, ProcessedFile } from './types';
import { DEFAULT_FILE_CONFIG } from './constants';
import {
  validateFileList,
  processValidFiles,
  handleValidationResult,
  showFileUploadError,
  categorizeFiles,
  getUploadStrategy,
} from './utils';
import {
  useImageGroupUpload,
  useFileUpload,
  useFileUploadHandlers,
} from './hooks';
import { FileValidationModal } from './components';
import styles from './FileInput.module.scss';

export default function FileInput() {
  const { data: acceptFileExtensions } = useFileUploadAcceptList('CHAT_FILE');
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

  /**
   * 파일 검증 설정 생성
   * - API에서 받은 허용 파일 타입을 확장자 배열로 변환
   */
  const getValidationConfig = (): FileValidationConfig => ({
    ...DEFAULT_FILE_CONFIG,
    acceptedExtensions: acceptFileExtensions
      ? acceptFileExtensions.split(',').map((ext) => ext.trim())
      : [],
  });

  // 파일 업로드 실행
  const executeFileUpload = async (processedFiles: ProcessedFile[]) => {
    const { successFiles, imageFiles, nonImageFiles } =
      categorizeFiles(processedFiles);

    const strategy = getUploadStrategy(successFiles, imageFiles);

    switch (strategy) {
      case 'SINGLE':
        await handleSingleFile(successFiles[0]);
        break;

      case 'IMAGE_GROUP_AND_INDIVIDUAL':
        // 이미지 그룹 처리
        if (imageFiles.length > 1) {
          await handleImageGroup(imageFiles);
        }

        // 비이미지 파일들 개별 처리
        if (nonImageFiles.length > 0) {
          await handleIndividualFiles(nonImageFiles);
        }
        break;

      case 'INDIVIDUAL_ONLY':
        await handleIndividualFiles(successFiles);
        break;
    }
  };

  // 파일 선택 처리
  const onChangeFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = event.target.files;

    if (!files || files.length === 0) {
      return;
    }

    setIsFileUploading(true);

    try {
      // 1단계: 파일 사전 검증(파일 크기, 타입, 개수)
      const config = getValidationConfig(); // 최대 파일 개수/크기, 허용 파일 타입,
      const validationResult = validateFileList(files, config); // 파일 개수, 파일별 크기,타입 검증

      // 2단계: 검증 결과 처리(Toast, Modal)
      const canProceed = handleValidationResult(
        validationResult,
        setValidationResult,
        setShowValidationModal,
      );

      if (canProceed) {
        // 3단계: 파일 처리(변환, 메타데이터 추출)
        const processResult = await processValidFiles(
          validationResult.validFiles,
        );

        if (processResult.successCount === 0) {
          showFileUploadError('처리할 수 있는 파일이 없습니다.');
          return;
        }

        await executeFileUpload(processResult.processedFiles);
      }
    } catch (error) {
      console.error('파일 처리 중 오류:', error);
      showFileUploadError();
    } finally {
      setIsFileUploading(false);
      event.target.value = '';
    }
  };

  //부분 성공 시 유효한 파일만 진행
  const proceedWithValidFiles = async () => {
    if (!validationResult || validationResult.validFiles.length === 0) {
      return;
    }

    closeValidationModal();
    setIsFileUploading(true);

    try {
      const processResult = await processValidFiles(
        validationResult.validFiles,
      );

      if (processResult.successCount === 0) {
        showFileUploadError('처리할 수 있는 파일이 없습니다.');
        return;
      }

      await executeFileUpload(processResult.processedFiles);
    } catch (error) {
      console.error('파일 처리 중 오류:', error);
      showFileUploadError();
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
          {totalUploading ? '파일 전송 중' : '파일 전송'}
        </span>
      </label>

      {/* 에러 메시지 표시 */}
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
