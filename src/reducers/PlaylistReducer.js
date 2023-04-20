/**
 * list: array of playable are.na blocks
 * selection: boolean, true if the playlist was created from a selection
 */
export const playlistReducerInitialState = {
  list: [],
  selection: false,
  initiated: false,
};

export function playlistReducer(state, action) {
  switch (action.type) {
    case "setPlaylist":
      let initiated = action.selection || false;
      return {
        ...state,
        list: action.list,
        selection: action.selection,
        initiated,
      };
    case "userPressedPlay":
      return { ...state, initiated: true };
    default:
      return { ...state };
  }
}
