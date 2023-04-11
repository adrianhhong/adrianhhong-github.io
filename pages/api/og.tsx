import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "edge",
};

export default async function handler() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          fontSize: 40,
          color: "black",
          background: "white",
          width: "100%",
          height: "100%",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <svg
          width="1000"
          height="1000"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.24624 42C-2.25379 61.5 18.7462 88.7229 41.7462 90C64.7462 91.2771 80.7462 73.5 71.2462 49L53.7462 46C52.2462 52.6667 39.5 55.5 9.24624 42Z"
            fill="#000"
            stroke="#000"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M83.8129 34.3283C86.7963 36.2956 91.587 36.2812 93.8599 38.2621C93.2724 44.1653 84.2345 44.3813 79.7462 43.5278L83.8129 34.3283Z"
            fill="#000"
          />
          <circle
            cx="64.7462"
            cy="31"
            r="19.5"
            fill="#000"
            stroke="#000"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <circle cx="74.7462" cy="35" r="3" fill="#fff" />
        </svg>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
