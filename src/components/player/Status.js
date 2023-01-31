import styles from "@/src/styles/Status.module.sass"
export default function Status({ status }) {
  let color, text;
  if (status == STATUS_ENUM.idle) {
    color = "grey";
    text = "idle: choose track or press play";
  } else if (status == STATUS_ENUM.loading) {
    color = "orange";
    text = "loading";
  } else if (status == STATUS_ENUM.ready) {
    color = "green";
    text = "ready";
  }

  return (
    <div style={{ color, backgroundColor: "yellow", width: "100%" }}>
      {text}
    </div>
  );
}

export const STATUS_ENUM = {
  loading: "LOADING",
  idle: "IDLE",
  ready: "READY",
};
