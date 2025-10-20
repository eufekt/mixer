"use client";

import { useEffect } from "react";
import styles from "@/src/styles/ConnectModal.module.sass";

export function ConnectionConfirmation({
  message,
  titleComponent,
  errorMessage,
  errorStatus,
  autoClose,
}: {
  message: string;
  errorMessage?: string;
  errorStatus?: string;
  titleComponent?: any;
  autoClose?: () => any;
}) {
  useEffect(() => {
    let timer: any;
    if (autoClose) {
      timer = autoClose();
    }

    return () => clearTimeout(timer);
  }, [autoClose]);

  return (
    <div className={styles.ConnectionState}>
      <div>
        {message} {titleComponent}
      </div>
      <br />
      {errorStatus && (
        <div>
          <span className={styles.bold}>status:</span> {errorStatus}
        </div>
      )}
      <br />
      {errorMessage && (
        <div>
          <span className={styles.bold}>reason:</span> {errorMessage}
        </div>
      )}
    </div>
  );
}
