import Duration from "./Duration";
import styles from "@/src/styles/Seek.module.sass";
import { Preview } from "./Preview";

export default function Seek({
  played,
  duration,
  block,
  handleSeekChange,
  handleSeekMouseUp,
}) {
  const title = block?.title;
  const previewImage = block?.image?.square.url;
  return (
    <div className={styles.container}>
      {block && (
        <>
          <Preview image={previewImage} />
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
              onChange={handleSeekChange}
              onMouseUp={handleSeekMouseUp}
            />
            <div className={styles.durations}>
              <Duration seconds={duration * played} />
              <Duration seconds={duration * (1 - played)} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
