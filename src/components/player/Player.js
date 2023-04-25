import ReactPlayer from "react-player";
import { useEffect, useRef, useState } from "react";
import { STATUS_ENUM } from "./Status";

import { usePlaylistContext } from "@/src/contexts/PlaylistContext";
import { useHasWindow } from "@/src/hooks/useHasWindow";
import { PlayerUI } from "./PlayerUI";
import { massageUrl } from "@/src/lib/helpers";

export default function Player() {
  const hasWindow = useHasWindow();
  const player = useRef(null);

  const { playlist, playlistDispatch } = usePlaylistContext();
  const playlistLength = playlist.list.length;

  const [currentTrack, setCurrentTrack] = useState(0);
  const currentBlock = playlist.list[currentTrack] || null;
  const url = massageUrl(currentBlock?.source.url);

  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (ready) {
      setPlaying(true);
    }
  }, [ready, playlist]);

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
    setPlaying(!playing);
  }

  function handleProgress(e) {
    /**
     * TODO: causes rerenders
     */
    setPlayed(e.played);
  }

  function handleEnded() {
    handleNext();
  }

  function handleNext() {
    setReady(false);
    if (currentTrack < playlistLength - 1) {
      setCurrentTrack(currentTrack + 1);
    } else {
      setCurrentTrack(0);
    }
  }

  function handlePrev() {
    setReady(false);
    if (currentTrack > 0) {
      setCurrentTrack(currentTrack - 1);
    } else {
      setCurrentTrack(playlistLength - 1);
    }
  }

  function getStatus() {
    if (url) {
      return ready ? STATUS_ENUM.ready : STATUS_ENUM.loading;
    } else return STATUS_ENUM.idle;
  }

  let status = getStatus();

  function handleError(e) {
    console.log("Error in PLayer", e);
    handleNext();
  }

  return (
    <>
      <PlayerUI
        status={status}
        played={played}
        playing={playing}
        duration={duration}
        handleNext={handleNext}
        handlePrev={handlePrev}
        handlePlayPause={handlePlayPause}
        handleSeekChange={handleSeekChange}
        handleSeekMouseUp={handleSeekMouseUp}
        currentBlock={currentBlock}
        url={url}
      />
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
          // handle diffrent errors
          onError={(e) => handleError(e)}
        />
      )}
    </>
  );
}
