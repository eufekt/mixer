import styles from "@/src/styles/Navigator.module.sass";
import Link from "next/link";
import { buildChannelUrl, buildUserUrl } from "../../lib/helpers";
import { CustomArenaChannel } from "arena-ts";
import UserContext, { useUserContext } from "@/src/contexts/UserContext";
import { links } from "@/src/config";

export function Navigator({
  channel,
  isRoot,
}: {
  channel?: CustomArenaChannel;
  isRoot: boolean;
}) {
  const logged_user = useUserContext();

  return (
    <div className={styles.container}>
      <Link href="/">
        <a className={styles.link}>main</a>
      </Link>
      {logged_user && (
        <Link href={`/user/${logged_user.id}`}>
          <div className={styles.link}>
            <span className={styles.userName}>{logged_user.name}</span>{" "}
            {"channels"}
          </div>
        </Link>
      )}
      <div className={styles.linksToSource}>
        <a href={links.mixer_seed} target="_blank" rel="noopener noreferrer">
          <div className={styles.link}>mixer</div>
        </a>
        {!isRoot && channel && (
          <>
            {"/"}
            <a
              className={styles.link}
              target="_blank"
              rel="noopener noreferrer"
              href={buildUserUrl(channel)}
            >
              {channel.user.slug}
            </a>
            /
            <a
              className={styles.link}
              target="_blank"
              rel="noopener noreferrer"
              href={buildChannelUrl(channel)}
            >
              {channel.title}
            </a>
          </>
        )}
        <div className={styles.arrow}>{"\u2197"}</div>
      </div>
    </div>
  );
}
