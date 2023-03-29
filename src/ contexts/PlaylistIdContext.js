import { createContext, useContext } from "react";

const PlaylistIdContext = createContext();

export function usePlaylistIdContext() {
  return useContext(PlaylistIdContext);
}

export default PlaylistIdContext;
