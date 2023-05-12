import { useUserContext } from "@/src/contexts/UserContext";
import styles from "@/src/styles/ConnectModal.module.sass";
import { signIn } from "next-auth/react";
import { ArenaBlock } from "arena-ts";
import { Channels } from "./ShowChannels";

export function ConnectDialog({
  focus,
  showConnectModal,
  setShowConnectModal,
  block,
}: {
  focus: boolean;
  showConnectModal: boolean;
  setShowConnectModal: any;
  block: ArenaBlock;
}) {
  function handleConnect(e: any) {
    e.preventDefault();
    setShowConnectModal(true);
  }

  return (
    <>
      {focus && !showConnectModal && (
        <div onClick={(e) => handleConnect(e)} className={styles.connect}>
          connect {"\u2192"}
        </div>
      )}
      {showConnectModal && (
        <div style={{ height: "100%" }}>
          <ConnectModal
            setShowConnectModal={setShowConnectModal}
            block={block}
          />
        </div>
      )}
    </>
  );
}

/**
 * TODO what if a user has no channels ?
 * > add abilty to create channel on the spot
 *  */
export function ConnectModal({
  setShowConnectModal,
  block,
}: {
  setShowConnectModal: any;
  block: ArenaBlock;
}) {
  const user = useUserContext();

  return (
    <div
      className={styles.connectModalWrapper}
      onClick={(e) => e.preventDefault()}
    >
      <div
        className={styles.close}
        onClick={(e) => {
          e.preventDefault();
          setShowConnectModal(false);
        }}
      >
        <>&#x2715;</>
      </div>
      {user && (
        <Channels
          user={user}
          block={block}
          setShowConnectModal={setShowConnectModal}
        />
      )}
      {!user && (
        <div
          className={styles.signin}
          onClick={(e) => {
            e.preventDefault();
            signIn("arena");
          }}
        >
          login to connect
        </div>
      )}
    </div>
  );
}
