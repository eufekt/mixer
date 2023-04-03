import styles from "@/src/styles/BlocksExplorer.module.sass";
import { useState, useRef, useCallback, useEffect } from "react";
import { usePlaylistContext } from "../../ contexts/PlaylistContext";
import { useGetChannel, useGetChannelContentsPaginated } from "../../lib/api";
import Block from "./Block";

import useIsInViewport from "./useIsInViewport";

export function BlocksExplorer() {
  const { playlistDispatch } = usePlaylistContext();

  const seed = "seed-nwf3b3nhr-a";
  const channel = useGetChannel(seed);
  const channelLength = channel.data?.length;

  /**
   * TODO: handle error
   */
  const { data, error, isLoading, size, setSize } =
    useGetChannelContentsPaginated(seed);

  const loadedBlocks = data ? data.flatMap((blocks) => blocks.contents) : [];
  const hasMore = loadedBlocks.length < channelLength;
  const isEmpty = data?.[0]?.contents.length === 0;

  const elementRef = useRef();
  const isInViewport = useIsInViewport(elementRef);

  const increasePageSize = useCallback(() => {
    if (hasMore) {
      setSize(size + 1);
    }
  }, [hasMore, setSize, size]);

  useEffect(() => {
    if (isInViewport && !isLoading) {
      increasePageSize();
    }
  }, [increasePageSize, isInViewport, isLoading]);

  function rotateArrayFrom(index) {
    const allElements = data.flatMap((blocks) => blocks.contents);
    const rotatedList = [
      ...allElements.slice(index),
      ...allElements.slice(0, index),
    ];
    playlistDispatch({ type: "setPlaylist", list: rotatedList });
  }

  return (
    <div className={styles.container}>
      <div className={styles.blocks_container}>
        {loadedBlocks.map((block, i) => (
          <Block
            key={block.id}
            i={i}
            block={block}
            loadPlaylistFrom={rotateArrayFrom}
            // loadChannelOnStack={loadChannelOnStack}
          />
        ))}
      </div>
      {isLoading && <div className={styles.loading}>loading</div>}
      {error && (
        <div className={styles.error}>
          there was an error fetching this channel
        </div>
      )}
      {isEmpty && <div className={styles.empty}>this channel is empty</div>}
      <div ref={elementRef}></div>
    </div>
  );
}
