"use client";

import { useReducer, useState, ReactNode } from "react";
import PlaylistContext, {
  PlaylistContextInterface,
} from "../contexts/PlaylistContext";
import {
  playlistReducerInitialState,
  playlistReducer,
} from "../reducers/PlaylistReducer";
import ThemeContext from "../contexts/ThemeContext";
import {
  channelHistoryReducer,
  channelHistoryReducerInitialState,
} from "../reducers/ChannelHistoryReducer";
import ChannelHistoryContext, {
  ChannelHistoryContextInterface,
} from "../contexts/ChannelHistoryContext";

export function Providers({ children }: { children: ReactNode }) {
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
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      <div className={isDark ? "dark-mode" : ""}>
        <PlaylistContext.Provider value={playlistProviderState}>
          <ChannelHistoryContext.Provider value={historyProviderState}>
            {children}
          </ChannelHistoryContext.Provider>
        </PlaylistContext.Provider>
      </div>
    </ThemeContext.Provider>
  );
}
