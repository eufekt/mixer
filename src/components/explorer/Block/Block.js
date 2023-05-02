import Playable from "./Playable";
import Channel from "./Channel";

export default function Block({ block, loadPlaylistFrom, i }) {
  const { base_class } = block;
  if (base_class === "Channel") {
    return <Channel block={block} />;
  } else if (base_class === "Block") {
    return <Playable block={block} loadPlaylistFrom={loadPlaylistFrom} i={i} />;
  }
}
