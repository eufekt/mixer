import styles from "@/src/styles/InformationModal.module.sass";
import { useState } from "react";
import Auth from "./Auth";
import { useSession } from "next-auth/react";
import { ThemeContextInterface, useThemeContext } from "../contexts/ThemeContext";

export function InformationModal() {
  const [showModal, setShowModal] = useState(false);
  const { isDark, setIsDark } = useThemeContext() as ThemeContextInterface;
  const { data, status } = useSession();

  let letter = "i";
  let color = styles.color_contrast;
  if (status == "loading") letter = "~";


  function handleLightChange() {
    setIsDark(!isDark)
    setShowModal(false)
  }

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
            <br />

            <button
              className={styles.button}
              onClick={handleLightChange}
            >
              {isDark ? "light mode" : "dark mode"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}