import { useState, useEffect } from "react";

export default function useHasWindow() {
  const [hasWindow, setHasWindow] = useState(false);
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, []);

  return hasWindow;
}
