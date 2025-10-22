import * as bandcamp from "bandcamp-scraper";
import { NextRequest, NextResponse } from "next/server";

interface TrackInfo {
  raw: {
    trackinfo: Array<{
      file: {
        "mp3-128": string;
      };
    }>;
  };
}

export async function POST(request: NextRequest) {
  try {
    const { track } = await request.json();
    const trackInfo = await extractTrack(track);
    return NextResponse.json({
      trackInfo: trackInfo.raw.trackinfo[0].file["mp3-128"],
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 400 });
  }
}

const extractTrack = (track: string): Promise<TrackInfo> => {
  return new Promise((resolve, reject) => {
    bandcamp.getTrackInfo(track, (error: any, trackInfo: TrackInfo) => {
      if (error) {
        reject(error);
      } else {
        resolve(trackInfo);
      }
    });
  });
};
