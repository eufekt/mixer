/* eslint-disable @next/next/no-img-element */
import styles from "@/src/styles/Player.module.sass";

export function Preview({ image }) {


  const emptyBlock = <div style={{ width: "100%" }}></div>;

  const previewBlock = (
    <img className={styles.image} src={image} alt={"preview"}></img>
  );

  return (
    <div className={styles.previewContainer}>
      {image ? previewBlock : emptyBlock}
    </div>
  );
}
