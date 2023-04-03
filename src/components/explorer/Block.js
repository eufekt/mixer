// /* eslint-disable @next/next/no-img-element */
import styles, {
  color_green,
  color_contrast,
} from "@/src/styles/Block.module.sass";
import Image from "next/image";
import { useRef } from "react";
import useIsInViewport from "./useIsInViewport";

export default function Block({ block, loadPlaylistFrom, i, loadChannelOnStack }) {
  // TODO: check if state:available is for "isPlayable"
  const {
    title,
    owner_slug,
    length,
    state,
    collaboration,
    base_class,
    class: _class,
    image,
  } = block;

  if (_class === "Text" || _class === "Image" || _class === "Attachment")
    return null;

  // console.log(block);
  let imgsrc;
  let borderColor = color_contrast;
  let hasImage = false;

  if (base_class === "Channel") {
    if (collaboration) {
      borderColor = color_green;
    }
    const border =
      base_class === "Channel" ? `1px solid ${borderColor}` : "none";
    return (
      <div className={styles.container} style={{ border }}>
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
    if (_class !== "Media") {
      console.log("Other than media found, found",_class);
      return null;
    }

    imgsrc = image.square.url;

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
      </div>
    );
  }
}
