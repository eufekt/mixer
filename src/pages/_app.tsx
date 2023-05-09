import "@/src/styles/Global.sass";

import { useEffect, useReducer, useState } from "react";
import PlaylistContext, { PlaylistContextInterface } from "../contexts/PlaylistContext";
import { SessionProvider } from "next-auth/react";
import {
  playlistReducerInitialState,
  playlistReducer,
} from "../reducers/PlaylistReducer";
import Layout from "../components/Layout";
import Main from "../components/Main";
import ThemeContext from "../contexts/ThemeContext";
import useHasWindow from "../hooks/useHasWindow";
import { Session } from "next-auth";

export default function App({
  Component,
  pageProps: { session, ...pageProps }
}: { Component: any; pageProps: { session: Session, [key: string]: any }}) {
  const [isDark, setIsDark] = useState<boolean>(false);
  const hasWindow = useHasWindow();

  useEffect(() => {
    if (
      hasWindow &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setIsDark(true);
    }
  }, [hasWindow]);

  const [playlist, playlistDispatch] = useReducer(
    playlistReducer,
    playlistReducerInitialState
  );

  const playlistProviderState = {
    playlist,
    playlistDispatch,
  } as PlaylistContextInterface

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
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
    </ThemeContext.Provider>
  );
}
