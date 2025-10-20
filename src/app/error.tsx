"use client";

import styles from "../styles/Error.module.sass";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className={styles.container}>
      <h1>Error</h1>
      <br />
      <p>{error.message || "Something went wrong"}</p>
      <br />
      <Link className={styles.button} href="/">
        return to main page
      </Link>
    </div>
  );
}
