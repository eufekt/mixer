import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import { apiBase } from "../config";

export const useArena = (user) => {
  let headers = {};

  if (user!=null) {
    headers = { Authorization: `Bearer ${user.accessToken}` };
  }

  const fetcher = async (path) => {
    const url = `${apiBase}${path}`;
    const res = await fetch(url, { headers });

    if (!res.ok) {
      const error = new Error("An error occurred while fetching the data.");
      error.info = await res.json();
      error.status = res.status;
      throw error;
    }

    return res.json();
  };

  function FetchChannel(id) {
    const path = `/channels/${id}`;
    const { data, error, isLoading } = useSWR(path, fetcher, {
      revalidateOnMount: true,
    });

    return {
      data,
      isLoading,
      error,
    };
  }

  function FetchChannelContents(id) {
    const per = 30;

    const getKey = (pageIndex, previousPageData) => {
      if (previousPageData && !previousPageData.contents.length) return null;
      return `/channels/${id}/contents?page=${
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

  return {
    FetchChannel,
    FetchChannelContents,
  };
};
