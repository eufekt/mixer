import { InformationModal } from "./InformationModal";
import Player from "./player/Player";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      {children}
      <Player />
      <InformationModal />
    </main>
  );
}
