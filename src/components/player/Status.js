import styles, {color_green, color_orange, color_contrast} from "@/src/styles/Status.module.sass";

export default function Status({ status }) {
  let color, text;
  if (status == STATUS_ENUM.idle) {
    color = color_contrast;
    text = "idle: choose track or press play";
  } else if (status == STATUS_ENUM.loading) {
    color = color_orange
    text = "loading";
  } else if (status == STATUS_ENUM.ready) {
    color = color_green;
    text = "ready";
  }

  return (
    <div className={styles.status} style={{ backgroundColor: color }}></div>
  );
}

export const STATUS_ENUM = {
  loading: "LOADING",
  idle: "IDLE",
  ready: "READY",
};
