import { arenaBase } from "../config";


export function buildChannelUrl(channel) {
  const userSlug = channel?.user?.slug;
  const channelSlug = channel?.slug;
  if (userSlug === undefined || channelSlug === undefined) return arenaBase;

  return `${arenaBase}/${userSlug}/${channelSlug}`;
}

export function massageUrl(url) {
  if (url === undefined) return undefined;
  if (url.includes("youtube")) {
    return url.split("&")[0];
  } else return url;
}

export function parseUsableBlocks(data) {
  let usableBlocks = [];

  data?.forEach((block) => {
    if (block.class === "Channel") {
      usableBlocks.push(block);
    } else if (block.class === "Media") {
      if (
        block.source.provider.name === "YouTube" ||
        block.source.provider.name === "SoundCloud"
      ) {
        usableBlocks.push(block);
      }
    }
  });
  return usableBlocks;
}
