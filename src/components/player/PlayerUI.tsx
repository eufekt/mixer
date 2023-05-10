import styles from "@/src/styles/PlayerUI.module.sass";
import { Controls } from "./Controls";
import Seek from "./Seek";
import Status from "./Status";
import { ConnectModal } from "../explorer/Block/ConnectModal/ConnectModal";
import { useState } from "react";

export function PlayerUI({
  handlePrev,
  handleNext,
  handlePlayPause,
  playing,
  status,
  played,
  duration,
  handleSeekMouseUp,
  handleSeekChange,
  currentBlock,
  url,
}: {
  handlePrev: any;
  handleNext: any;
  handlePlayPause: any;
  playing: boolean;
  status: string;
  played: number;
  duration: number;
  handleSeekMouseUp: any;
  handleSeekChange: any;
  currentBlock: any;
  url?: string;
}) {
  const [showConnectModal, setShowConnectModal] = useState(false);
  return (
    <div className={styles.player}>
      <Status status={status} />

      {currentBlock && (
        <Controls
          handlePrev={handlePrev}
          handlePlayPause={handlePlayPause}
          handleNext={handleNext}
          playing={playing}
        />
      )}

      <Seek
        block={currentBlock}
        played={played}
        duration={duration}
        handleSeekMouseUp={handleSeekMouseUp}
        handleSeekChange={handleSeekChange}
      />
      {url && (
        <a href={url} target={"_blank"} rel="noreferrer">
          🔗
        </a>
      )}
      {currentBlock && (
        <div style={{ position: "relative" }}>
          <div
            onClick={() => setShowConnectModal(true)}
            className={styles.connect}
          >
            connect {"\u2192"}
          </div>

          {showConnectModal && (
            <div className={styles.connectModalWrapper}>
              <ConnectModal
                setShowConnectModal={setShowConnectModal}
                block={currentBlock}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
