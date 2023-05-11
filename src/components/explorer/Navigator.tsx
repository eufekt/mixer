import styles from "@/src/styles/Navigator.module.sass";
import Link from "next/link";
import { buildChannelUrl, buildUserUrl } from "../../lib/helpers";
import { CustomArenaChannel } from "arena-ts";
import UserContext, { useUserContext } from "@/src/contexts/UserContext";

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
      <div className={styles.linksToSource}>
        <Link href={"/"}>
          <div className={styles.link}>Mixer</div>
        </Link>{" "}
        /
        {!isRoot && channel && (
          <>
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
      </div>
      {logged_user && (
        <Link href={`/user/${logged_user.id}`}>
          <div className={styles.link}>
            <span className={styles.userName}>{logged_user.name}</span>{" "}
            {"channels"}
          </div>
        </Link>
      )}
    </div>
  );
}
