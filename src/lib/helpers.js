import { arenaBase } from "../config";

export function buildChannelUrl(channel) {
  const userSlug = channel?.user?.slug;
  const channelSlug = channel?.slug;

  return `${arenaBase}/${userSlug}/${channelSlug}`;
}
