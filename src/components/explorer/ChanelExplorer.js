import { useState } from "react";
import { useGetChannel } from "@/src/lib/api";
import { BlocksExplorer } from "./BlocksExplorer";

export function ChannelExplorer() {
  const seed = "seed-nwf3b3nhr-a";
  const [stack, setStack] = useState([seed]);
  const currentChannelSlug = stack.slice(-1)[0];

  const { data: channel, isLoading, error } = useGetChannel(currentChannelSlug);

  const stackLength = stack.length;
  const isRoot = stackLength === 1;

  function addToStack(slug) {
    setStack([...stack, slug]);
  }

  function popFromStack() {
    if (!isRoot) setStack(stack.slice(0, -1));
  }

  return (
    <>
      {channel && (
        <BlocksExplorer
          channel={channel}
          addToStack={addToStack}
          popFromStack={popFromStack}
          isRoot={isRoot}
        />
      )}
    </>
  );
}
