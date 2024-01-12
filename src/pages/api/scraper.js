import bandcamp from "bandcamp-scraper";

export default async function handler(request, response) {
    const { track } = request.body;
    try {
        const trackInfo = await extractTrack(track);
        response.status(200).json({
            trackInfo: trackInfo.raw.trackinfo[0].file["mp3-128"],
        });
    } catch (error) {
        response.status(400).json({
            error: error,
        });
    }
}

const extractTrack = (track) => {
    return new Promise((resolve, reject) => {
        bandcamp.getTrackInfo(track, (error, trackInfo) => {
            if (error) {
                reject(error);
            } else {
                resolve(trackInfo);
            }
        });
    });
};
