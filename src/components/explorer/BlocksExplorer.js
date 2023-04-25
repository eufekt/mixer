import styles from "@/src/styles/BlocksExplorer.module.sass";
import { useRef, useCallback, useEffect, useMemo } from "react";
import { usePlaylistContext } from "../../contexts/PlaylistContext";
import { useGetChannelContentsPaginated } from "../../lib/api";
import Block from "./Block";

import useIsInViewport from "@/src/hooks/useIsInViewport";
import { buildChannelUrl, parseUsableBlocks } from "@/src/lib/helpers";
import { Loading } from "../Loading";
import Link from "next/link";

export function BlocksExplorer({ channel }) {
  const { playlistDispatch } = usePlaylistContext();

  const { data, error, isLoading, size, setSize } =
    useGetChannelContentsPaginated(channel.slug);

  if (error) {
    router.push({
      pathname: "/error",
      query: error.info,
    });
  }

  const loadedBlocks = useMemo(() => {
    return data ? data.flatMap((blocks) => blocks.contents) : [];
  }, [data]);

  const hasMore = loadedBlocks.length < channel.length;
  const isEmpty = data?.[0]?.contents.length === 0;

  const filtered = parseUsableBlocks(loadedBlocks);

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

  const setPLaylistFromSelection = (index) => {
    const rotatedList = [...filtered.slice(index), ...filtered.slice(0, index)];
    let onlyMedia = rotatedList.filter((block) => block.class === "Media");
    playlistDispatch({ type: "setPlaylist", list: onlyMedia });
  };

  return (
    <div className={styles.container}>
      <div className={styles.blocks_container}>
        {filtered.map((block, i) => (
          <Block
            key={block.id}
            i={i}
            block={block}
            loadPlaylistFrom={setPLaylistFromSelection}
          />
        ))}
      </div>
      <Loading isLoading={isLoading} />
      {isEmpty && <div className={styles.empty}>this channel is empty</div>}
      <div ref={elementRef}></div>
    </div>
  );
}
