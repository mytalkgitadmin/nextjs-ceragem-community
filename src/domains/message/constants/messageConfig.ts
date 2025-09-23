import { UIMessageType } from "./messageEnum";

interface MenuConfig {
  copy: boolean;
  share: boolean;
  download: boolean;
  mymemo: boolean;
  delete: boolean;
  edit: boolean;
  reply: boolean;
}

export const MESSAGE_MENU_CONFIG: Partial<Record<UIMessageType, MenuConfig>> = {
  [UIMessageType.BUBBLE]: {
    copy: true, // bubbleType !== 'Emoji_Bubble_None' 인경우 false
    share: true,
    download: false,
    mymemo: true,
    delete: true,
    edit: false,
    reply: true,
  },
  [UIMessageType.EVENT]: {
    copy: false,
    share: true,
    download: false,
    mymemo: true,
    delete: true,
    edit: false,
    reply: true,
  },
  [UIMessageType.CONTACT]: {
    copy: false,
    share: true,
    download: false,
    mymemo: true,
    delete: true,
    edit: false,
    reply: true,
  },
  [UIMessageType.TEXT]: {
    copy: true,
    share: true,
    download: false,
    mymemo: true,
    delete: true,
    edit: true, //!isSender 인경우 false
    reply: true,
  },
  [UIMessageType.FILE]: {
    copy: false,
    share: true,
    download: true,
    mymemo: true,
    delete: true,
    edit: false,
    reply: true,
  },
  [UIMessageType.IMAGE]: {
    copy: false,
    share: true,
    download: true,
    mymemo: true,
    delete: true,
    edit: false,
    reply: true,
  },
  [UIMessageType.VIDEO]: {
    copy: false,
    share: true,
    download: true,
    mymemo: true,
    delete: true,
    edit: false,
    reply: true,
  },
  [UIMessageType.REPLY]: {
    copy: true,
    share: true,
    download: false,
    mymemo: true,
    delete: true,
    edit: true, //!isSender 인경우 false
    reply: false,
  },
};
