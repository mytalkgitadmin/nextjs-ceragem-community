import { useGroupChannelContext } from '@sendbird/uikit-react/GroupChannel/context';
import { useEffect } from 'react';

export function ScrollController() {
  const { isScrollBottomReached } = useGroupChannelContext();

  useEffect(() => {
    // CSS 클래스로 버튼 제어
    const channelElement = document.querySelector(
      '.sendbird-conversation__scroll-bottom-button',
    );
    if (channelElement) {
      if (isScrollBottomReached) {
        channelElement.classList.add('hide-scroll-button');
        channelElement.classList.remove('show-scroll-button');
      } else {
        channelElement.classList.remove('hide-scroll-button');
        channelElement.classList.add('show-scroll-button');
      }
    }
  }, [isScrollBottomReached]);

  return null; // 아무것도 렌더링하지 않음
}
