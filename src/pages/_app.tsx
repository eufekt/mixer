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
import Head from "next/head";

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
    <>  
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:title" content="Mixer ~"/>
      <title>Mixer - Music Block Playlist</title>
      <meta property="og:description" content="Enjoy a curated collection of music blocks on Mixer, powered by Are.na."/>
      <meta name="description" content="Enjoy a curated collection of music blocks on Mixer, powered by Are.na."/>
      {/* <meta property="og:image" content="https://example.com/mixer-thumbnail.jpg"/> */}
      <meta property="og:url" content="https://www.arena-mixer.com/"/>
      <link rel="canonical" href="https://www.arena-mixer.com/"/>
      <meta property="og:type" content="music.playlist"/>
      <meta property="og:site_name" content="Mixer"/>
    </Head>
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
    </>
  );
}
