import { memo, useState } from 'react';
import Icons from '@/shared/ui/Icons';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import { Button } from '@/shared/ui/button';
import { getEmoticonImageUrl } from '@/features/viewer/utils/mediaUtils';

import styles from './FamilyFriendsModal.module.scss';

interface FamilyFriendsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  id: number;
  onEmoticonSelect: (emoticonId: number) => void;
}

const FamilyFriendsModal = memo<FamilyFriendsModalProps>(
  ({ open, onOpenChange, id, onEmoticonSelect }) => {
    const [selectedEmoticonId, setSelectedEmoticonId] = useState<number | null>(
      id,
    );

    const EMOTICON_COUNT = 15;

    const handleEmoticonClick = (emoticonId: number) => {
      setSelectedEmoticonId(emoticonId);
    };

    const handleSelectEmoticon = () => {
      console.log('selectedEmoticonId', selectedEmoticonId);
      if (selectedEmoticonId === null) return;

      onEmoticonSelect(selectedEmoticonId);

      onOpenChange(false);
    };

    const handleModalOpenChange = (isOpen: boolean) => {
      if (isOpen) {
        setSelectedEmoticonId(id);
      }
      onOpenChange(isOpen);
    };

    return (
      <Dialog open={open} onOpenChange={handleModalOpenChange}>
        <DialogContent className={styles.content}>
          {/* header */}
          <DialogHeader>
            <DialogTitle>패밀리 프렌즈</DialogTitle>
            <DialogDescription>
              원하는 프렌즈를 선택해 주세요!
            </DialogDescription>
          </DialogHeader>

          {/* body */}
          <div className={styles.friends}>
            {Array.from({ length: EMOTICON_COUNT }, (_, index) => {
              const emoticonId = index + 1;
              const isSelected = selectedEmoticonId === emoticonId;

              return (
                <EmoticonButton
                  key={emoticonId}
                  emoticonId={emoticonId}
                  isSelected={isSelected}
                  onClick={() => handleEmoticonClick(emoticonId)}
                />
              );
            })}
          </div>
          {/* footer */}
          <DialogFooter className={styles.dialogFooter}>
            <DialogClose asChild>
              <Button variant="outline" size="lg">
                닫기
              </Button>
            </DialogClose>
            <Button
              onClick={handleSelectEmoticon}
              disabled={selectedEmoticonId === null}
            >
              선택
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
);

interface EmoticonButtonProps {
  emoticonId: number;
  isSelected: boolean;
  onClick: () => void;
}
const EmoticonButton = ({
  emoticonId,
  isSelected,
  onClick,
}: EmoticonButtonProps) => {
  return (
    <button
      type="button"
      className={isSelected ? styles.selected : ''}
      onClick={onClick}
    >
      <img
        src={getEmoticonImageUrl(emoticonId)}
        alt={`패밀리 프렌즈 ${emoticonId}`}
      />
      {isSelected && <Icons name="circle-check" className={styles.check} />}
    </button>
  );
};

FamilyFriendsModal.displayName = 'FamilyFriendsModal';

export default FamilyFriendsModal;
