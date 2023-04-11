import { AppProps } from "next/app";
import "../styles/index.css";
import { Be_Vietnam_Pro } from "next/font/google";

// Syntax highlighting
import "prism-themes/themes/prism-one-light.css";

// Font
const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={beVietnamPro.className}>
      <Component {...pageProps} />
    </main>
  );
}
