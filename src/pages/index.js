import { usePlaylistContext } from "../ contexts/PlaylistContext";
import Player from "../components/player/Player";
import { useGetChannel } from "../lib/api";

export default function Home() {
  const { playlistState } = usePlaylistContext();
  const { channel, isLoading, isError } = useGetChannel(
    playlistState?.id || "saoul"
  );

  if (isLoading) return <div>loading</div>;

  let playlist = channel.contents;

  return (
    <main>
      <Player playlist={playlist} />
    </main>
  );
}
