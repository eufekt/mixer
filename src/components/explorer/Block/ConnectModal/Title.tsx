"use client";

import styles from "@/src/styles/ConnectModal.module.sass";

export function Title({
  title,
  status,
  leftPadded = false,
}: {
  title: string | null | undefined;
  status: string | null | undefined;
  leftPadded?: boolean;
}) {
  if (!title || !status) return null;
  let color = styles.color_text;
  if (status === "public") {
    color = styles.color_green;
  } else if (status === "private") {
    color = styles.color_red;
  }
  return (
    <div
      style={{ color, paddingLeft: leftPadded ? "7px" : "0px" }}
    >{` ${title}`}</div>
  );
}
