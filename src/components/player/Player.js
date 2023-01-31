import ReactPlayer from "react-player";
import styles from "@/src/styles/Player.module.sass";
import { useEffect, useRef, useState } from "react";
import Block from "../Block";
import Seek from "./Seek";
import Status, { STATUS_ENUM } from "./Status";
import { Controls } from "./Controls";
import { Preview } from "./Preview";

/**
 * @param {playlist} list of blocks
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

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100vw",
        margin: "auto",
      }}
    >
      <div style={{ position: "fixed", top: 0, height: "50vh" }}>
        <Status status={status} />
        <Seek
          played={played}
          loaded={loaded}
          handleSeekMouseUp={handleSeekMouseUp}
          handleSeekMouseDown={handleSeekMouseDown}
          handleSeekChange={handleSeekChange}
        />
        <Preview block={playlist[currentTrack]} />

        <Controls
          handlePrev={handlePrev}
          handlePlayPause={handlePlayPause}
          handleNext={handleNext}
          currentTrack={currentTrack}
          playing={playing}
        />
      </div>
      <div
        style={{
          display: "flex",
          width: "100",
          flexWrap: "wrap",
          marginTop: "100px",
          top: 0,
          paddingTop: 100,
          // justifyContent: "",
        }}
      >
        {playlist.map((block, i) => (
          <Block
            key={block.id}
            i={i}
            block={block}
            selectTrack={selectTrack}
            currentTrack={currentTrack}
          />
        ))}
      </div>
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
        onProgress={handleProgress}
        onReady={() => setReady(true)}
        onError={(e) => console.log("onError", e)}
      />
    </div>
  );
}
