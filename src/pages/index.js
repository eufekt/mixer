import styles from "@/src/styles/Home.module.sass";
import { useState } from "react";
import Player from "../components/Player";
import useChannel from "../lib/api";

function Block({ block, seturl }) {
  let url = block.source.url;
  if(url.includes("youtube")) url = url.split("&")[0]

  return (
    <div style={{display:"flex", alignItems:'center', padding: 10}}>
      <img style={{ width: "40px" }} src={block.image.square.url}></img>
      <div onClick={() => seturl(url)}>{block.title}</div>
    </div>
  );
}

export default function Home() {
  const { channel, isLoading, isError } = useChannel();
  const [url, seturl] = useState();
  if (isLoading) return <div>loading</div>;

  if (channel)
    return (
      <main>
        <Player url={url} />
        {channel.contents.map((block) => (
          <Block key={block.id} block={block} seturl={seturl} />
        ))}
      </main>
    );
}
