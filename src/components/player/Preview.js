/* eslint-disable @next/next/no-img-element */
import styles from "@/src/styles/Player.module.sass";
import Image from "next/image";

export function Preview({ image }) {

  const previewBlock = (
    <Image
      className={styles.image}
      src={image}
      alt={"preview"}
      layout="fixed"
      objectFit="cover"
      width={40}
      height={40}
    ></Image>
  );

  return (
    <div className={styles.previewContainer}>
      {image ? previewBlock : null}
    </div>
  );
}
