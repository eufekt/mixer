import styles from "@/src/styles/Preview.module.sass";
import Image from "next/image";

export function Preview({ image }: { image: string }) {
  const previewBlock = (
    <Image
      unoptimized={true}
      src={image}
      alt={"preview"}
      layout="fixed"
      objectFit="cover"
      style={{ borderRadius: "50%" }}
      width={40}
      height={40}
    ></Image>
  );

  return (
    <div className={styles.previewContainer}>{image ? previewBlock : null}</div>
  );
}
