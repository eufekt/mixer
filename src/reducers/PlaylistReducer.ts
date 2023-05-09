/**
 * list: array of playable are.na blocks
 */
export const playlistReducerInitialState = {
  list: [],
};

export function playlistReducer(state: Object, action:any) {
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
