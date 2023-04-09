import { AppProps } from "next/app";
import "../styles/index.css";
import { Be_Vietnam_Pro } from "next/font/google";

const inter = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <Component {...pageProps} />
    </main>
  );
}
