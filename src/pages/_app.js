import "@/src/styles/Global.sass";
import { useReducer } from "react";
import PlaylistContext from "../ contexts/PlaylistContext";
import { playlistReducer } from "../reducers/PlaylistReducer";

export default function App({ Component, pageProps }) {
  // const [playlistIdState, playlistIdDispatch] = useReducer(playlistIdReducer);
  const [playlist, playlistDispatch] = useReducer(playlistReducer);

  // const playlistIdProviderState = {
  //   playlistId,
  //   playlistIdDispatch,
  // };


  const playlistProviderState = {
    playlist,
    playlistDispatch,
  };

  return (
    // <PlaylistIdContext.Provider value={playlistIdProviderState}>
    <PlaylistContext.Provider value={playlistProviderState}>
      <Component {...pageProps} />
    </PlaylistContext.Provider>
    // </PlaylistIdContext.Provider>
  );
}
