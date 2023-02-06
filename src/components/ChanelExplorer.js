import { useState } from "react";
import { usePlaylistContext } from "../ contexts/PlaylistContext";
import { useGetChannelContents } from "../lib/api";
import styles from "@/src/styles/ChanelExplorer.module.sass";

export function ChanelExplorer() {
  const seeds = ["mac-are-na"];
  const [selectedChanelId, setSelectedChanelId] = useState();

  return (
    <div className={styles.container}>
      <ul>
        {seeds.map((id) => (
          <li key={id} onClick={() => setSelectedChanelId(id)}>
            {id}
          </li>
        ))}
      </ul>
      {selectedChanelId && <ShowChanel id={selectedChanelId} />}
    </div>
  );
}

function ShowChanel({ id }) {
  const { contents, isLoading, isError } = useGetChannelContents(id);
  const { playlistDispatch } = usePlaylistContext();

  if (isLoading) return <div>loading</div>;

  return (
    <ul>
      {contents.channels.map((el) => (
        <li
          onClick={() => playlistDispatch({ type: "setPlaylistId", id: el.id })}
          key={el.id}
        >
          {el.title}
        </li>
      ))}
    </ul>
  );
}
