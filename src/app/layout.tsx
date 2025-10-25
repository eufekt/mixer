import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Providers } from "./providers";
import Layout from "../components/Layout";
import Main from "../components/Main";
import "../styles/Global.sass";

export const metadata: Metadata = {
  title: "Mixer",
  description: "Blocks playback for are.na",
  openGraph: {
    title: "mixer",
    description: "Blocks playback for are.na",
    url: "https://www.arena-mixer.com/",
    siteName: "mixer",
    type: "website",
  },
  other: {
    "og:type": "music.playlist",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      style={{ backgroundColor: "rgb(155, 79, 202)", height: "100%" }}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://www.arena-mixer.com/" />
      </head>
      <body
        style={{
          backgroundColor: "rgb(155, 79, 202)",
          margin: 0,
          padding: 0,
          height: "100%",
          minHeight: "100vh",
        }}
      >
        <Providers>
          <Main>
            <Layout>{children}</Layout>
          </Main>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
