import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import { apiBase } from "../config";

const BASE = apiBase.development;

const fetcher = async (...args) => {
  const res = await fetch(...args);

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
};

export function useGetChannel(id) {
  const { data, error, isLoading } = useSWR(`${BASE}/channels/${id}`, fetcher, {
    revalidateOnMount: true,
  });

  return {
    data,
    isLoading,
    error,
  };
}
/**
 * TODO:Could you parse here for Media and Channel while maintaining pagination ?
 */
export function useGetChannelContentsPaginated(id) {
  const per = 30;
  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.contents.length) return null;
    return `${BASE}/channels/${id}/contents?page=${
      pageIndex + 1
    }&per=${per}sort=position&direction=desc`;
  };

  const {
    data,
    error,
    isLoading: reqLoading,
    size,
    setSize,
    isValidating,
  } = useSWRInfinite(getKey, fetcher);

  const isLoading = reqLoading || isValidating;

  return { data, error, isLoading, size, setSize };
}
