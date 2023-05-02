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
/**
 * TODO what if a user has no channels ?
 *  */
export function ConnectModal({ setShowConnectModal, block }) {
  const user = useUserContext();

  return (
    <div className={styles.connectModalWrapper}>
      {user && (
        <>
          <div
            className={styles.close}
            onClick={() => setShowConnectModal(false)}
          >
            <>&#x2715;</>
          </div>
          <Channels user={user} block={block} setShowConnectModal={setShowConnectModal} />
        </>
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
  const { isMutating, trigger } = arena.ConnectBlockToChannel(
    selectedChannel?.id
  );

  function handleSelect(block) {
    if (selectedChannel?.id === block.id) {
      setSelectedChannel(null);
    } else setSelectedChannel(block);
  }

  async function handleConfirm() {
    try {
      const result = await trigger({
        blockId: block.id,
        blockType: "Block",
      });
      console.log("result", result);
    } catch (e) {
      console.log("error", e.status, e.message);
    }
    setShowConnectModal(false);
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

  if (error) console.log(error);

  const colorState = (id) => {
    if (selectedChannel?.id === id) {
      return { backgroundColor: "purple" };
    }
  };

  return (
    <div className={styles.channelList}>
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
      {isLoading && <div>loading...</div>}
      {selectedChannel && (
        <div onClick={handleConfirm} className={styles.comfirmationModal}>
          <div className={styles.wrapper}>
            connect {"\u25FC"} {"\u2192"}
            <Title
              title={selectedChannel.title}
              status={selectedChannel.status}
            />
          </div>
        </div>
      )}
      <div ref={elementRef}></div>
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
