import { useRouter } from "next/router";
import { Loading } from "../components/Loading";
import { Navigator } from "../components/Navigator";
import { BlocksExplorer } from "../components/explorer/BlocksExplorer";
import { useGetChannel } from "../lib/api";
import { seedChannel } from "../config";

export default function ChannelExplorer({isRoot}) {
  const router = useRouter();
  const { channelId } = router.query;

  const seed = channelId || seedChannel;

  const { data: channel, isLoading, error } = useGetChannel(seed);

  console.log(error?.info)

  if (error) {
    router.push({
      pathname: "/error",
      query: error.info,
    });
  }

  return (
    <>
      {channel && (
        <>
          <BlocksExplorer channel={channel} />
          <Navigator channel={channel} isRoot={isRoot} />
        </>
      )}
      <Loading isLoading={isLoading} what={"channel"} />
    </>
  );
}
