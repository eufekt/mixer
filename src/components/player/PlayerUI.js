import styles from "@/src/styles/PlayerUI.module.sass";
import { Controls } from "./Controls";
import Seek from "./Seek";
import Status from "./Status";
import { useEffect } from "react";

export function PlayerUI({
  handlePrev,
  handleNext,
  handlePlayPause,
  playing,
  status,
  played,
  duration,
  handleSeekMouseUp,
  handleSeekChange,
  currentBlock,
  url,
}) {

  return (
    <div className={styles.player}>
      <div className={styles.controls}>
        <Status status={status} />
        <Controls
          handlePrev={handlePrev}
          handlePlayPause={handlePlayPause}
          handleNext={handleNext}
          playing={playing}
        />
      </div>
      <Seek
        block={currentBlock}
        played={played}
        duration={duration}
        handleSeekMouseUp={handleSeekMouseUp}
        handleSeekChange={handleSeekChange}
      />
      {url && (
        <a className={styles.a} href={url} target={"_blank"} rel="noreferrer">
          🔗
        </a>
      )}
    </div>
  );
}
