import { ArenaBlock } from "arena-ts";
import { createContext, useContext } from "react";

export interface PlaylistContextInterface {
  playlist: {list: ArenaBlock[]};
  playlistDispatch: any;
}

const PlaylistContext = createContext<PlaylistContextInterface|null>(null);

export function usePlaylistContext() {
  return useContext(PlaylistContext);
}

export default PlaylistContext;
