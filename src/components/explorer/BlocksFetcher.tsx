"use client";

import { useMemo } from "react";
import { parseUsableBlocks } from "@/src/lib/helpers";
import { useRouter } from "next/navigation";
import { useArena } from "@/src/hooks/useArena";
import { ArenaChannelMod } from "arena-ts";
import BlocksExplorer from "./BlocksExplorer";

export default function BlocksFetcher({
  channel,
}: {
  channel: ArenaChannelMod;
}) {
  const arena = useArena(null);
  const router = useRouter();

  const { data, error, isLoading, size, setSize } = arena.FetchChannelContents(
    channel.slug
  );

  const loadedBlocks = useMemo(() => {
    return data ? data.flatMap((blocks) => blocks.contents) : [];
  }, [data]);

  const hasMore = loadedBlocks.length < channel.length;
  const isEmpty = data?.[0]?.contents.length === 0;
  const filtered = parseUsableBlocks(loadedBlocks) as any;

  if (error) {
    router.push("/error");
  }

  return (
    <BlocksExplorer
      blocks={filtered}
      isLoading={isLoading}
      hasMore={hasMore}
      size={size}
      setSize={setSize}
      isEmpty={isEmpty}
    />
  );
}
