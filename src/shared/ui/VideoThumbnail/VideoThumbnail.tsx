import { BASE_URL } from '@/shared/api/endpoints';
import Icons from '../Icons';
import styles from './VideoThumbnail.module.scss';

export default function VideoThumbnail({
  url,
  onClick,
  type = 'talk',
}: {
  url: string;
  onClick: () => void;
  type: 'talk' | 'gallery';
}) {
  const ratio = parseFloat(
    parseFloat(url?.split('sizeRate=')[1] || '1').toFixed(2),
  );

  return (
    <div className={`${styles.video} ${styles[type]}`}>
      <div className={styles.play}>
        <button type="button" onClick={onClick}>
          <Icons name="play" />
          <span className="a11y-hidden">재생</span>
        </button>
      </div>

      {url && (
        <img
          src={url.startsWith('http') ? url : `${BASE_URL}${url}`}
          alt=""
          width={type === 'talk' ? 300 : 'auto'}
          height={type === 'talk' ? 300 * ratio : 'auto'}
        />
      )}
    </div>
  );
}
