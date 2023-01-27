import ReactPlayer from "react-player";
import styles from "@/src/styles/Player.module.sass";
import { useEffect, useRef, useState } from "react";

/**
 * @param {playlist} list of blocks
 * @returns
 */
export default function Player({ playlist }) {
  const player = useRef(null);
  const playlistLength = playlist.length;

  const [currentTrack, setCurrentTrack] = useState(playlist[0]);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [played, setPlayed] = useState(0);
  const [loaded, setLoaded] = useState(0);
  const [seeking, setSeeking] = useState(false);

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

  useEffect(() => {
    if (ready) setPlaying(true);
  }, [ready]);

  function handlePlayPause() {
    setPlaying(!playing);
  }

  function handlePlay() {
    setPlaying(true);
  }
  function handlePause() {
    setPlaying(false);
  }

  function handleEnded() {
    console.log("handleEnded");
  }
  function handleProgress(e) {
    setPlayed(e.played);
    setLoaded(e.loaded);
  }
  function handleDuration() {
    console.log("handleDuration");
  }
  function selectTrack(i) {
    setCurrentTrack(playlist[i]);
  }

  function handleNext(i) {
    if (i < playlistLength) {
      // here
    }
  }

  function parse(url) {
    if (url.includes("youtube")) return url.split("&")[0];
    return url;
  }

  const playerLoading = currentTrack && !ready;
  const color = currentTrack ? (playerLoading ? "orange" : "green") : "grey";
  const url = parse(currentTrack.source.url);

  return (
    <>
      {currentTrack && (
        <div style={{ color }}>{ready ? "ready" : "loading"}</div>
      )}

      <div>
        <input
          type="range"
          min={0}
          max={0.999999}
          // width={"500px"}
          step="any"
          value={played}
          onMouseDown={handleSeekMouseDown}
          onChange={handleSeekChange}
          onMouseUp={handleSeekMouseUp}
        />
      </div>

      <div>
        <progress max={1} value={loaded}></progress>
      </div>
      <ReactPlayer
        ref={player}
        url={url}
        playing={playing}
        loop={false}
        volume={1}
        muted={false}
        onPlay={handlePlay}
        onPause={handlePause}
        onEnded={handleEnded}
        onProgress={handleProgress}
        onDuration={handleDuration}
        onReady={() => setReady(true)}
        onStart={() => console.log("onStart")}
        onBuffer={() => console.log("onBuffer")}
        onSeek={(e) => console.log("onSeek", e)}
        onError={(e) => console.log("onError", e)}
      />
      <button onClick={handlePlayPause} className={styles.playerButton}>
        {playing ? "pause" : "play"}
      </button>
      <div style={{ display: "flex" }}>
        {playlist.map((block, i) => (
          <Block key={block.id} i={i} block={block} selectTrack={selectTrack} />
        ))}
      </div>
    </>
  );
}

function Block({ block, selectTrack, i }) {
  return (
    <div style={{ display: "flex", alignItems: "center", padding: 10 }}>
      <img
        alt={"image"}
        onClick={() => selectTrack(i)}
        style={{ width: "40px" }}
        src={block.image.square.url}
      ></img>
    </div>
  );
}
