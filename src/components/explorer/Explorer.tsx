import { useRouter } from "next/router";
import { Loading } from "../Loading";
import { Navigator } from "./Navigator";
import BlocksFetcher from "./BlocksFetcher";
import { seedChannel } from "../../config";
import { useArena } from "../../hooks/useArena";
import { useUserContext } from "../../contexts/UserContext";
import styles from "@/src/styles/Explorer.module.sass";
import ChannelsFetcher from "./ChannelsFetcher";

function ExploreChannelBlocks({ isRoot = false }) {
  const user = useUserContext();
  const arena = useArena(user);
  const router = useRouter();
  const { channelId } = router.query;
  const seed = (channelId as string) || seedChannel;
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
          <BlocksFetcher channel={channel} />
          <Navigator channel={channel} isRoot={isRoot} />
        </>
      )}
    </>
  );
}

function ExploreUserChannels({ isRoot }: { isRoot: boolean }) {
  return (
    <>
      <ChannelsFetcher />
      <Navigator isRoot={isRoot} />
    </>
  );
}

export default function Explorer({ isRoot = false, userPage = false }) {
  const FetchComponnetType = userPage ? (
    <ExploreUserChannels isRoot={isRoot} />
  ) : (
    <ExploreChannelBlocks isRoot={isRoot} />
  );

  return (
    <>
      <div className={styles.isMobile}>
        For the present moment, this application is only optimized for desktop
        experience. Some features may not work on mobile devices. Please use a
        desktop.
        <br />
        <br />
        <a
          className={styles.link}
          href={"https://www.are.na/la-src/feedback-loop-evw-91mkkyu"}
          target={"_blank"}
          rel="noreferrer"
        >
          {"feedback loop"}
        </a>
      </div>
      <div className={styles.isDesktop}>{FetchComponnetType}</div>
    </>
  );
}
