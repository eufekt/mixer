import { InformationModal } from "./InformationModal";
import Player from "./player/Player.jsx";
import History from "./channelHistory/History";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main>
            {children}
            <Player />
            <InformationModal />
            <History />
        </main>
    );
}
