import { Loading } from "../components/Loading";
import { Navigator } from "../components/Navigator";
import { BlocksExplorer } from "../components/explorer/BlocksExplorer";
import { useGetChannel } from "../lib/api";

export default function Home() {
  const seed = "mixer-xmxflhedaiq";
  const { data: channel, isLoading, error } = useGetChannel(seed);

  return (
    <>
      {channel && (
        <>
          <BlocksExplorer channel={channel} />
          <Navigator channel={channel} root />
        </>
      )}
      <Loading isLoading={isLoading} what={"channel"} />
    </>
  );
}
