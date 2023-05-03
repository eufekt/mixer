import { useRouter } from "next/router";
import { Loading } from "../Loading";
import { Navigator } from "./Navigator";
import { BlocksExplorer } from "./BlocksExplorer";
import { seedChannel } from "../../config";
import { useArena } from "../../hooks/useArena";
import { useUserContext } from "../../contexts/UserContext";

export default function Explorer({ isRoot }) {
  const user = useUserContext();
  const arena = useArena(user);

  const router = useRouter();
  const { channelId } = router.query;

  const seed = channelId || seedChannel;

  const { data: channel, isLoading, error } = arena.FetchChannel(seed);

  if (error) {
    router.push({
      pathname: "/error",
      query: error.info,
    });
  }

  return (
    <>
      <Loading isLoading={isLoading} what={"channel"} type={"fullScreen"} />
      {channel && (
        <>
          <BlocksExplorer channel={channel} />
          <Navigator channel={channel} isRoot={isRoot} />
        </>
      )}
    </>
  );
}
