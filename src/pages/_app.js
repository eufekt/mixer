import "@/src/styles/globals.sass";
import { useReducer } from "react";
import PlaylistContext from "../ contexts/PlaylistContext";
import { playlistReducer } from "../reducers/PlaylistReducer";

export default function App({ Component, pageProps }) {
  const [playlistState, playlistDispatch] = useReducer(playlistReducer);

  const providerState = {
    playlistState,
    playlistDispatch,
  };

  return (
    <PlaylistContext.Provider value={providerState}>
      <Component {...pageProps} />
    </PlaylistContext.Provider>
  );
}
