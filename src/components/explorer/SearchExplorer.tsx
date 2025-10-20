"use client";

import styles from "@/src/styles/BlocksExplorer.module.sass";
import Block from "./Block/Block";
import { Loading } from "../Loading";
import { ArenaChannelMod } from "arena-ts";
export default function SearchExplorer({
  blocks,
  isLoading,
  isEmpty,
}: {
  blocks: ArenaChannelMod[];
  isLoading: boolean;
  isEmpty: boolean;
}) {
  return (
    <div className={styles.container}>
      <div className={styles.blocks_container}>
        {blocks?.map((block: any, i: number) => (
          <Block key={block.id} i={i} block={block} />
        ))}
      </div>
      <Loading isLoading={isLoading} hideText />
      {isEmpty && <div className={styles.empty}>this channel is empty</div>}
    </div>
  );
}
