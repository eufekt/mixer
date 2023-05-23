import Playable from "./Playable";
import Channel from "./Channel";
import {
  ArenaBlock,
  ArenaChannelMod,
} from "arena-ts";

export default function Block({
  block,
  loadPlaylistFrom,
  i,
}: {
  loadPlaylistFrom?: any;
  block: ArenaBlock | ArenaChannelMod;
  i: number;
}) {
  const { base_class } = block;
  if (base_class === "Channel") {
    return <Channel block={block} />;
  } else if (base_class === "Block") {
    return <Playable block={block} loadPlaylistFrom={loadPlaylistFrom} i={i} />;
  } else return null;
}
