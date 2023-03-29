/* eslint-disable @next/next/no-img-element */
import styles from "@/src/styles/Block.module.sass";
export default function Block({
  block,
  loadPlaylistFrom,
  i,
}) {
  return (
    <div className={styles.imageWrap}>
      <img
        alt={"image"}
        onClick={() => loadPlaylistFrom(i)}
        style={{
          width: "100%",
        }}
        src={block.image.square.url}
      ></img>
    </div>
  );
}
