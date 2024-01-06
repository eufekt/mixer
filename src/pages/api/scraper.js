import bandcamp from "bandcamp-scraper";

export default async function handler(request, response) {
    const url = request.body.url;

    try {
        const trackInfo = await extractTrack(url);
        response.status(200).json({
            trackInfo: trackInfo,
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
