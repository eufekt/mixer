"use client";

import styles from "@/src/styles/InformationModal.module.sass";
import { useState } from "react";
import {
  ThemeContextInterface,
  useThemeContext,
} from "../contexts/ThemeContext";
import { links } from "../config";
import pack from "@/package.json";

export function InformationModal() {
  const [showModal, setShowModal] = useState(false);
  const { isDark, setIsDark } = useThemeContext() as ThemeContextInterface;

  const version = pack.version || "x.x.x";

  let letter = "i";
  let color = styles.color_contrast;

  function handleLightChange() {
    setIsDark(!isDark);
    setShowModal(false);
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
            <ul>
              <li>
                Select a block to play it, following blocks will autoplay.
                Currently supports playback of SoundCloud and YouTube Links.
              </li>
              <li>
                The channels you explore will appear in the history at the
                bottom left corner.
              </li>
              <li>
                Your browser might automatically mute the tab. If you do not
                hear anything, check the tab icon.
              </li>
              <li>
                Add your curated channels to the{" "}
                <a
                  href={links.mixer_seed}
                  target={"_blank"}
                  style={{ display: "inline-block" }}
                  rel="noreferrer"
                >
                  mixer channel {"\u2197"}
                </a>{" "}
                to make it visible on the main page of this website.
              </li>
            </ul>
            <br />

            <small className={styles.version}>v {version}</small>
            <br />

            <button className={styles.button} onClick={handleLightChange}>
              {isDark ? "light mode" : "dark mode"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
