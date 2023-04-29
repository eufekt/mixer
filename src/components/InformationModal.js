import styles from "@/src/styles/InformationModal.module.sass";

import { useState } from "react";
import Auth from "./Auth";

export function InformationModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        className={styles.infoButton}
        onClick={() => setShowModal(!showModal)}
      >
        {"i"}
      </div>

      {showModal && (
        <div
          className={styles.infoModalContainer}
          onClick={(e) => {
            setShowModal(false);
          }}
        >
          <div
            className={styles.infoModal}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Auth />
            <br />
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

            <a
              href={"https://www.are.na/la-src/how-can-are-na-mixer-be-better"}
              target={"_blank"}
              rel="noreferrer"
            >
              {"feedback loop"}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
