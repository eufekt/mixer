import Duration from "./Duration";
import styles from "@/src/styles/Seek.module.sass";
import { Preview } from "./Preview";

export default function Seek({
  played,
  duration,
  block,
  handleSeekMouseUp,
  handleSeekMouseDown,
  handleSeekChange,
}) {
  const title = block?.title;
  const previewImage = block?.image?.square.url;
  const url = block?.source.url;
  return (
    <div className={styles.container}>
      <Preview image={previewImage} />
      {block && (
        <div className={styles.seekContainer}>
          <div className={styles.title}>{title}</div>
          <input
            type={"range"}
            className={styles.seek}
            style={{ width: "100%" }}
            min={0}
            max={0.999999}
            step="any"
            value={played}
            onMouseDown={handleSeekMouseDown}
            onChange={handleSeekChange}
            onMouseUp={handleSeekMouseUp}
          />
          <div className={styles.durations}>
            <Duration seconds={duration * played} />
            <Duration seconds={duration * (1 - played)} />
          </div>
        </div>
      )}
    </div>
  );
}
