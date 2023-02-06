import styles from "@/src/styles/Controls.module.sass";
export function Controls({
  handlePrev,
  handlePlayPause,
  handleNext,
  currentTrack,
  playing,
}) {
  return (
    <div className={styles.buttons}>
      <button
        onClick={() => handlePrev(currentTrack)}
        className={styles.playerButton}
      >
        {"prev"}
      </button>
      <button onClick={handlePlayPause} className={styles.playerButton}>
        {playing ? "pause" : "play"}
      </button>
      <button
        onClick={() => handleNext(currentTrack)}
        className={styles.playerButton}
      >
        {"next"}
      </button>
    </div>
  );
}
