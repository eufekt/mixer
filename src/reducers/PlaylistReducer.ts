/**
 * list: array of playable are.na blocks
 */

export const playlistReducerInitialState = {
    list: [],
    history: [],
    cursor: null,
    track: null,
};
export const playlistActions = {
    setList: "setList",
    next: "next",
    prev: "prev",
};

export function playlistReducer(state: Object, action: any) {
    switch (action.type) {
        case playlistActions.setList:
            return setList(state, action);
        case playlistActions.next:
            return next(state);
        case playlistActions.prev:
            return prev(state);
        default:
            return { ...state };
    }
}

function setList(state: any, action: any) {
    const list = action.list;
    const cursor = 0;
    const track = list[cursor];
    return { ...state, list, cursor, track };
}

function next(state: any) {
    const history = [...state.history, state.track];
    const nextCursor = getNextCursorPosition(state.cursor, state.list.length);
    const nextTrack = state.list[nextCursor];
    return { ...state, cursor: nextCursor, track: nextTrack, history };
}

function prev(state: any) {
    const history = [...state.history, state.track];
    const prevCursor = getPrevCursorPosition(state.cursor, state.list.length);
    const prevTrack = state.list[prevCursor];
    return { ...state, cursor: prevCursor, track: prevTrack, history };
}
// helpers
function getNextCursorPosition(index, listLength) {
    if (index < listLength - 1) {
        return index + 1;
    } else {
        return 0;
    }
}

function getPrevCursorPosition(index, listLength) {
    if (index > 0) {
        return index - 1;
    } else {
        return listLength - 1;
    }
}

function pushToHistory() {}
