import useSWR from "swr";
import { apiBase, playlistChannel } from "../config";

const BASE = apiBase.development;

// const channelId = "saoul"

const fetcher = (...args) => fetch(...args).then((res) => res.json());

//TODO: NEXT fetch channel blocks per 100
export function useGetChannel(id) {
  
  const { data, error, isLoading } = useSWR(`${BASE}/channels/${id}`, fetcher);

  return {
    channel: data,
    isLoading,
    isError: error,
  };
}

export function useGetChannelContents(id) {
  const { data, error, isLoading } = useSWR(
    `${BASE}/channels/${id}/contents&per=100`,
    fetcher
  );

  return {
    contents: data,
    isLoading,
    isError: error,
  };
}

export function useGetChannelFilled() {

}
