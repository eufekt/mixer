import styles from "@/src/styles/Navigator.module.sass";
import Link from "next/link";
import { buildChannelUrl, buildUserUrl } from "../lib/helpers";
import { signIn } from 'next-auth/react'

export function Navigator({ channel, isRoot }) {
  const channelUrl = buildChannelUrl(channel);
  const userUrl = buildUserUrl(channel);

  const { title, user } = channel;

  return (
    <div className={styles.container}>
      <button onClick={()=>signIn('arena')}>sign in</button>
      <Link href={"/"}>
        <div className={styles.link}>Mixer</div>
      </Link>{" "}
      /
      {!isRoot && (
        <>
          <a
            className={styles.link}
            target="_blank"
            rel="noopener noreferrer"
            href={userUrl}
          >
            {user.slug}
          </a>
          /
          <a
            className={styles.link}
            target="_blank"
            rel="noopener noreferrer"
            href={channelUrl}
          >
            {title}
          </a>
        </>
      )}
    </div>
  );
}
