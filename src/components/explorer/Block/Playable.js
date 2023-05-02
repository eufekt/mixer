import { parseTitle } from "@/src/lib/helpers";
import styles from "@/src/styles/Playable.module.sass";
import Image from "next/image";
import { useState } from "react";
import { ConnectModal } from "./ConnectModal";

export default function Playable({ loadPlaylistFrom, block, i }) {
  const [focus, setFocus] = useState(false);
  const [showConnect, setShowConnectModal] = useState(false);

  let imgsrc = block.image.square.url;
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
        width={200}
        height={200}
        alt={"image"}
        onClick={() => loadPlaylistFrom(i)}
        src={imgsrc}
      ></Image>
      {focus && (
        <div
          onClick={() => setShowConnectModal(true)}
          className={styles.connect}
        >
          connect {"\u2192"}
        </div>
      )}
      {showConnect && (
        <div style={{ height: "100%" }}>
          <ConnectModal setShowConnectModal={setShowConnectModal} block={block} />
        </div>
      )}
      <div className={styles.blockTitle}>{title}</div>
    </div>
  );
}
