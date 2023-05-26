import {
  ChannelHistoryContextInterface,
  ChannelHistoryInterface,
  useChannelHistoryContext,
} from "@/src/contexts/ChannelHistoryContext";
import { parseTitle } from "@/src/lib/helpers";
import styles from "@/src/styles/History.module.sass";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function History() {
  const { channelHistory, channelHistoryDispatch } =
    useChannelHistoryContext() as ChannelHistoryContextInterface;
  const router = useRouter();
  const [isHidden, setIsHidden] = useState(false);
  function handleCleanHistory() {
    channelHistoryDispatch({ type: "CLEAN_HISTORY" });
  }
  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        <div onClick={() => setIsHidden(!isHidden)} className={styles.show}>
          {isHidden ? "show history" : "hide"}
        </div>
        {!isHidden && channelHistory.list.length > 1 && (
          <div onClick={handleCleanHistory} className={styles.clear}>
            clear
          </div>
        )}
      </div>
      {!isHidden && (
        <div className={styles.channels}>
          {channelHistory.list.map((channel, i) => (
            <Channel channel={channel} key={channel.id + i} />
          ))}
        </div>
      )}
      <div className={styles.buttons}>
        <button onClick={() => setIsHidden(!isHidden)} className={styles.show}>
          {isHidden ? "show history" : "hide"}
        </button>
        {!isHidden && channelHistory.list.length > 1 && (
          <button onClick={handleCleanHistory} className={styles.clear}>
            clear
          </button>
        )}
      </div>
    </div>
  );
}

function Channel({ channel }: { channel: ChannelHistoryInterface }) {
  const { id, title, status } = channel;
  let color = styles.color_text;

  if (status === "public") {
    color = styles.color_green;
  }

  if (status === "private") {
    color = styles.color_red;
  }

  return (
    <Link href={channel.url}>
      <div style={{ color, borderColor: color }} className={styles.channel}>
        {parseTitle(channel.title, 13)}
      </div>
    </Link>
  );
}
