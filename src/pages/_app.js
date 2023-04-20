import "@/src/styles/Global.sass";
import { useReducer } from "react";
import PlaylistContext from "../ contexts/PlaylistContext";
import {
  playlistReducerInitialState,
  playlistReducer,
} from "../reducers/PlaylistReducer";

export default function App({ Component, pageProps }) {
  const [playlist, playlistDispatch] = useReducer(
    playlistReducer,
    playlistReducerInitialState
  );

  const playlistProviderState = {
    playlist,
    playlistDispatch,
  };

  return (
    <PlaylistContext.Provider value={playlistProviderState}>
      <Component {...pageProps} />
    </PlaylistContext.Provider>
  );
}
