import styles from "@/src/styles/BlocksExplorer.module.sass";
import Block from "./Block";

export function BlocksExplorer({ playlist, selectTrack, currentTrack }) {
  return (
    <div className={styles.container}>
      {playlist.map((block, i) => (
        <Block
          key={block.id}
          i={i}
          block={block}
          selectTrack={selectTrack}
          currentTrack={currentTrack}
        />
      ))}
    </div>
  );
}
