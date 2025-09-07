import { Icons } from "@/shared/ui/icon";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/shared/ui/overlays";
import { Button } from "@/shared/ui/button";
import { formatBytes } from "@/entities/message/lib";

import { FileValidationResult } from "../types";
import FilePreview from "./FilePreview";

import styles from "./FileValidationModal.module.scss";

interface FileValidationModalProps {
  isOpen: boolean;
  validationResult: FileValidationResult;
  onCancel: () => void;
  onProceed: () => void;
  onRemoveFile: (fileIndex: number, isValid: boolean) => void; // 추가
}

export default function FileValidationModal({
  isOpen,
  validationResult,
  onCancel,
  onProceed,
  onRemoveFile,
}: FileValidationModalProps) {
  const { validFiles, invalidFiles, convertibleFiles } = validationResult;
  const hasValidFiles = validFiles.length > 0;

  const handleRemoveValidFile = (index: number) => {
    onRemoveFile(index, true);
  };
  const handleRemoveInvalidFile = (index: number) => {
    onRemoveFile(index, false);
  };
  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onCancel()}>
      <AlertDialogContent>
        {/* header */}
        <AlertDialogHeader className={styles.header}>
          <AlertDialogTitle>파일전송</AlertDialogTitle>
          <AlertDialogDescription className={styles.desc}>
            {invalidFiles.length > 0 ? (
              <p>
                <Icons name="alert" />
                {validFiles.length + invalidFiles.length}개 중{" "}
                <strong>{invalidFiles.length}개</strong>의 파일에 문제가
                있습니다.
              </p>
            ) : (
              "해당 파일들을 전송하시겠습니까?"
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* body */}
        <div className={styles.fileList}>
          {invalidFiles.length > 0 && (
            <>
              <h3>
                전송 불가 <strong>{invalidFiles.length}</strong>
              </h3>

              <ul>
                {/* 무효한 파일들 */}
                {invalidFiles.map((error, index) => (
                  <li key={index} className={styles.invalid}>
                    <FilePreview file={error.file} />
                    <div>
                      <p className={styles.title}>
                        {error.file.name}{" "}
                        <span className={styles.size}>
                          {formatBytes(error.file.size)}
                        </span>
                      </p>
                      <p className={styles.error}>
                        <Icons name="alert" /> {error.message}
                      </p>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className={styles.right}
                      onClick={() => handleRemoveInvalidFile(index)}
                    >
                      <Icons name="trash" />
                      삭제
                    </Button>
                  </li>
                ))}
              </ul>
            </>
          )}
          {validFiles.length > 0 && (
            <>
              <h3>
                전송 가능 <strong>{validFiles.length}</strong>
              </h3>
              <ul>
                {/* 유효한 파일들 */}
                {validFiles.map((file, index) => {
                  const convertInfo = convertibleFiles.find(
                    (cf) => cf.file === file
                  );

                  return (
                    <li key={index}>
                      <FilePreview file={file} />

                      <div>
                        <p className={styles.title}>{file.name}</p>
                        <p className={styles.size}>{formatBytes(file.size)}</p>

                        {convertInfo && (
                          <p className={styles.info}>
                            <Icons name="info" />
                            {convertInfo.reason}
                          </p>
                        )}
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        className={styles.right}
                        onClick={() => handleRemoveValidFile(index)}
                      >
                        <Icons name="trash" />
                        삭제
                      </Button>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>

        {/* footer */}
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>취소</AlertDialogCancel>

          {hasValidFiles && (
            <AlertDialogAction onClick={onProceed}>
              {validFiles.length}개 전송
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
