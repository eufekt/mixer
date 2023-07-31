import ReactPlayer from "react-player";
import { useEffect, useRef, useState } from "react";

import {
    usePlaylistContext,
} from "@/src/contexts/PlaylistContext";
import useHasWindow from "@/src/hooks/useHasWindow";
import { PlayerUI } from "./PlayerUI";
import { massageUrl } from "@/src/lib/helpers";
import { getStatus } from "./utils";
import { playlistActions } from "@/src/reducers/PlaylistReducer";

export default function Player() {
    const hasWindow = useHasWindow();
    const player = useRef(null);
    const { playlist, playlistDispatch } = usePlaylistContext();

    const { track } = playlist;
    const url = massageUrl(track?.source.url);

    const [playing, setPlaying] = useState(false);
    const [ready, setReady] = useState(false);
    const [played, setPlayed] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(80);

    let status = getStatus(url, ready);

    useEffect(() => {
        if (ready) {
            setPlaying(true);
        }
    }, [ready, track]);

    function handleSeekChange(e: any) {
        setPlayed(parseFloat(e.target.value));
    }

    function handleSeekMouseUp(e: any) {
        // @ts-ignore
        player.current.seekTo(parseFloat(e.target.value));
    }

    function handlePlayPause() {
        setPlaying(!playing);
    }

    function handleProgress(e: any) {
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
        playlistDispatch({ type: playlistActions.next });
    }

    function handlePrev() {
        setReady(false);
        playlistDispatch({ type: playlistActions.prev});
    }

    function handleError(e: any) {
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
                currentBlock={track}
                url={url}
                volume={volume}
                setVolume={setVolume}
            />
            {hasWindow && url && (
                <ReactPlayer
                    ref={player}
                    url={url}
                    playing={playing}
                    loop={false}
                    volume={volume / 100}
                    muted={false}
                    width={"0px"}
                    height={"0px"}
                    onPlay={() => setPlaying(true)}
                    onPause={() => setPlaying(false)}
                    onEnded={handleEnded}
                    onDuration={setDuration}
                    onProgress={handleProgress}
                    onReady={() => setReady(true)}
                    onError={(e) => handleError(e)}
                />
            )}
        </>
    );
}
