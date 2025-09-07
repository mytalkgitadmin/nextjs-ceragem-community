import { useState, useEffect } from "react";

export function useMediaQuery(breakpoint: number = 500): boolean {
  const [isMatch, setIsMatch] = useState(false);

  useEffect(() => {
    const checkMediaQuery = () => {
      setIsMatch(window.innerWidth <= breakpoint);
    };

    checkMediaQuery();
    window.addEventListener("resize", checkMediaQuery);
    return () => {
      window.removeEventListener("resize", checkMediaQuery);
    };
  }, [breakpoint]);

  return isMatch;
}
