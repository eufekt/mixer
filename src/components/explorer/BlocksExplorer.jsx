import styles from "@/src/styles/BlocksExplorer.module.sass";
import { useRef, useCallback, useEffect } from "react";
import {
  PlaylistContextInterface,
  usePlaylistContext,
} from "../../contexts/PlaylistContext";
import Block from "./Block/Block";

import useIsInViewport from "@/src/hooks/useIsInViewport";
import { Loading } from "../Loading";
import { ArenaBlock, ArenaChannelMod } from "arena-ts";
import { playlistActions } from "@/src/reducers/PlaylistReducer";

export default function BlocksExplorer({
  blocks,
  isLoading,
  hasMore,
  size,
  setSize,
  isEmpty,
}) {
  const elementRef = useRef(null);
  const isInViewport = useIsInViewport(elementRef);
  const { playlistDispatch } = usePlaylistContext()
  const increasePageSize = useCallback(() => {
    setSize(size + 1);
  }, [setSize, size]);

  useEffect(() => {
    if (isInViewport && !isLoading && hasMore) {
      increasePageSize();
    }
  }, [increasePageSize, isInViewport, isLoading, hasMore]);

  const setPLaylistFromSelection = (index) => {
    const rotatedList = [...blocks.slice(index), ...blocks.slice(0, index)];
    const onlyMedia = rotatedList.filter((block) => block.class === "Media");
    playlistDispatch({ type: playlistActions.setList, list: onlyMedia });
  };

  return (
    <div className={styles.container}>
      <div className={styles.blocks_container}>
        {blocks.map((block, i) => (
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
