import { arenaBase } from "../config";
import {  ArenaBlock, ArenaChannel, CustomArenaChannel} from "arena-ts";

export function buildChannelUrl(channel: CustomArenaChannel) {
  const userSlug = channel?.user?.slug;
  const channelSlug = channel?.slug;
  if (userSlug === undefined || channelSlug === undefined) return arenaBase;

  return `${arenaBase}/${userSlug}/${channelSlug}`;
}

export function buildUserUrl(channel: CustomArenaChannel) : string{
  console.log(channel,"ouin")
  const userSlug = channel?.user?.slug;
  if (userSlug === undefined) return arenaBase;

  return `${arenaBase}/${userSlug}`;
}

export function massageUrl(url: string|undefined) :string|undefined {
  if (url == undefined) return undefined;
  if (url.includes("youtube")) {
    return url.split("&")[0];
  } else return url;
}

export function parseUsableBlocks(data: (ArenaBlock|ArenaChannel)[]): (ArenaBlock|ArenaChannel)[] {
  
  const usableBlocks :(ArenaBlock|ArenaChannel)[] = [];

  data?.forEach((block: ArenaBlock | ArenaChannel) => {
    if (block.class === "Channel") {
      usableBlocks.push(block);
    } else if (block.class === "Media") {
      if (
        block?.source?.provider?.name === "YouTube" ||
        block?.source?.provider?.name === "SoundCloud"
      ) {
        usableBlocks.push(block);
      }
    }
  });
  return usableBlocks;
}

export function parseTitle(title: string|null): string {
  if(title === null) return ""
  const maxLength = 35;
  let newTitle = title.replace(/&amp;/g, "&");

  if (newTitle.length > maxLength) {
    newTitle = newTitle.substring(0, maxLength) + "...";
  }
  return newTitle;
}
