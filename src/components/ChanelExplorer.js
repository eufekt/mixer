import { useState } from "react";
import { usePlaylistIdContext } from "../ contexts/PlaylistIdContext";
import { useGetChannelContents } from "../lib/api";
import styles from "@/src/styles/ChanelExplorer.module.sass";

export function ChanelExplorer() {
  const seeds = ["mac-are-na"];
  const [selectedChanelId, setSelectedChanelId] = useState(seeds[0]);

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
  // getting contents of seed
  const { contents, isLoading, isError } = useGetChannelContents(id);
  const { playlistDispatch } = usePlaylistIdContext();

  if (isLoading) return <div>loading</div>;
  // console.log(contents.channels);
  /**
   * follower_count
   * length
   * owner_slug
   * user<
   * nsfw?
   */
  return (
    <ul>
      {contents.channels.map((el) => (
        <li
          onClick={() => playlistDispatch({ type: "setPlaylistId", id: el.id })}
          key={el.id}
        >
          {el.title}
          <span style={{ color: "blue" }}>{el.follower_count}</span>
          <span>{`( ${el.length} )`}</span>
        </li>
      ))}
    </ul>
  );
}
