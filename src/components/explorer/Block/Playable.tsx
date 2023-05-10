import { parseTitle } from "@/src/lib/helpers";
import styles from "@/src/styles/Playable.module.sass";
import Image from "next/image";
import { useState } from "react";
import { ConnectDialog, ConnectModal } from "./ConnectModal/ConnectModal";
import { ArenaBlock } from "arena-ts";

export default function Playable({
  loadPlaylistFrom,
  block,
  i,
}: {
  loadPlaylistFrom: any;
  block: ArenaBlock;
  i: number;
}) {
  const [focus, setFocus] = useState(false);
  const [showConnect, setShowConnectModal] = useState(false);
  const priority = i < 15 ? true : false;

  let imgsrc = block.image?.square.url;
  let title = parseTitle(block.title);

  return (
    <div
      onMouseEnter={() => setFocus(true)}
      onMouseLeave={() => setFocus(false)}
      className={styles.container}
    >
      <Image
        className={styles.image}
        layout="fixed"
        objectFit="cover"
        width={styles.block_width}
        height={styles.block_width}
        alt={"image"}
        priority={priority}
        quality={50}
        onClick={() => loadPlaylistFrom(i)}
        src={imgsrc!!}
      ></Image>
      <ConnectDialog
        focus={focus}
        setShowConnectModal={setShowConnectModal}
        showConnectModal={showConnect}
        block={block}
      />
      <div className={styles.blockTitle}>{title}</div>
    </div>
  );
}
