import "@/src/styles/Global.sass";
import { Analytics } from "@vercel/analytics/react";
import { useReducer, useState } from "react";
import PlaylistContext, {
  PlaylistContextInterface,
} from "../contexts/PlaylistContext";
import {
  playlistReducerInitialState,
  playlistReducer,
} from "../reducers/PlaylistReducer";
import Layout from "../components/Layout";
import Main from "../components/Main";
import ThemeContext from "../contexts/ThemeContext";
import Head from "next/head";
import {
  channelHistoryReducer,
  channelHistoryReducerInitialState,
} from "../reducers/ChannelHistoryReducer";
import ChannelHistoryContext, {
  ChannelHistoryContextInterface,
} from "../contexts/ChannelHistoryContext";

export default function App({
  Component,
  pageProps,
}: {
  Component: any;
  pageProps: { [key: string]: any };
}) {
  const [isDark, setIsDark] = useState<boolean>(true);
  const [playlist, playlistDispatch] = useReducer(
    playlistReducer,
    playlistReducerInitialState
  );

  const [channelHistory, channelHistoryDispatch] = useReducer(
    channelHistoryReducer,
    channelHistoryReducerInitialState
  );
  const playlistProviderState = {
    playlist,
    playlistDispatch,
  } as PlaylistContextInterface;

  const historyProviderState = {
    channelHistory,
    channelHistoryDispatch,
  } as ChannelHistoryContextInterface;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="mixer" />
        <title>Mixer</title>
        <meta property="og:description" content="Blocks playback for are.na" />
        <meta name="description" content="Blocks playback for are.na" />
        {/* <meta property="og:image" content="https://example.com/mixer-thumbnail.jpg"/> */}
        <meta property="og:url" content="https://www.arena-mixer.com/" />
        <link rel="canonical" href="https://www.arena-mixer.com/" />
        <meta property="og:type" content="music.playlist" />
        <meta property="og:site_name" content="mixer" />
      </Head>
      <Analytics />
      <ThemeContext.Provider value={{ isDark, setIsDark }}>
        <div className={isDark ? "dark-mode" : ""}>
          <PlaylistContext.Provider value={playlistProviderState}>
            <ChannelHistoryContext.Provider value={historyProviderState}>
              <Main>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </Main>
            </ChannelHistoryContext.Provider>
          </PlaylistContext.Provider>
        </div>
      </ThemeContext.Provider>
    </>
  );
}
