"use client";

import { useState, useEffect } from "react";

export function useMediaQuery(breakpoint: number = 500): boolean {
  const [isMatch, setIsMatch] = useState(false);

  useEffect(() => {
    const checkMediaQuery = () => {
      setIsMatch(window.innerWidth <= breakpoint);
    };

    // 초기 실행
    checkMediaQuery();

    // resize 이벤트 리스너 추가
    window.addEventListener("resize", checkMediaQuery);

    // cleanup
    return () => {
      window.removeEventListener("resize", checkMediaQuery);
    };
  }, [breakpoint]);

  return isMatch;
}
