import Auth from "./Auth";
import styles from "@/src/styles/Search.module.sass";
import { useEffect, useRef } from "react";
import { useUserContext } from "../contexts/UserContext";
import { signIn } from "next-auth/react";

export default function Search({ setSearch, setIsFocused, isFocused }: any) {
  const keyboardRef = useRef<HTMLInputElement>(null);
  const user = useUserContext();

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

      {!user && isFocused && (
        <div className={styles.tip}>
          <button className={styles.button} onClick={() => signIn("arena")}>
            sign in
          </button>{" "}
          with are.na for results related to your profile
        </div>
      )}
    </div>
  );
}
