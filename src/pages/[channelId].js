import { useRouter } from "next/router";
import { Loading } from "../components/Loading";
import { BlocksExplorer } from "../components/explorer/BlocksExplorer";
import { useGetChannel } from "../lib/api";
import { Navigator } from "../components/Navigator";

export default function Channel() {
  const router = useRouter();
  const { channelId } = router.query;

  const { data: channel, isLoading, error } = useGetChannel(channelId);
  

  return (
    <>
      {channel && (
        <>
          <BlocksExplorer channel={channel} />
          <Navigator channel={channel} />
        </>
      )}
      <Loading isLoading={isLoading} what={"channel"} />
    </>
  );
}
