import { ChannelHistoryInterface } from "../contexts/ChannelHistoryContext";

/**
 * list: array of playable are.na blocks
 */
export const channelHistoryReducerInitialState = {
    list: [],
  };

interface ChannelHistoryState {
    list: ChannelHistoryInterface[];
}
  
  export function channelHistoryReducer(state: ChannelHistoryState, action:any) {
    switch (action.type) {
      case "pushToHistory":
        return {
          ...state,
          list: [action.channel,...state.list] };
      default:
        return { ...state };
    }
  }
  