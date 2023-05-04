import "@/src/styles/Global.sass";

import { useReducer, useState } from "react";
import PlaylistContext from "../contexts/PlaylistContext";
import { SessionProvider } from "next-auth/react";
import {
  playlistReducerInitialState,
  playlistReducer,
} from "../reducers/PlaylistReducer";
import Layout from "../components/Layout";
import Main from "../components/Main";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [isDark, setIsDark] = useState(false);

  const [playlist, playlistDispatch] = useReducer(
    playlistReducer,
    playlistReducerInitialState
  );

  const playlistProviderState = {
    playlist,
    playlistDispatch,
  };

  return (
    // TODO: add dark mode
    <div className={isDark ? "dark-mode" : ""}>
      <SessionProvider session={session}>
        <PlaylistContext.Provider value={playlistProviderState}>
          <Main>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Main>
        </PlaylistContext.Provider>
      </SessionProvider>
    </div>
  );
}
