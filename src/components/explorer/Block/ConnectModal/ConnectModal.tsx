import { useUserContext } from "@/src/contexts/UserContext";
import styles from "@/src/styles/ConnectModal.module.sass";
import { signIn } from "next-auth/react";
import { ArenaBlock, ArenaChannelMod } from "arena-ts";
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
    block: ArenaBlock | ArenaChannelMod;
}) {
    function handleConnect(e: any) {
        e.preventDefault();
        e.stopPropagation();
        setShowConnectModal(true);
    }

    return (
        <>
            {focus && !showConnectModal && (
                <div
                    onClick={(e) => handleConnect(e)}
                    className={styles.connect}>
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
    block: ArenaBlock | ArenaChannelMod;
}) {
    const user = useUserContext();

    return (
        <div
            className={styles.connectModalWrapper}
            onClick={(e) => e.preventDefault()}>
            <CloseButton setShowConnectModal={setShowConnectModal} />
            {user && (
                <Channels
                    user={user}
                    block={block as ArenaChannelMod}
                    setShowConnectModal={setShowConnectModal}
                />
            )}
            {!user && <LoginToConnect signIn={signIn} />}
        </div>
    );
}
const LoginToConnect = ({ signIn }: any) => {
    return (
        <div
            className={styles.signin}
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                signIn("arena");
            }}>
            login to connect
        </div>
    );
};

const CloseButton = ({ setShowConnectModal }: any) => {
    const closeIcon = <>&#x2715;</>;
    return (
        <div
            className={styles.close}
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowConnectModal(false);
            }}>
            {closeIcon}
        </div>
    );
};
