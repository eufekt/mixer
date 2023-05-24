import { createContext, useContext } from "react";
export interface ChannelHistoryInterface {
  id: number;
  url: string;
  title: string;
  status: string;
}
export interface ChannelHistoryContextInterface {
  channelHistory: { list: ChannelHistoryInterface[] };
  channelHistoryDispatch: any;
}

const ChannelHistoryContext =
  createContext<ChannelHistoryContextInterface | null>(null);

export function useChannelHistoryContext() {
  return useContext(ChannelHistoryContext);
}

export default ChannelHistoryContext;
