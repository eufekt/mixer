import { createContext, useContext } from "react";

const PlaylistContext = createContext();

export function usePlaylistContext() {
  return useContext(PlaylistContext);
}

export default PlaylistContext;
