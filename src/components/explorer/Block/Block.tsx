import Playable from "./Playable";
import Channel from "./Channel";
import { ArenaBlock, CustomArenaChannel } from "arena-ts";

export default function Block({ block, loadPlaylistFrom, i }: { block: ArenaBlock | CustomArenaChannel & {owner_slug:string}, loadPlaylistFrom: any, i: number }) {
  const { base_class } = block;
  if (base_class === "Channel") {
    return <Channel block={block} />;
  } else if (base_class === "Block") {
    return <Playable block={block} loadPlaylistFrom={loadPlaylistFrom} i={i} />;
  } else return null
}
