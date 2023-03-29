import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import { apiBase, playlistChannel } from "../config";

const BASE = apiBase.development;

// const channelId = "saoul"

const fetcher = (...args) => fetch(...args).then((res) => res.json());

//TODO: NEXT fetch channel blocks per 100
export function useGetChannel(id) {
  const { data, error, isLoading } = useSWR(`${BASE}/channels/${id}`, fetcher);

  return {
    data,
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
    data,
    isLoading,
    isError: error,
  };
}

export function useGetChannelContentsPaginated(id) {
  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.contents.length) return null;
    return `${BASE}/channels/${id}/contents?page=${pageIndex+1}&per=20`;
  };

  const { data, error, isLoading, size, setSize } = useSWRInfinite(
    getKey,
    fetcher,
    // {initialSize:1000}
  );

  return { data, isError: error, isLoading, size, setSize };
}
