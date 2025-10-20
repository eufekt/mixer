"use client";

import styles from "@/src/styles/Channel.module.sass";
import { ArenaChannelMod } from "arena-ts";
import { useState } from "react";
import { ConnectDialog } from "./ConnectModal/ConnectModal";
import { useRouter } from "next/navigation";
import {
  ChannelHistoryContextInterface,
  ChannelHistoryInterface,
  useChannelHistoryContext,
} from "@/src/contexts/ChannelHistoryContext";

export default function Channel({ block }: { block: ArenaChannelMod }) {
  const { id, title, owner_slug, length, status, class: _class } = block;
  const router = useRouter();
  const { channelHistoryDispatch } =
    useChannelHistoryContext() as ChannelHistoryContextInterface;
  let color = styles.color_text;

  if (status === "public") {
    color = styles.color_green;
  }

  if (status === "private") {
    color = styles.color_red;
  }

  const [focus, setFocus] = useState(false);

  const [showConnect, setShowConnectModal] = useState(false);

  function handleChannelChange(url: string) {
    const channel = {
      id,
      url,
      title,
      status,
    } as ChannelHistoryInterface;
    channelHistoryDispatch({ type: "pushToHistory", channel });
    router.push(`/${url}`);
  }
  return (
    <a
      onMouseEnter={() => setFocus(true)}
      onMouseLeave={() => setFocus(false)}
      onClick={() => handleChannelChange(block.slug)}
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
  );
}
