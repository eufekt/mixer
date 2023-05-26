import { useArena } from "@/src/hooks/useArena";
import useIsInViewport from "@/src/hooks/useIsInViewport";
import styles from "@/src/styles/ConnectModal.module.sass";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Loading } from "../../../Loading";
import { ArenaBlock, ArenaChannelMod } from "arena-ts";
import { Session } from "next-auth";
import { Title } from "./Title";
import { ConnectionConfirmation } from "./ConnectionConfirmation";

/**
 * TODO This component is big, it should be split
 */
export function Channels({
  setShowConnectModal,
  block,
  user,
}: {
  setShowConnectModal: any;
  block: ArenaChannelMod;
  user: Session["user"];
}) {
  const arena = useArena(user);
  const [selectedChannel, setSelectedChannel] =
    useState<ArenaChannelMod | null>();
  const [connectionConfirmation, setConnectionConfirmation] = useState<any>();
  const [connecting, setIsConnecting] = useState(false);
  const { data, isLoading, error, size, setSize } = arena.FetchUserChannels(
    user.id
  );
  const { trigger } = arena.ConnectBlockToChannel(selectedChannel?.id);
  const channels = useMemo(() => {
    return data ? data.flatMap((res) => res.channels) : [];
  }, [data]);
  const totalUsersChannels = data ? data[0].length : 0;
  const hasMore = channels.length < totalUsersChannels;
  const elementRef = useRef(null);
  const isInViewport = useIsInViewport(elementRef);

  function handleSelect(e: any, block: ArenaChannelMod) {
    e.preventDefault();
    e.stopPropagation();
    if (selectedChannel?.id === block.id) {
      setSelectedChannel(null);
    } else setSelectedChannel(block);
  }

  function autoClose() {
    return setTimeout(() => {
      setShowConnectModal(false);
    }, 3000);
  }

  async function handleConfirm(e: any) {
    e.preventDefault();
    e.stopPropagation();
    try {
      setIsConnecting(true);
      await trigger({
        blockId: block.id,
        blockType: block.base_class,
      });
      setConnectionConfirmation({
        component: (
          <ConnectionConfirmation
            message={`Connected successfully block to`}
            titleComponent={
              <Title
                title={selectedChannel?.title}
                status={selectedChannel?.status}
              />
            }
            autoClose={autoClose}
          />
        ),
      });
      setIsConnecting(false);
    } catch (e: any) {
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

  const colorState = (id: number) => {
    if (selectedChannel?.id === id) {
      return { backgroundColor: "purple" };
    }
  };

  return (
    <div className={styles.channelList}>
      <Loading
        isLoading={isLoading}
        what={"channels"}
        hideText
        type={"inline"}
        style={{ position: "absolute", right: 30 }}
      />
      {connectionConfirmation?.component == null && (
        <>
          {channels.map((block) => (
            <div
              style={{ ...colorState(block.id) }}
              onClick={(e) => handleSelect(e, block)}
              key={block.id}
              className={styles.channel}
            >
              <Title title={block.title} status={block.status} />
            </div>
          ))}
          {selectedChannel && (
            <div
              onClick={(e) => handleConfirm(e)}
              className={styles.comfirmationModal}
            >
              <div className={styles.wrapper}>
                <Loading
                  type={"inline"}
                  text="connecting"
                  isLoading={connecting}
                />
                {!connecting && (
                  <>
                    connect {"\u25FC"} {"\u2192"}
                    <Title
                      title={selectedChannel.title}
                      status={selectedChannel.status}
                      leftPadded
                    />
                  </>
                )}
              </div>
            </div>
          )}
          <div ref={elementRef}></div>
        </>
      )}
      {connectionConfirmation?.component}
    </div>
  );
}
