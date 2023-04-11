import Head from "next/head";
import { HOME_OG_IMAGE_URL, WEBSITE_TITLE } from "../lib/constants";

const Meta = () => {
  return (
    <Head>
      <link rel="apple-touch-icon" sizes="180x180" href="/assets/coot.svg" />
      <link rel="icon" type="image/png" sizes="32x32" href="/assets/coot.svg" />
      <link rel="icon" type="image/png" sizes="16x16" href="/assets/coot.svg" />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link rel="mask-icon" href="/assets/coot.svg" color="#000000" />
      <link rel="shortcut icon" href="/assets/coot.svg" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#000" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <meta name="description" content={WEBSITE_TITLE} />
      {/* This uses pages/api/og.tsx */}
      <meta property="og:image" content={HOME_OG_IMAGE_URL} />
    </Head>
  );
};

export default Meta;
