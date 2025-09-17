import { useEffect, useRef } from "react";

export const useScroll = (hasNext: boolean, handleScrollEnd: () => void) => {
  const scrollRef = useRef<any>(null);

  const handleScroll = () => {
    const scrollContainer: any = scrollRef?.current;
    const scrollHeight = scrollContainer.scrollHeight;
    const clientHeight = scrollContainer.clientHeight;
    const scrollTop = scrollContainer.scrollTop;

    if (scrollHeight - (scrollTop + clientHeight) < scrollHeight * 0.2) {
      handleScrollEnd();
    }
  };

  useEffect(() => {
    if (!hasNext) {
      return;
    }
    const scrollContainer: any = scrollRef?.current;
    scrollContainer?.addEventListener("scroll", handleScroll);

    return () => {
      scrollContainer?.removeEventListener("scroll", handleScroll);
    };
  }, [hasNext, handleScroll]);

  return {
    scrollRef,
  };
};
