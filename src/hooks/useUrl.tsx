import { useState, useEffect } from "react";
import { ArenaBlock } from "arena-ts";

type ArenaSource = ArenaBlock["source"];

const useUrl = (
  source: ArenaSource | undefined
): [string | undefined, boolean] => {
  const [url, setUrl] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const massageYoutubeUrl = (_url: string): string => {
    if (_url.includes("youtube")) {
      return _url.split("&")[0];
    } else return _url;
  };

  const getBandcampUrl = (_url: string) => {
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

    const parseUrls = (source: ArenaSource | undefined) => {
        if (!source || !source.provider) {
            setUrl(undefined);
            return;
        }
        switch (source.provider.name) {
            case "BandCamp":
                return getBandcampUrl(source.url);
            case "YouTube":
                return setUrl(massageYoutubeUrl(source.url));
            case "SoundCloud":
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
