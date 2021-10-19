import React, { useEffect } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 * https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
 */

function useOutsideAlerter(
  ref: React.MutableRefObject<any>,
  callback: () => void
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref]);
}

export default useOutsideAlerter;
