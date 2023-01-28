import Player from "../components/player/Player";
import useChannel from "../lib/api";

export default function Home() {
  const { channel, isLoading, isError } = useChannel();

  if (isLoading) return <div>loading</div>;

  let playlist = channel.contents;

  return (
    <main>
      <Player playlist={playlist} />
    </main>
  );
}
