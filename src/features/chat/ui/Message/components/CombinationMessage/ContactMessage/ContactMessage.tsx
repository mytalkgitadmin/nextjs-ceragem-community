import Icons from '@/shared/ui/Icons';

import styles from '../CombinationMessage.module.scss';

import { useState } from 'react';
import { copyToClipboard, formatPhoneNumber } from '@/features/chat/lib';
import { ContactData } from '@/features/chat/model';

export default function ContactMessage({ contact }: { contact: ContactData }) {
  const [showCopySuccess, setShowCopySuccess] = useState(false);
  const [showCopyError, setShowCopyError] = useState('');

  const handleCopy = async (text: string) => {
    const success = await copyToClipboard(text);

    if (success) {
      setShowCopySuccess(true);
      setTimeout(() => setShowCopySuccess(false), 1000);
    } else {
      setShowCopyError('복사에 실패했습니다. 수동 복사를 진행해주세요');
    }
  };

  return (
    <div className={`${styles.scheduleWrap}`}>
      <div className={styles.top}>
        <p className={styles.titleWrap}>
          <span className={styles.title}>{contact.name}</span>
        </p>
      </div>
      <span className={styles.number}>{formatPhoneNumber(contact.phone)}</span>
      <div className={styles.phoneWrap}>
        <a href={`tel:${contact.phone}`} className={styles.btn}>
          <Icons name="phone" />
          <span className="a11y-hidden">전화걸기</span>
        </a>

        <button
          type="button"
          className={`${styles.btn} ${showCopySuccess ? styles.success : ''}`}
          onClick={() => handleCopy(contact.phone)}
        >
          {showCopySuccess ? <Icons name="check" /> : <Icons name="copy" />}
          <span className="a11y-hidden">복사</span>
        </button>
      </div>
      {/* [TODO] 알림 처리 필요 */}
      <p className="a11y-hidden">{showCopyError}</p>
    </div>
  );
}
