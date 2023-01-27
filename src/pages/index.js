import styles from "@/src/styles/Home.module.sass";
import { useEffect, useState } from "react";
import Player from "../components/Player";
import useChannel from "../lib/api";

export default function Home() {
  const { channel, isLoading, isError } = useChannel();

  if (isLoading) return <div>loading</div>;
  let playlist = channel.contents;

  return (
    <main>
      <Player playlist={playlist} />
    </main>
  );
}
