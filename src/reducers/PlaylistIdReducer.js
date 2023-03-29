export function playlistIdReducer(state, action) {
  switch (action.type) {
    case "setPlaylistId":
      return { ...state, id: action.id };
    default:
      return { ...state };
  }
}
