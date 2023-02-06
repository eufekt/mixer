/* eslint-disable @next/next/no-img-element */
import styles from "@/src/styles/Block.module.sass";
export default function Block({ block, selectTrack, i, currentTrack }) {
  return (
    <div className={styles.imageWrap}>
      <img
        alt={"image"}
        onClick={() => selectTrack(i)}
        style={{
          width: "100%",
          border: i == currentTrack ? "10px solid orange" : "none",
        }}
        src={block.image.square.url}
      ></img>
    </div>
  );
}
