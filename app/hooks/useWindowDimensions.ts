import { useState, useEffect } from "react";

// This is from here: https://stackoverflow.com/questions/36862334/get-viewport-window-height-in-reactjs

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] =
    useState<{ width: number; height: number }>();

  useEffect(() => {
    function handleResize() {
      let width = window.innerWidth;
      let height = window.innerHeight;

      setWindowDimensions({ width, height });
    }

    if (!windowDimensions) {
      handleResize();
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions || { width: 0, height: 0 };
}
