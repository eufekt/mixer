import {
  ChannelHistoryContextInterface,
  ChannelHistoryInterface,
  useChannelHistoryContext,
} from "@/src/contexts/ChannelHistoryContext";
import { parseTitle } from "@/src/lib/helpers";
import styles from "@/src/styles/History.module.sass";
import Link from "next/link";
import { useRouter } from "next/router";

export default function History() {
  const { channelHistory, channelHistoryDispatch } =
    useChannelHistoryContext() as ChannelHistoryContextInterface;
  const router = useRouter();
  return (
    <div className={styles.container}>
      <div className={styles.arrows}>
        <div onClick={() => router.back()} className={styles.arrowLeft}></div>
      </div>
      <div>
        {channelHistory.list.map((channel, i) => (
          <Channel channel={channel} key={channel.id + i} />
        ))}
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
        {parseTitle(channel.title, 15)}
      </div>
    </Link>
  );
}
