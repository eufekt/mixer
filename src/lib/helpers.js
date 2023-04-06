import { arenaBase } from "../config";

export function buildChannelUrl(channel) {
  const userSlug = channel?.user?.slug;
  const channelSlug = channel?.slug;

  return `${arenaBase}/${userSlug}/${channelSlug}`;
}

export function massageUrl(url) {
  if (url === undefined) return undefined;
  if (url.includes("youtube")) {
    return url.split("&")[0];
  } else return url;
}
