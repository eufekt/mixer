import { useMemo } from "react";
import { useRouter } from "next/router";
import { useArena } from "@/src/hooks/useArena";
import { useUserContext } from "@/src/contexts/UserContext";
import BlocksExplorer from "./BlocksExplorer";

export default function ChannelsFetcher() {
  const user = useUserContext();
  const arena = useArena(user);
  const router = useRouter();

  const { data, error, isLoading, size, setSize } = arena.FetchUserChannels(
    user?.id!!
  );

  if (error) {
    router.push({
      pathname: "/error",
      query: error.info,
    });
  }

  const loadedBlocks = useMemo(() => {
    return data ? data.flatMap((blocks) => blocks.channels) : [];
  }, [data]);

  const hasMore = loadedBlocks.length < data?.[0].length;
  const isEmpty = data?.[0]?.channels.length === 0;

  return (
    <BlocksExplorer
      blocks={loadedBlocks}
      isLoading={isLoading}
      hasMore={hasMore}
      size={size}
      setSize={setSize}
      isEmpty={isEmpty}
    />
  );
}
