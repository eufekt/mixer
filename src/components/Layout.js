import { InformationModal } from "./InformationModal";
import Player from "./player/Player";

export default function Layout({ children }) {
  return (
    <main>
      {children}
      <Player />
      <InformationModal />
    </main>
  );
}
