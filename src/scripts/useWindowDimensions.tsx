import { useState, useEffect } from "react";

interface WindowDimensions {
  windowWidth: number;
}

function useWindowDimensions(): WindowDimensions {
  const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>({
    windowWidth: typeof window !== "undefined" ? window.innerWidth : 0,
  });

  const handleResize = () => {
    setWindowDimensions({
      windowWidth: window.innerWidth,
    });
  };

  useEffect(() => {
    const updateWindowDimensions = () => {
      setWindowDimensions({
        windowWidth: window.innerWidth,
      });
    };

    if (typeof window !== "undefined") {
      window.addEventListener("resize", updateWindowDimensions);

      return () => {
        window.removeEventListener("resize", updateWindowDimensions);
      };
    }
  }, []);

  return windowDimensions;
}

export default useWindowDimensions;
