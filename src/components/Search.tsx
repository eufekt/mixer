"use client";

import styles from "@/src/styles/Search.module.sass";
import { useEffect, useRef } from "react";

export default function Search({ setSearch, setIsFocused, isFocused }: any) {
  const keyboardRef = useRef<HTMLInputElement>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    let change = e.target.value;
    if (change.length > 0) {
      setSearch(e.target.value);
      setIsFocused(true);
    }
  }
  function handleKeyPress(e: KeyboardEvent) {
    if (e.key === "Escape") {
      handleUnFocus();
    }
    if (e.metaKey && e.key === "k") {
      e.preventDefault();
      handleFocus();
    }
  }
  function handleUnFocus() {
    if (keyboardRef.current) {
      keyboardRef.current.blur();
      setIsFocused(false);
    }
  }
  function handleFocus() {
    if (keyboardRef.current) {
      keyboardRef.current.focus();
      setIsFocused(true);
    }
  }

  useEffect(() => {
    addEventListener("keydown", handleKeyPress);
    return () => {
      removeEventListener("keydown", handleKeyPress);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div title="browse all channels on are.na" className={styles.container}>
      <input
        className={styles.inputEl}
        ref={keyboardRef}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        type="text"
        placeholder="browse channels cmd+k"
      ></input>

      <button
        className={styles.escButton}
        style={{
          color: isFocused ? "var(--color_purple)" : "inherit",
        }}
        onClick={handleUnFocus}
      >
        esc
      </button>
    </div>
  );
}
