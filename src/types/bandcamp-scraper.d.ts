declare module "bandcamp-scraper" {
  interface TrackInfo {
    raw: {
      trackinfo: Array<{
        file: {
          "mp3-128": string;
        };
      }>;
    };
  }

  export function getTrackInfo(
    url: string,
    callback: (error: any, trackInfo: TrackInfo) => void
  ): void;
}
