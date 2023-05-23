import styles from "@/src/styles/Navigator.module.sass";
import Link from "next/link";
import { buildChannelUrl, buildUserUrl } from "../../lib/helpers";
import { ArenaChannelMod } from "arena-ts";
import UserContext, { useUserContext } from "@/src/contexts/UserContext";
import { links } from "@/src/config";
import Search from "../Search";

export function Navigator({
  channel,
  isRoot,
  setSearch,
  setIsFocused,
}: {
  channel?: ArenaChannelMod;
  isRoot: boolean;
  setSearch: any;
  setIsFocused: any;
}) {
  return (
    <div className={styles.container}>
      <Link href="/">
        <a className={styles.link}>main</a>
      </Link>
      <Search setSearch={setSearch} setIsFocused={setIsFocused} />
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
              {channel.owner.username}
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
