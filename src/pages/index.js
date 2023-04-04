import { ChannelExplorer } from "../components/explorer/ChanelExplorer";
import { InformationModal } from "../components/informationModal";
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
