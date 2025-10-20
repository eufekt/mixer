"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useArena } from "@/src/hooks/useArena";
import BlocksExplorer from "./BlocksExplorer";

export default function ChannelsFetcher() {
  // User channels feature disabled - authentication removed
  // This component now returns an empty state
  return (
    <BlocksExplorer
      blocks={[]}
      isLoading={false}
      hasMore={false}
      size={0}
      setSize={() => {}}
      isEmpty={true}
    />
  );
}
