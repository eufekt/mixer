import ReactPlayer from "react-player";
import styles from "@/src/styles/Player.module.sass";
import { useEffect, useRef, useState } from "react";
import Seek from "./Seek";
import Status, { STATUS_ENUM } from "./Status";
import { Controls } from "./Controls";
import { usePlaylistContext } from "@/src/ contexts/PlaylistContext";

export default function Player() {
  /**TODO extract to hook */
  const [hasWindow, setHasWindow] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, []);

  const player = useRef(null);

  const { playlist } = usePlaylistContext();
  const playlistLength = playlist?.list.length || 0;

  const [currentTrack, setCurrentTrack] = useState(0);
  // console.log(playlist)
  const url = parse(playlist?.list[currentTrack]?.source.url);

  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (ready) setPlaying(true);
  }, [ready]);

  useEffect(() => {
    setCurrentTrack(0);
    setReady(false);
  }, [playlist]);

  function handleSeekChange(e) {
    setPlayed(parseFloat(e.target.value));
  }

  function handleSeekMouseUp(e) {
    player.current.seekTo(parseFloat(e.target.value));
  }

  function handlePlayPause() {
    if (currentTrack == null) setCurrentTrack(0);
    setPlaying(!playing);
  }

  /**
   * TODO: heavy rerenders
   */
  function handleProgress(e) {
    setPlayed(e.played);
  }

  function handleEnded() {
    handleNext(currentTrack);
  }

  function preparePlayerAndSet(i) {
    setReady(false);
    setCurrentTrack(i);
  }

  function handleNext(i) {
    if (i < playlistLength - 1) {
      preparePlayerAndSet(i + 1);
    } else {
      preparePlayerAndSet(0);
    }
  }

  function handlePrev(i) {
    if (i > 0) {
      preparePlayerAndSet(i - 1);
    } else {
      preparePlayerAndSet(playlistLength - 1);
    }
  }

  function parse(url) {
    if (url === undefined) return undefined;
    if (url.includes("youtube")) {
      return url.split("&")[0];
    } else return url;
  }

  function getStatus() {
    if (url) {
      return ready ? STATUS_ENUM.ready : STATUS_ENUM.loading;
    } else return STATUS_ENUM.idle;
  }

  let status = getStatus();
  const currentBlock = playlist?.list[currentTrack] || null;

  return (
    <>
      <div className={styles.player}>
        <div className={styles.controls}>
          <Status status={status} />
          <Controls
            handlePrev={handlePrev}
            handlePlayPause={handlePlayPause}
            handleNext={handleNext}
            currentTrack={currentTrack}
            playing={playing}
          />
        </div>
        <Seek
          block={currentBlock}
          played={played}
          duration={duration}
          handleSeekMouseUp={handleSeekMouseUp}
          // handleSeekMouseDown={handleSeekMouseDown}
          handleSeekChange={handleSeekChange}
        />
        {url && (
          <a className={styles.a} href={url} target={"_blank"} rel="noreferrer">
            🔗
          </a>
        )}
      </div>
      {hasWindow && url && (
        <ReactPlayer
          ref={player}
          url={url}
          playing={playing}
          loop={false}
          volume={1}
          muted={false}
          width={"0px"}
          height={"0px"}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={handleEnded}
          onDuration={setDuration}
          onProgress={handleProgress}
          onReady={() => setReady(true)}
          onError={(e) => console.log("onError", e)}
        />
      )}
    </>
  );
}
