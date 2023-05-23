import styles from "@/src/styles/Navigator.module.sass";
import Link from "next/link";
import { buildChannelUrl, buildUserUrl } from "../../lib/helpers";
import { ArenaChannelMod } from "arena-ts";
import { links } from "@/src/config";
import Search from "../Search";

export function Navigator({
  channel,
  isRoot,
  setSearch,
  setIsFocused,
  isFocused,
}: {
  channel?: ArenaChannelMod;
  isRoot: boolean;
  setSearch: any;
  setIsFocused: any;
  isFocused: boolean;
}) {
  return (
    <div className={styles.container}>
      <div className={styles.left}> 
        <Link href="/">
          <a className={styles.linkpage}>main</a>
        </Link>
        <Search
          setSearch={setSearch}
          setIsFocused={setIsFocused}
          isFocused={isFocused}
        />
      </div>
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
