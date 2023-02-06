import ReactPlayer from "react-player";
import styles from "@/src/styles/Player.module.sass";
import { useEffect, useReducer, useRef, useState } from "react";
import Seek from "./Seek";
import Status, { STATUS_ENUM } from "./Status";
import { Controls } from "./Controls";
import { Preview } from "./Preview";
import { ChanelExplorer } from "../ChanelExplorer";
import { BlocksExplorer } from "../BlocksExplorer";

/**
 * @param {playlist} list of blocks
 * TODO: too many state refreshes that causes rerenders down the tree
 * @returns
 */
export default function Player({ playlist }) {
  const player = useRef(null);
  const playlistLength = playlist.length;

  const [currentTrack, setCurrentTrack] = useState();
  const [url, setUrl] = useState();

  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [played, setPlayed] = useState(0);
  const [loaded, setLoaded] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seeking, setSeeking] = useState(false);

  useEffect(() => {
    if (ready) setPlaying(true);
  }, [ready]);

  useEffect(() => {
    if (currentTrack != null) setUrl(parse(playlist[currentTrack].source.url));
  }, [currentTrack]);

  function handleSeekChange(e) {
    setPlayed(parseFloat(e.target.value));
  }

  function handleSeekMouseDown(e) {
    setSeeking(true);
  }

  function handleSeekMouseUp(e) {
    setSeeking(false);
    player.current.seekTo(parseFloat(e.target.value));
  }

  function handlePlayPause() {
    if (currentTrack == null) setCurrentTrack(0);
    setPlaying(!playing);
  }

  function handleProgress(e) {
    setPlayed(e.played);
    setLoaded(e.loaded);
  }

  function handleEnded() {
    handleNext(currentTrack);
  }
  function selectTrack(i) {
    preparePlayerAndSet(i);
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
    if (url.includes("youtube")) return url.split("&")[0];
    return url;
  }

  const status =
    currentTrack != null
      ? ready
        ? STATUS_ENUM.ready
        : STATUS_ENUM.loading
      : STATUS_ENUM.idle;

  const title = playlist[currentTrack]?.title || STATUS_ENUM.idle;

  return (
    <div className={styles.container}>
      <title>{title}</title>
      <div className={styles.player}>
        <Status status={status} />
        <Preview block={playlist[currentTrack]} />
        <Seek
          played={played}
          duration={duration}
          loaded={loaded}
          handleSeekMouseUp={handleSeekMouseUp}
          handleSeekMouseDown={handleSeekMouseDown}
          handleSeekChange={handleSeekChange}
        />
        <div>{title}</div>
        <Controls
          handlePrev={handlePrev}
          handlePlayPause={handlePlayPause}
          handleNext={handleNext}
          currentTrack={currentTrack}
          playing={playing}
        />
        <a href={url} target={"_blank"} rel="noreferrer">
          src 🔗
        </a>
      </div>
      <BlocksExplorer
        playlist={playlist}
        selectTrack={selectTrack}
        currentTrack={currentTrack}
      />
      <ChanelExplorer />
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
    </div>
  );
}
