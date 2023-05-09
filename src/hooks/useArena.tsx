import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import useSWRMutation from "swr/mutation";
import { apiBase } from "../config";
import { Session } from "next-auth";

export const useArena = (user: Session["user"] | null) => {
  let headers = {};

  if (user != null) {
    headers = {
      Authorization: `Bearer ${user.accessToken}`,
      "Content-Type": "application/json",
    };
  }

  const fetcher = async (path:string, options: any) => {
    const url = `${apiBase}${path}`;
    const res = await fetch(url, { ...options, headers });

    if (!res.ok) {
      const error = new Error("An error occurred while fetching the data.") as any;
      error.info = await res.json();
      error.status = res.status;
      throw error;
    }

    return res.json();
  };

  function FetchChannel(id:string) {
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

  function ConnectBlockToChannel(channelId: number |undefined) {
    const url = `/channels/${channelId}/connections`;

    function _fetcher(path:string, { arg }: { arg: any }) {
      const body = JSON.stringify({
        connectable_type: arg.blockType,
        connectable_id: arg.blockId,
      });

      return fetcher(path, {
        method: "POST",
        body,
      });
    }
    const { trigger, isMutating } = useSWRMutation(url, _fetcher);
    return { trigger, isMutating };
  }

  function FetchUserChannels(id:number) {
    const per = 20;

    const getKey = (pageIndex: number, previousPageData: any) => {
      if (previousPageData && !previousPageData.channels.length) return null;
      return `/users/${id}/channels?page=${pageIndex + 1}&per=${per}`;
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

  function FetchChannelContents(id:string) {
    const per = 30;

    const getKey = (pageIndex: number, previousPageData: any) => {
      if (previousPageData && !previousPageData.contents.length) return null;
      return `/channels/${id}/contents?page=${
        pageIndex + 1
      }&per=${per}&sort=position&direction=desc`;
    };

    const {
      data,
      error,
      isLoading: reqLoading,
      size,
      setSize,
      isValidating,
    } = useSWRInfinite(getKey, fetcher, { revalidateOnFocus: false });

    const isLoading = reqLoading || isValidating;

    return { data, error, isLoading, size, setSize };
  }

  return {
    FetchChannel,
    FetchChannelContents,
    FetchUserChannels,
    ConnectBlockToChannel,
  };
};
