import styles from "@/src/styles/InformationModal.module.sass";
import { useState } from "react";
import Auth from "./Auth";
import { useSession } from "next-auth/react";
import {
  ThemeContextInterface,
  useThemeContext,
} from "../contexts/ThemeContext";
import { links } from "../config";
import pack from "@/package.json";

export function InformationModal() {
  const [showModal, setShowModal] = useState(false);
  const { isDark, setIsDark } = useThemeContext() as ThemeContextInterface;
  const { data, status } = useSession();

  const version = pack.version || "x.x.x";
  
  let letter = "i";
  let color = styles.color_contrast;
  if (status == "loading") letter = "~";

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
            <Auth data={data} status={status} />
            <br />
            <ul>
              <li>
                Select a block to play it, following blocks will autoplay.
                Currently supports playback of SoundCloud and YouTube Links.
              </li>
              <li>
                Sign in to are.na with the link above to connect blocks to your
                channels.
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
            <a href={links.mixer_seed} target={"_blank"} rel="noreferrer">
              {"mixer channel"} {"\u2197"}
            </a>
            <a href={links.feedback_loop} target={"_blank"} rel="noreferrer">
              {"feedback loop"} {"\u2197"}
            </a>
            <a href={links.arena_user} target={"_blank"} rel="noreferrer">
              {"are.na @la-src"} {"\u2197"}
            </a>
            <a href={links.github} target={"_blank"} rel="noreferrer">
              {"github"} {"\u2197"}
            </a>
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
