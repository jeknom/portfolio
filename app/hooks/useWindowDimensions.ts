import { useState, useEffect } from "react";

// This is from here: https://stackoverflow.com/questions/36862334/get-viewport-window-height-in-reactjs

function getWindowDimensions() {
  let width = 0;
  let height = 0;

  try {
    width = window.innerWidth;
    height = window.innerHeight;
  } catch (error) {
    console.warn("Window not set!");
  }

  return { width, height };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    try {
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    } catch (error) {
      console.warn("Window not set!");
    }
  }, []);

  return windowDimensions;
}
