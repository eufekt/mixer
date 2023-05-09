import Link from "next/link";
import styles from "@/src/styles/Channel.module.sass";
import { CustomArenaChannel } from "arena-ts";

export default function Channel({ block }: { block: CustomArenaChannel & {owner_slug: string}}) {

  const {
    title,
    owner_slug,
    length,
    status,
    class: _class,
  } = block;

  let color = styles.color_text;

  if (status === "public") {
    color = styles.color_green;
  }

  return (
    <Link href={`/${block.slug}`}>
      <a>
        <div className={styles.container} style={{color}} >
          <div className={styles.channelDesc}>
            <div className={styles.title}>{title}</div>
            <div className={styles.misc}>
              {`by  ${owner_slug}`}
              <br />
              {`${length} blocks • some time ago`}
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}
