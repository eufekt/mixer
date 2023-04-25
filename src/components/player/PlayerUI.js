import styles from "@/src/styles/PlayerUI.module.sass";
import seekstyles from "@/src/styles/Seek.module.sass";
import { Controls } from "./Controls";
import Seek from "./Seek";
import Status from "./Status";
import { useEffect } from "react";

export function PlayerUI({
  handlePrev,
  handleNext,
  handlePlayPause,
  handleVolumeChange,
  volume,
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
        {currentBlock && (
          <Controls
            block={currentBlock}
            handlePrev={handlePrev}
            handlePlayPause={handlePlayPause}
            handleNext={handleNext}
            playing={playing}
          />
        )}
      </div>
      {currentBlock && (
        <>
          <Seek
            block={currentBlock}
            played={played}
            duration={duration}
            handleVolumeChange={handleVolumeChange}
            volume={volume}
            handleSeekMouseUp={handleSeekMouseUp}
            handleSeekChange={handleSeekChange}
          />
          <input
            type={"range"}
            className={seekstyles.seek}
            style={{ width: "15%", marginTop: "3px" }}
            min={0}
            max={0.999999}
            step="any"
            value={volume}
            onChange={handleVolumeChange}
          />
        </>
      )}
      {url && (
        <a className={styles.a} href={url} target={"_blank"} rel="noreferrer">
          🔗
        </a>
      )}
    </div>
  );
}
