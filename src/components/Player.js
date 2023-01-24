import ReactPlayer from "react-player";
import styles from "@/src/styles/Player.module.sass";
import { useEffect, useRef, useState } from "react";

export default function Player({ url }) {
  const player = useRef(null);
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
    console.log("handlePlayPause");
    setPlaying(!playing);
  }

  function handlePlay() {
    console.log("handlePlay");
    setPlaying(true);
  }
  function handlePause() {
    console.log("handlePause");
    setPlaying(false);
  }

  function handleEnded() {
    console.log("handleEnded");
  }
  function handleProgress(e) {
    setPlayed(e.played);
    setLoaded(e.loaded);
  }
  const handleDuration = () => {
    console.log("handleDuration");
  };

  const playerLoading = url && !ready;
  const color = url ? (playerLoading ? "orange" : "green") : "grey";
  return (
    <>
      <div>{url ? url : "no track selected"}</div>
      {url && <div style={{ color }}>{ready ? "ready" : "loading"}</div>}

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
    </>
  );
}
