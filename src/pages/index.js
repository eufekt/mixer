import { ChannelExplorer } from "../components/explorer/ChanelExplorer";
import { InformationModal } from "../components/InformationModal";
import Player from "../components/player/Player";

export default function Home() {
  return (
    <main>
      <ChannelExplorer />
      <Player />
      <InformationModal/>
    </main>
  );
}
