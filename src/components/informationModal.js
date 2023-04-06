import styles from "@/src/styles/InformationModal.module.sass";

import { useState } from "react";

export function InformationModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        className={styles.infoButton}
        onClick={() => setShowModal(!showModal)}
      >
        {"\u2139"}
      </div>

      {showModal && (
        <div
          className={styles.infoModalContainer}
          onClick={(e) => {
            console.log("click");
            setShowModal(false);
          }}
        >
          <div
            className={styles.infoModal}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <a
              href={"https://github.com/eufekt/mixer"}
              target={"_blank"}
              rel="noreferrer"
            >
              {"https://github.com/eufekt/mixer"}
            </a>
            <a
              href={"https://www.are.na/la-src"}
              target={"_blank"}
              rel="noreferrer"
            >
              {"https://www.are.na/la-src"}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
