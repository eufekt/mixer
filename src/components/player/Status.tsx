import styles from "@/src/styles/Status.module.sass";

export default function Status({ status }: { status: string}) {
  let color, text;
  if (status == STATUS_ENUM.idle) {
    color = styles.color_contrast;
    text = "idle: choose track or press play";
  } else if (status == STATUS_ENUM.loading) {
    color = styles.color_orange;
    text = "loading";
  } else if (status == STATUS_ENUM.ready) {
    color = styles.color_green;
    text = "ready";
  }

  return (
    <div className={styles.container}>
      <div className={styles.status} style={{ backgroundColor: color }}></div>
    </div>
  );
}

export const STATUS_ENUM = {
  loading: "LOADING",
  error: "ERROR",
  idle: "IDLE",
  ready: "READY",
};
