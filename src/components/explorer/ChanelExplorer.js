import { useState } from "react";
import { usePlaylistIdContext } from "../../ contexts/PlaylistIdContext";
import { useGetChannel, useGetChannelContents } from "../../lib/api";
import styles from "@/src/styles/ChanelExplorer.module.sass";

export function ChanelExplorer() {
  const seed = "seed-nwf3b3nhr-a";
  const [stack, setStack] = useState([seed]);
  const currentChannel = stack.slice(-1)[0];
  
  const {data, isLoading, error} = useGetChannel(currentChannel);

  // implement
  function pushToStack(id) {
    setStack([...stack, id]);
  }

  // implement
  function popFromStack() {
    setStack(stack.slice(0, -1));
  }
  
  // TODO, here add to index
  // wrap blocks explorer here, give the channel to fetch,
  // fetch the channell here
  return (
    <div className={styles.container}>
    </div>
  );
}
