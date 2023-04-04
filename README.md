# Are.na Mixer
Are.na Mixer is an online music player that allows you to play music from Youtube and Soundcloud links stored in are.na channels. 

Are.na Mixer is available on

> Are.na is a place to save content, create collections over time and connect ideas. Privately or with other people [...] With no ads, likes, or recommendations, Are.na is a more mindful space where you can work through any project over time. It's a place to structure your ideas and build new forms of knowledge together. Learn more at [are.na/about](https://www.are.na/about)

## Use case
Are.na allows you to save images, text, links, files and more from your phone or browser. What you save is called a block and a channel is made of many blocks. In this case a channel is a list of Youtube and Soundcloud links that are curated into a playlist. These curated playlists can be played in the Mixer app. Many Youtube or Soundcloud links are not found on the current streaming platforms. This app allows you to listen to those links with playlist features.

## Current Features
- Fetches the channels from the [are.na API](https://dev.are.na/documentation/channels)
- Browse playlists stored in [seed](https://www.are.na/la-src/seed-nwf3b3nhr-a)
- Autoplay playlists on selection
- Play, pause, next, go back

## Roadmap
- Parse dead links
- Add a search bar to search for playlists
- Load playlist by pasting a link
- Add a "shuffle" button to the player
- Add volume control on browser
- Add ability to see hisory and whats next
- Enhance channel navigation with a router (with Next.js routing). 
- Enhance the app with local storage where applicable (e.g. history, favorites, etc.)
- Mobile support
- Are.na authentication to manage blocks

## Techstack
- React.js
- Next.js
- Are.na API

## Other
The motivation behind this project was to make a tool similar to [mac.are.na](https://mac.are.na/) but enhanced with images as I often did not recognize the artist names or song titles that I saved. I also wanted to learn more about React.js and Next.js.

You can save content with are.na while browsing the internet with the are.na [chrome extension](https://chrome.google.com/webstore/detail/arena/lkihjlcipnbgeokmfnpogjfflofbfhga)

You can boost your are.na channel organization with the are.na [multiplexer](https://github.com/mguidetti/are.na-multiplexer)

You can also just enjoy vanilla [are.na](https://www.are.na/) as a social network and a place to save content. Their open source api allows you to experiment with the vast amount of channels curated by the community.

