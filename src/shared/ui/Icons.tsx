import { memo } from 'react';
import { Icon as IconifyIcon } from '@iconify/react';

interface CustomIconProps {
  name: string;
  color?: string;
  size?: number | string;
  className?: string;
}

// 자주 사용하는 아이콘은 미리 정의
const iconMapping: Record<string, string> = {
  menu: 'tabler:menu-2',
  search: 'tabler:search',
  home: 'tabler:home',
  homeFilled: 'tabler:home-filled',
  bell: 'tabler:bell',
  logout: 'tabler:logout',
  message: 'tabler:message-circle',
  alert: 'tabler:alert-triangle',
  info: 'tabler:alert-square-rounded',
  user: 'tabler:user',
  play: 'tabler:player-play-filled',
  mic: 'tabler:microphone',
  reply: 'tabler:share-3',
  chevronRight: 'tabler:chevron-right',
  chevronLeft: 'tabler:chevron-left',
  phone: 'tabler:phone',
  dday: 'tabler:cake',
  calendar: 'tabler:calendar-event',
  picture: 'tabler:photo',
  emoticon: 'tabler:mood-happy',
  arrowUp: 'tabler:arrow-up',

  clip: 'tabler:paperclip',

  fileText: 'tabler:file-text',
  fileTxt: 'tabler:file-type-txt',
  fileDocx: 'tabler:file-type-docx',
  fileDoc: 'tabler:file-type-doc',
  fileCsv: 'tabler:file-type-csv',
  fileZip: 'tabler:file-type-zip',
  filePdf: 'tabler:file-type-pdf',
  fileXls: 'tabler:file-type-xls',
  filePpt: 'tabler:file-type-ppt',
} as const;

export type IconType = keyof typeof iconMapping;

// 커스텀 아이콘 속성 인터페이스
interface CustomIconProps {
  name: IconType;
  color?: string;
  size?: number | string;
}
const Icons = ({
  name,
  color,
  size = 24,
  className,
  ...props
}: CustomIconProps) => {
  const iconName = iconMapping[name] || `tabler:${name}`;

  return (
    <IconifyIcon
      icon={iconName}
      color={color}
      width={size}
      height={size}
      className={className}
      {...props}
    />
  );
};

export default memo(Icons);
