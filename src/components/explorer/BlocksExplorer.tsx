import styles from "@/src/styles/BlocksExplorer.module.sass";
import { useRef, useCallback, useEffect } from "react";
import {
  PlaylistContextInterface,
  usePlaylistContext,
} from "../../contexts/PlaylistContext";
import Block from "./Block/Block";

import useIsInViewport from "@/src/hooks/useIsInViewport";
import { Loading } from "../Loading";
import { ArenaBlock, CustomArenaChannel } from "arena-ts";

export default function BlocksExplorer({
  blocks,
  isLoading,
  hasMore,
  size,
  setSize,
  isEmpty,
}: {
  blocks: (ArenaBlock | CustomArenaChannel)[];
  isLoading: boolean;
  hasMore: boolean;
  size: number;
  setSize: any;
  isEmpty: boolean;
}) {
  const elementRef = useRef(null);
  const isInViewport = useIsInViewport(elementRef);
  const { playlistDispatch } = usePlaylistContext() as PlaylistContextInterface;

  const increasePageSize = useCallback(() => {
    setSize(size + 1);
  }, [setSize, size]);

  useEffect(() => {
    if (isInViewport && !isLoading && hasMore) {
      increasePageSize();
    }
  }, [increasePageSize, isInViewport, isLoading, hasMore]);

  const setPLaylistFromSelection = (index: number) => {
    const rotatedList = [...blocks.slice(index), ...blocks.slice(0, index)];
    let onlyMedia = rotatedList.filter((block) => block.class === "Media");
    playlistDispatch({ type: "setPlaylist", list: onlyMedia });
  };

  return (
    <div className={styles.container}>
      <div className={styles.blocks_container}>
        {blocks.map((block: any, i: number) => (
          <Block
            key={block.id}
            i={i}
            block={block}
            loadPlaylistFrom={setPLaylistFromSelection}
          />
        ))}
      </div>
      <Loading isLoading={isLoading} hideText />
      {isEmpty && <div className={styles.empty}>this channel is empty</div>}
      <div ref={elementRef}></div>
    </div>
  );
}
