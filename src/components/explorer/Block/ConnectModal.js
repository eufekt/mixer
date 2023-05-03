import { useUserContext } from "@/src/contexts/UserContext";
import { useArena } from "@/src/hooks/useArena";
import useIsInViewport from "@/src/hooks/useIsInViewport";
import styles, {
  color_text,
  color_green,
  color_red,
} from "@/src/styles/ConnectModal.module.sass";
import { signIn } from "next-auth/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Loading } from "../../Loading";
/**
 * TODO what if a user has no channels ?
 * > add abilty to create channel on the spot
 *  */
export function ConnectModal({ setShowConnectModal, block }) {
  const user = useUserContext();

  return (
    <div className={styles.connectModalWrapper}>
      <div className={styles.close} onClick={() => setShowConnectModal(false)}>
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
        <button className={styles.signin} onClick={() => signIn("arena")}>
          login to connect
        </button>
      )}
    </div>
  );
}

function Channels({ setShowConnectModal, block, user }) {
  const arena = useArena(user);
  const [selectedChannel, setSelectedChannel] = useState();
  const [connectionConfirmation, setConnectionConfirmation] = useState();
  const [connecting, setIsConnecting] = useState(false);
  const { trigger } = arena.ConnectBlockToChannel(selectedChannel?.id);

  function handleSelect(block) {
    if (selectedChannel?.id === block.id) {
      setSelectedChannel(null);
    } else setSelectedChannel(block);
  }

  function autoClose() {
    return setTimeout(() => {
      setShowConnectModal(false);
    }, 3000);
  }

  async function handleConfirm() {
    try {
      setIsConnecting(true);

      await trigger({
        blockId: block.id,
        blockType: "Block",
      });
      setConnectionConfirmation({
        component: (
          <ConnectionConfirmation
            message={`Connected successfully block to channel`}
            autoClose={autoClose}
          />
        ),
      });
      setIsConnecting(false);
    } catch (e) {
      setConnectionConfirmation({
        component: (
          <ConnectionConfirmation
            message={`There was an error connecting the block to the channel`}
            errorMessage={e.message}
            errorStatus={e.status}
          />
        ),
      });
      setIsConnecting(false);
    }
  }

  const { data, isLoading, error, size, setSize } = arena.FetchUserChannels(
    user.id
  );

  const channels = useMemo(() => {
    return data ? data.flatMap((res) => res.channels) : [];
  }, [data]);
  const totalUsersChannels = data ? data[0].length : 0;
  const hasMore = channels.length < totalUsersChannels;

  const elementRef = useRef();
  const isInViewport = useIsInViewport(elementRef);

  const increasePageSize = useCallback(() => {
    setSize(size + 1);
  }, [setSize, size]);

  useEffect(() => {
    if (isInViewport && !isLoading && hasMore) {
      increasePageSize();
    }
  }, [hasMore, increasePageSize, isInViewport, isLoading]);

  useEffect(() => {
    if (error) {
      setConnectionConfirmation({
        component: (
          <ConnectionConfirmation
            message={"There was an error fetching user channels"}
            errorMessage={error.message}
            errorStatus={error.status}
          />
        ),
      });
    }
  }, [error]);

  const colorState = (id) => {
    if (selectedChannel?.id === id) {
      return { backgroundColor: "purple" };
    }
  };

  return (
      <div className={styles.channelList}>
      <Loading isLoading={isLoading} what={"channels"} hideText type={"inline"} style={{position: "absolute", right: 30}} />
        {connectionConfirmation && connectionConfirmation.component}
        {!connectionConfirmation && (
          <>
            {channels.map((block) => (
              <div
                style={{ ...colorState(block.id) }}
                onClick={() => handleSelect(block)}
                key={block.id}
                className={styles.channel}
              >
                <Title title={block.title} status={block.status} />
              </div>
            ))}
            {selectedChannel && (
              <div onClick={handleConfirm} className={styles.comfirmationModal}>
                <div className={styles.wrapper}>
                  <Loading type={"inline"} text="connecting" isLoading={connecting}/>
                  {!connecting && (
                    <>
                      connect {"\u25FC"} {"\u2192"}
                      <Title
                        title={selectedChannel.title}
                        status={selectedChannel.status}
                      />
                    </>
                  )}
                </div>
              </div>
            )}
            <div ref={elementRef}></div>
          </>
        )}
      </div>
  );
}

function ConnectionConfirmation({
  message,
  errorMessage,
  errorStatus,
  autoClose,
}) {
  useEffect(() => {
    let timer;
    if (autoClose) {
      timer = autoClose();
    }

    return () => clearTimeout(timer);
  }, [autoClose]);

  return (
    <div className={styles.ConnectionState}>
      <div>{message}</div>
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

function Title({ title, status }) {
  let color = color_text;
  if (status === "public") {
    color = color_green;
  } else if (status === "private") {
    color = color_red;
  }
  return <div style={{ color, paddingLeft: "7px" }}>{` ${title}`}</div>;
}
