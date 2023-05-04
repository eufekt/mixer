import { useRouter } from "next/router";
import { Loading } from "../Loading";
import { Navigator } from "./Navigator";
import { BlocksExplorer } from "./BlocksExplorer";
import { seedChannel } from "../../config";
import { useArena } from "../../hooks/useArena";
import { useUserContext } from "../../contexts/UserContext";
import styles from "@/src/styles/Explorer.module.sass";

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
        <Loading isLoading={isLoading} what={"channel"} type={"fullScreen"} />
        {channel && (
          <>
            <BlocksExplorer channel={channel} />
            <Navigator channel={channel} isRoot={isRoot} />
          </>
        )}
      </div>
    </>
  );
}
