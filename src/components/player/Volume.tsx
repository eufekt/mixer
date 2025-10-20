"use client";

import { ChangeEvent } from "react";
import styles from "@/src/styles/Volume.module.sass";
export default function Volume({
  volume,
  setVolume,
}: {
  volume: number;
  setVolume: any;
}) {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setVolume(parseFloat(e.target.value));
  }

  return (
    <div className={styles.seekContainer}>
      <input
        className={styles.seek}
        type="range"
        min="0"
        max="100"
        value={volume}
        onChange={handleChange}
      />
      <p className={styles.number}>{volume}</p>
    </div>
  );
}
