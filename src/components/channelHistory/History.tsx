import {
  ChannelHistoryContextInterface,
  useChannelHistoryContext,
} from "@/src/contexts/ChannelHistoryContext";
import styles from "@/src/styles/History.module.sass";

export default function History() {
  const { channelHistory, channelHistoryDispatch } =
    useChannelHistoryContext() as ChannelHistoryContextInterface;
  console.log(channelHistory);
  return (
    <div className={styles.container}>
      <h1>History</h1>
      <button>prev</button>

      <button>forw</button>
      <div>
        {channelHistory.list.map((channel, i) => (
          <div key={channel.id + i}>{channel.title}</div>
        ))}
      </div>
    </div>
  );
}
