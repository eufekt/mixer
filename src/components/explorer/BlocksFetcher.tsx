import { useMemo } from "react";
import { parseUsableBlocks } from "@/src/lib/helpers";
import { useRouter } from "next/router";
import { useArena } from "@/src/hooks/useArena";
import { useUserContext } from "@/src/contexts/UserContext";
import { ArenaChannelMod } from "arena-ts";
import BlocksExplorer from "./BlocksExplorer";

export default function BlocksFetcher({
  channel,
}: {
  channel: ArenaChannelMod;
}) {
  const user = useUserContext();
  const arena = useArena(user);
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
    router.push({
      pathname: "/error",
      query: error.info,
    });
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
