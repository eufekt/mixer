import styles from "@/src/styles/BlocksExplorer.module.sass";
import { useState } from "react";
import { usePlaylistContext } from "../ contexts/PlaylistContext";
import {
  useGetChannel,
  useGetChannelContents,
  useGetChannelContentsPaginated,
} from "../lib/api";
import Block from "./Block";

export function BlocksExplorer() {
  const [stack, setStack] = useState(["saoul"]);
  const { playlistDispatch } = usePlaylistContext();

  /**
   * @param {number} index
   * rotates current list of blocks to start from index
   */
  function rotateArrayFrom(index) {
    const allElements = contents.data.flatMap((blocks) => blocks.contents);
    const rotatedList = [...allElements.slice(index), ...allElements.slice(0, index)];
    playlistDispatch({ type: "setPlaylist", list: rotatedList });
  }

  const lastItem = stack.slice(-1).pop();

  const channel = useGetChannel(lastItem);
  const contents = useGetChannelContentsPaginated(lastItem);

  let ChannelSection = <div>loading channel</div>;
  let ContentsSection = <div>loading content</div>;

  if (!channel.isLoading) {
    ChannelSection = <div>{channel.data.title}</div>;
  }

  if (!contents.isLoading) {
    let allElements = contents.data.flatMap((blocks) => blocks.contents);

    ContentsSection = (
      <div className={styles.container}>
        <div>total blocks {allElements.length}</div>
        {allElements.map((block,i) => (
          <Block
            key={block.id}
            i={i}
            block={block}
            loadPlaylistFrom={rotateArrayFrom}
          />
        ))}
      </div>
    );
  }

  return (
    <div style={{ color: "white" }}>
      {ChannelSection}
      {ContentsSection}
      <button onClick={() => contents.setSize(contents.size + 1)}>more</button>
    </div>
  );
}
