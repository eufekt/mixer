import { InformationModal } from "../components/InformationModal";
import { ChannelExplorer } from "../components/explorer/ChanelExplorer";
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
