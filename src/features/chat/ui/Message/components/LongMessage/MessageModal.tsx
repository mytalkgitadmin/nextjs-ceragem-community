import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';

import styles from './MessageModal.module.scss';

import Icons from '@/shared/ui/Icons';
import { Button } from '@/shared/ui/button';
import { copyToClipboard } from '@/features/chat/lib';
import { useState } from 'react';
import { toast } from 'sonner';

export default function MessageModal({
  message,
  isOpen,
  onCancel,
}: {
  message: string;
  isOpen: boolean;
  onCancel: () => void;
}) {
  const [showCopySuccess, setShowCopySuccess] = useState(false);

  const handleCopy = async (text: string) => {
    const success = await copyToClipboard(text);

    if (success) {
      setShowCopySuccess(true);
      setTimeout(() => setShowCopySuccess(false), 1000);
    } else {
      toast.error('복사에 실패했습니다. 수동 복사를 진행해주세요');
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent className={styles.dialogContent}>
        {/* header */}
        <DialogHeader className={styles.header}>
          <DialogTitle>
            <strong>전체보기</strong>({message.length}자)
          </DialogTitle>
          <DialogDescription className={styles.desc}></DialogDescription>
        </DialogHeader>

        {/* body */}

        <div className={styles.inner}>{message}</div>

        {/* footer */}
        <DialogFooter className={styles.dialogFooter}>
          <DialogClose asChild>
            <Button variant="outline" size="lg">
              닫기
            </Button>
          </DialogClose>
          <Button
            onClick={() => handleCopy(message)}
            className={`${styles.btn} ${showCopySuccess ? styles.success : ''}`}
          >
            {showCopySuccess ? <Icons name="check" /> : <Icons name="copy" />}
            전체 복사
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
