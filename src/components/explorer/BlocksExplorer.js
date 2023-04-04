import styles from "@/src/styles/BlocksExplorer.module.sass";
import { useState, useRef, useCallback, useEffect } from "react";
import { usePlaylistContext } from "../../ contexts/PlaylistContext";
import { useGetChannel, useGetChannelContentsPaginated } from "../../lib/api";
import Block from "./Block";

import useIsInViewport from "./useIsInViewport";
import { buildChannelUrl } from "@/src/lib/helpers";

export function BlocksExplorer({ channel, addToStack, isRoot, popFromStack }) {
  const { playlistDispatch } = usePlaylistContext();

  const { data, error, isLoading, size, setSize } =
    useGetChannelContentsPaginated(channel.slug);

  const loadedBlocks = data ? data.flatMap((blocks) => blocks.contents) : [];
  const hasMore = loadedBlocks.length < channel.length;
  const isEmpty = data?.[0]?.contents.length === 0;

  const filtered = loadedBlocks.filter((block) => {
    if (block.class === "Channel") {
      return true;
    } else if (block.class === "Media") {
      if (
        block.source.provider.name === "YouTube" ||
        block.source.provider.name === "SoundCloud"
      ) {
        return true;
      }
    }
    return false;
  });

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

  const rotateArrayFrom = useCallback(
    (index) => {
      const rotatedList = [
        ...filtered.slice(index),
        ...filtered.slice(0, index),
      ];
      let onlyMedia = rotatedList.filter((block) => block.class === "Media");
      playlistDispatch({ type: "setPlaylist", list: onlyMedia });
    },
    [filtered, playlistDispatch]
  );

  const channelUrl = buildChannelUrl(channel);

  return (
    <div className={styles.container}>
      <div className={styles.channelActions}>
        <button
          disabled={isRoot}
          className={styles.back}
          onClick={popFromStack}
        >
          {"\u2196 back"}
        </button>
        <div className={styles.rightSide}>
          <span className={styles.channelTitle}>{channel.title}</span>
          <span>{` • by ${channel.user.full_name}`}</span>
          <span>{` • ${loadedBlocks.length}/${channel.length} loaded`}</span>
          <span>
            {" • "}
            <a href={channelUrl} target={"_blank"} rel="noreferrer">
              source
            </a>
          </span>
        </div>
      </div>
      <div className={styles.blocks_container}>
        {filtered.map((block, i) => (
          <Block
            key={block.id}
            i={i}
            block={block}
            loadPlaylistFrom={rotateArrayFrom}
            addToStack={addToStack}
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
