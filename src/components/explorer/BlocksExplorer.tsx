import styles from "@/src/styles/BlocksExplorer.module.sass";
import { useRef, useCallback, useEffect, useMemo } from "react";
import { PlaylistContextInterface, usePlaylistContext } from "../../contexts/PlaylistContext";
import Block from "./Block/Block";

import useIsInViewport from "@/src/hooks/useIsInViewport";
import { parseUsableBlocks } from "@/src/lib/helpers";
import { Loading } from "../Loading";

import { useRouter } from "next/router";
import { useArena } from "@/src/hooks/useArena";
import { useUserContext } from "@/src/contexts/UserContext";
import { CustomArenaChannel } from "arena-ts";

export function BlocksExplorer({ channel }: {channel: CustomArenaChannel}) {
  const { playlistDispatch } = usePlaylistContext() as PlaylistContextInterface;
  const router = useRouter();
  const user = useUserContext();
  const arena = useArena(user);

  const { data, error, isLoading, size, setSize } = arena.FetchChannelContents(
    channel.slug
  );

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

  const elementRef = useRef(null);
  const isInViewport = useIsInViewport(elementRef);

  const increasePageSize = useCallback(() => {
    setSize(size + 1);
  }, [setSize, size]);

  useEffect(() => {
    if (isInViewport && !isLoading && hasMore) {
      increasePageSize();
    }
  }, [increasePageSize, isInViewport, isLoading, hasMore]);

  const setPLaylistFromSelection = (index:number) => {
    const rotatedList = [...filtered.slice(index), ...filtered.slice(0, index)];
    let onlyMedia = rotatedList.filter((block) => block.class === "Media");
    playlistDispatch({ type: "setPlaylist", list: onlyMedia });
  };

  return (
    <div className={styles.container}>
      <div className={styles.blocks_container}>
        {filtered.map((block:any, i) => (
          <Block
            key={block.id}
            i={i}
            block={block}
            loadPlaylistFrom={setPLaylistFromSelection}
          />
        ))}
      </div>
      <Loading isLoading={isLoading} hideText/>
      {isEmpty && <div className={styles.empty}>this channel is empty</div>}
      <div ref={elementRef}></div>
    </div>
  );
}
