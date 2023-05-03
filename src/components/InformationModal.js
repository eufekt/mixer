import styles, {
  color_contrast,
  color_text,
  color_green,
  color_orange,
} from "@/src/styles/InformationModal.module.sass";
import { useState } from "react";
import Auth from "./Auth";
import { useSession } from "next-auth/react";

export function InformationModal() {
  const [showModal, setShowModal] = useState(false);
  const { data, status } = useSession();

  let letter = "i";
  let color = color_contrast;
  if (status == "loading") letter = "~";

  return (
    <>
      <div
        className={styles.infoButton}
        onClick={() => setShowModal(!showModal)}
        style={{ color }}
      >
        <div>{letter}</div>
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
            <Auth data={data} status={status} />
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
              href={"https://www.are.na/la-src/feedback-loop-evw-91mkkyu"}
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
