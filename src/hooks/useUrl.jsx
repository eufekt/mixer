import { useState, useEffect } from "react";

const useUrl = (source) => {
    const [url, setUrl] = useState(null);
    const [loading, setLoading] = useState(false);

    const massageYoutubeUrl = (_url) => {
        if (_url.includes("youtube")) {
            return _url.split("&")[0];
        } else return _url;
    };

    const getBandcampUrl = (_url) => {
        setLoading(true);
        fetch("/api/scraper", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ track: _url }),
        })
            .then((res) => res.json())
            .then((data) => {
                setUrl(data.trackInfo);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const parseUrls = (source) => {
        if (!source) return;
        switch (source.provider.name) {
            case "BandCamp":
                return getBandcampUrl(source.url);
            case "YouTube":
                return setUrl(massageYoutubeUrl(source.url));
            default:
                return setUrl(source.url);
        }
    };

    useEffect(() => {
        parseUrls(source);
    }, [source]);

    return [url, loading];
};
export default useUrl;

// {
//     "url": "https://coppicehalifax.bandcamp.com/track/a02-varia-2",
//     "title": "A02 Varia 2, by Coppice Halifax",
//     "provider": {
//         "name": "BandCamp",
//         "url": "http://bandcamp.com"
//     }
// }
