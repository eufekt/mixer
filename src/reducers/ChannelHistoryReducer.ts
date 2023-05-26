import { ChannelHistoryInterface } from "../contexts/ChannelHistoryContext";

/**
 * list: array of playable are.na blocks
 */
export const channelHistoryReducerInitialState = {
    list: [{
        "id": 1991453,
        "url": "/",
        "title": "mixer",
        "status": "public"
    }]
  };

interface ChannelHistoryState {
    list: ChannelHistoryInterface[];
}
  
  export function channelHistoryReducer(state: ChannelHistoryState, action:any) {
    switch (action.type) {
        case "pushToHistory":
          const isPresentInHistory = state.list.some((channel:ChannelHistoryInterface) => channel.id === action.channel.id); 
          let newList; 
          if(!isPresentInHistory){
            newList = [action.channel, ...state.list] 
          } else {
            newList = [...state.list]
          }
          return {
           ...state,
           list: newList
          };
        case "CLEAN_HISTORY":
          return {
            ...state,
            list: channelHistoryReducerInitialState.list
          }

      default:
        return { ...state };
    }
  }
  