import Link from "next/link";
import styles from "@/src/styles/Channel.module.sass";
import { ArenaBlock, ArenaChannel, ArenaChannelMod  } from "arena-ts";
import { useState } from "react";
import { ConnectDialog } from "./ConnectModal/ConnectModal";

export default function Channel({
   block,
}: {
  block: ArenaChannelMod;
}) {
  const { title, owner_slug, length, status, class: _class } = block;

  let color = styles.color_text;

  if (status === "public") {
    color = styles.color_green;
  }

  if (status === "private") {
    color = styles.color_red;
  }

  const [focus, setFocus] = useState(false);
  const [showConnect, setShowConnectModal] = useState(false);

  return (
    <Link href={`/${block.slug}`}>
      <a
        onMouseEnter={() => setFocus(true)}
        onMouseLeave={() => setFocus(false)}
      >
        <div className={styles.container} style={{ color }}>
          <div className={styles.channelDesc}>
            <div className={styles.title}>{title}</div>
            <div className={styles.misc}>
              {`by  ${owner_slug}`}
              <br />
              {`${length} blocks • some time ago`}
            </div>
          </div>
          <ConnectDialog
            focus={focus}
            setShowConnectModal={setShowConnectModal}
            showConnectModal={showConnect}
            block={block}
          />
        </div>
      </a>
    </Link>
  );
}
