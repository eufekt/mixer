import { usePlaylistContext } from "../ contexts/PlaylistContext";
import { usePlaylistIdContext } from "../ contexts/PlaylistIdContext";
import { BlocksExplorer } from "../components/BlocksExplorer";
import { ChanelExplorer } from "../components/ChanelExplorer";
import Player from "../components/player/Player";
import { useGetChannel } from "../lib/api";

export default function Home() {
  return (
    <main>
        <Player />
        <BlocksExplorer />
    </main>
  );
}
