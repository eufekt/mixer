import { useRouter } from "next/router";
import { Loading } from "../Loading";
import { Navigator } from "./Navigator";
import BlocksFetcher from "./BlocksFetcher";
import { seedChannel } from "../../config";
import { useArena } from "../../hooks/useArena";
import { useUserContext } from "../../contexts/UserContext";
import styles from "@/src/styles/Explorer.module.sass";
import { useEffect, useState } from "react";
import SearchExplorer from "./SearchExplorer";

function ExploreChannelBlocksWithSearch({ isRoot }: { isRoot: boolean }) {
  const user = useUserContext();
  const arena = useArena(user);
  const router = useRouter();
  const { channelId } = router.query;
  const seed = (channelId as string) || seedChannel;

  const [search, setSearch] = useState("");
  const { data: channel, isLoading, error } = arena.FetchChannel(seed);

  //TODO handle error
  const {
    data: searchResults,
    isLoading: searchLoading,
    error: searchError,
  } = arena.Search(search);
  const [isFocused, setIsFocused] = useState(false);
  if (error) {
    router.push({
      pathname: "/error",
      query: error.info,
    });
  }

  useEffect(() => {
    if (router.asPath !== router.route) {
      setIsFocused(false);
    }
  }, [router.query]);

  const condition = isFocused;
  return (
    <>
      <Loading isLoading={isLoading} what={"channel"} type={"fullScreen"} />
      {channel && (
        <>
          <Navigator
            setSearch={setSearch}
            setIsFocused={setIsFocused}
            isFocused={isFocused}
            channel={channel}
            isRoot={isRoot}
          />
          {condition && (
            <SearchExplorer
              blocks={searchResults?.channels}
              isLoading={searchLoading}
              isEmpty={searchResults?.channels.length == 0}
            />
          )}
          {!condition && <BlocksFetcher channel={channel} />}
        </>
      )}
    </>
  );
}
export default function Explorer({ isRoot = false }) {
  return (
    <div className={styles.container}>
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
      <div className={styles.isDesktop}>
        <ExploreChannelBlocksWithSearch isRoot={isRoot} />
      </div>
    </div>
  );
}
