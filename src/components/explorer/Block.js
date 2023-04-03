// /* eslint-disable @next/next/no-img-element */
import styles, {
  color_green,
  color_contrast,
  color_text,
} from "@/src/styles/Block.module.sass";
import Image from "next/image";
import { useRef } from "react";
import useIsInViewport from "./useIsInViewport";

export default function Block({ block, loadPlaylistFrom, i, addToStack }) {
  // TODO: check if state:available is for "isPlayable"
  const {
    title,
    owner_slug,
    length,
    state,
    status,
    base_class,
    class: _class,
    image,
  } = block;

  let imgsrc;
  let borderColor = color_contrast;
  let color = color_text;

  function parseTitle(title) {
    const maxLength = 35;
    let newTitle = title.replace(/&amp;/g, "&");

    if (newTitle.length > maxLength) {
      newTitle = newTitle.substring(0, maxLength) + "...";
    }
    return newTitle;
  }

  if (base_class === "Channel") {
    if (status === "public") {
      borderColor = color_green;
      color = color_green;
    }
    const border =
      base_class === "Channel" ? `1px solid ${borderColor}` : "none";
    return (
      <div
        className={styles.container}
        style={{ border, color }}
        onClick={() => addToStack(block.slug)}
      >
        <div className={styles.channelDesc}>
          <div className={styles.title}>{title}</div>
          <div className={styles.misc}>
            {`by  ${owner_slug}`}
            <br />
            {`${length} blocks • some time ago`}
          </div>
        </div>
      </div>
    );
  } else if (base_class === "Block") {
    imgsrc = image.square.url;

    let title = parseTitle(block.title);

    return (
      <div className={styles.container}>
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
        <div className={styles.blockTitle}>{title}</div>
      </div>
    );
  }
}
