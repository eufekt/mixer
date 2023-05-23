import { useEffect, useState } from "react";
import styles from "@/src/styles/Search.module.sass";
import { useUserContext } from "../contexts/UserContext";
import { useArena } from "../hooks/useArena";
import { Loading } from "./Loading";
import { ArenaBlock } from "arena-ts";
import { Title } from "./explorer/Block/ConnectModal/Title";

export default function Search({ setSearch, setIsFocused }) {

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    let change = e.target.value;
    if (change.length > 0) {
      setSearch(e.target.value);
    }
  }
  function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      handleCancel();
    }
  }

  function handleCancel() {
    setIsFocused(false);    
  }

  return (
    <div className={styles.container}>
      <input
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onKeyUp={handleKeyPress}
        type="text"
        placeholder="search"
      ></input>

      <button onClick={handleCancel}>cancelSearch</button>
    </div>
  );
}
