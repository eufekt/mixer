import { arenaBase } from "../config";
import { ArenaBlock, ArenaChannelMod } from "arena-ts";

export function buildChannelUrl(channel) {
    const userSlug = channel?.user?.slug;
    const channelSlug = channel?.slug;
    if (userSlug === undefined || channelSlug === undefined) return arenaBase;

    return `${arenaBase}/${userSlug}/${channelSlug}`;
}

export function buildUserUrl(channel) {
    const userSlug = channel?.user?.slug;
    if (userSlug === undefined) return arenaBase;

    return `${arenaBase}/${userSlug}`;
}

export function massageUrl(url) {
    if (url == undefined) return undefined;
    if (url.includes("youtube")) {
        return url.split("&")[0];
    } else return url;
}

export function parseUsableBlocks(data) {
    const usableBlocks = [];

    data?.forEach((block) => {
        if (block.class === "Channel") {
            usableBlocks.push(block);
        } else if (block.class === "Media") {
            if (
                block?.source?.provider?.name === "YouTube" ||
                block?.source?.provider?.name === "SoundCloud" ||
                block?.source?.provider?.name === "BandCamp"
            ) {
                usableBlocks.push(block);
            }
        } else if(block.class === "Image") {
            usableBlocks.push(block);
        } else if (block.class === "Text") {
            usableBlocks.push(block);
        }
    });
    return usableBlocks;
}

export function parseTitle(title, maxLength = 35) {
    if (title === null) return "";
    let newTitle = title.replace(/&amp;/g, "&");

    if (newTitle.length > maxLength) {
        newTitle = newTitle.substring(0, maxLength) + "...";
    }
    return newTitle;
}

export const isBlockPlayable = (block) => {
    if (block.class === "Media") {
        if (
            block.source.provider.name === "YouTube" ||
            block.source.provider.name === "SoundCloud" ||
            block.source.provider.name === "BandCamp"
        ) {
            return true;
        }
    }
    return false;
};

export const isBlockWithImage= (block) => {

};
