const initialState = { list: [] };

export function playlistReducer(state = initialState, action) {
  switch (action.type) {
    case "setPlaylist":
      return { ...state, list: action.list };
    default:
      return { ...state };
  }
}
