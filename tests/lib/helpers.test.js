import {
  parseUsableBlocks,
  buildChannelUrl,
  massageUrl,
} from "@/src/lib/helpers";
import { arenaBase } from "@/src/config";

describe("parseUsableBlocks", () => {
  it("returns an empty array if given an empty array", () => {
    expect(parseUsableBlocks([])).toEqual([]);
  });

  it("filters out blocks that are not channels or media or incompatible media from the input array", () => {
    const data = [
      { class: "Channel" },
      { class: "Media", source: { provider: { name: "Vimeo" } } },
      { class: "NotMedia" },
    ];
    const expectedOutput = [{ class: "Channel" }];

    expect(parseUsableBlocks(data)).toEqual(expectedOutput);
  });

  it("filters out media blocks that are not from YouTube or SoundCloud", () => {
    const data = [
      {
        class: "Media",
        source: { provider: { name: "YouTube" } },
      },
      {
        class: "Media",
        source: { provider: { name: "SoundCloud" } },
      },
      {
        class: "Media",
        source: { provider: { name: "Vimeo" } },
      },
    ];
    const expectedOutput = [
      {
        class: "Media",
        source: { provider: { name: "YouTube" } },
      },
      {
        class: "Media",
        source: { provider: { name: "SoundCloud" } },
      },
    ];

    expect(parseUsableBlocks(data)).toEqual(expectedOutput);
  });

  it("should return empty array when passed parameter is undefined", () => {
    expect(parseUsableBlocks(undefined)).toEqual([]);
  });
});

describe("buildChannelUrl", () => {
  it("returns a url with the correct format", () => {
    const channel = {
      user: { slug: "test-user" },
      slug: "test-channel",
    };

    expect(buildChannelUrl(channel)).toEqual(
      `${arenaBase}/test-user/test-channel`
    );
  });

  it("returns arenaBase when passed parameter is undefined", () => {
    expect(buildChannelUrl(undefined)).toEqual(arenaBase);
  });

  it("returns only arenaBase when userSlug or channelSlug is undefined", () => {
    const channel = {
      slug: "test-channel",
    };

    expect(buildChannelUrl(channel)).toEqual(arenaBase);
  });
});

describe("massageUrl", () => {
  it("returns undefined when passed parameter is undefined", () => {
    expect(massageUrl(undefined)).toEqual(undefined);
  });

  it("returns the url when it is not a youtube url", () => {
    const url = "https://www.google.com";

    expect(massageUrl(url)).toEqual(url);
  });

  it("returns the url without the query string when it is a youtube url", () => {
    const url = "https://www.youtube.com/watch?v=12345&feature=emb_logo";

    expect(massageUrl(url)).toEqual("https://www.youtube.com/watch?v=12345");
  });
});
