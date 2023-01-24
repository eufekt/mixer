import useSWR from "swr";
import { apiBase, playlistChannel } from "../config";

const BASE = apiBase.development
const channelId = "saoul"

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function useChannel() {
  const { data, error, isLoading } = useSWR(`${BASE}/channels/${channelId}`, fetcher);

  return {
    channel: data,
    isLoading,
    isError: error,
  };
}
