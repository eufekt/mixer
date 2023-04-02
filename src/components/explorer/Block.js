// /* eslint-disable @next/next/no-img-element */
import styles from "@/src/styles/Block.module.sass";
import Image from "next/image";
import { useRef } from "react";
import useIsInViewport from "./useIsInViewport";

export default function Block({ block, loadPlaylistFrom, i }) {
  return (
    <div className={styles.container}>
      <Image
        className={styles.image}
        layout="fixed"
        objectFit="cover"
        width={150}
        height={150}
        alt={"image"}
        onClick={() => loadPlaylistFrom(i)}
        src={block.image.square.url}
      ></Image>
    </div>
  );
}
