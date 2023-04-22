/**
 * list: array of playable are.na blocks
 */
export const playlistReducerInitialState = {
  list: [],
  selection: false,
  initiated: false,
};

export function playlistReducer(state, action) {
  switch (action.type) {
    case "setPlaylist":
      return {
        ...state,
        list: action.list,
      };
    default:
      return { ...state };
  }
}
