import { MESSAGE_LIMITS } from '@/features/chat/constants';
import styles from './LongMessage.module.scss';
import Icons from '@/shared/ui/Icons';
import { useState } from 'react';
import MessageModal from './MessageModal';

export default function LongMessage({ message }: { message: string }) {
  const sliceMessage = `${message.substring(0, MESSAGE_LIMITS.LONG_MESSAGE)}...`;

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <>
      <p className={styles.msg}>{sliceMessage}</p>

      {/* [TODO 모달: 전체 메시지] */}
      <button className={styles.more} onClick={toggleModal}>
        전체보기
        <Icons name="chevronRight" />
      </button>

      <MessageModal
        message={message}
        isOpen={isOpen}
        onCancel={() => setIsOpen(false)}
      />
    </>
  );
}
