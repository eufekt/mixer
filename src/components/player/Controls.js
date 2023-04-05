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
      <div
        onClick={() => handlePrev(currentTrack)}
        className={styles.playerButton}
      >
        <NextButton />
      </div>
      <div onClick={handlePlayPause} className={styles.playerButton}>
        {playing ? <PauseButton /> : <PlayButton />}
      </div>
      <div
        onClick={() => handleNext(currentTrack)}
        className={styles.playerButton}
      >
        <NextButton reverse />
      </div>
    </div>
  );
}

function PlayButton() {
  return (
    <svg
      style={{ color: "red" }}
      width="18"
      height="20"
      viewBox="0 0 18 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.422 9.12536C18.1089 9.50612 18.1089 10.4939 17.422 10.8746L1.73478 19.5694C1.06826 19.9388 0.25 19.4568 0.25 18.6947V1.30528C0.25 0.543235 1.06826 0.0612213 1.73477 0.430641L17.422 9.12536Z"
        fill="#636363"
      />
    </svg>
  );
}

function PauseButton() {
  return (
    <svg
      width="14"
      height="20"
      viewBox="0 0 14 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="5" height="20" rx="1" fill="#636363" />
      <rect x="9" width="5" height="20" rx="1" fill="#636363" />
    </svg>
  );
}

function NextButton({ reverse }) {
  return (
    <svg
      style={{ transform: reverse ? "rotateY(180deg)" : "none" }}
      width="23"
      height="14"
      viewBox="0 0 23 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.38264 7.77969C0.748477 7.38915 0.748478 6.46726 1.38264 6.07672L9.72562 0.938773C10.3919 0.528463 11.25 1.00779 11.25 1.79026V12.0661C11.25 12.8486 10.3919 13.3279 9.72562 12.9176L1.38264 7.77969Z"
        fill="#636363"
      />
      <path
        d="M12.6326 7.77969C11.9985 7.38915 11.9985 6.46726 12.6326 6.07672L20.9756 0.938773C21.6419 0.528463 22.5 1.00779 22.5 1.79026V12.0661C22.5 12.8486 21.6419 13.3279 20.9756 12.9176L12.6326 7.77969Z"
        fill="#636363"
      />
    </svg>
  );
}
