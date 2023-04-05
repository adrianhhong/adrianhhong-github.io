import Head from "next/head";
import Alert from "./alert";
import Footer from "./footer";
import Meta from "./meta";
import { WEBSITE_TITLE } from "../lib/constants";
import Header from "./header";

type Props = {
  preview?: boolean;
  children: React.ReactNode;
};

const Layout = ({ preview, children }: Props) => {
  return (
    <>
      <Meta />
      <Head>
        <title>{WEBSITE_TITLE}</title>
      </Head>
      <div className="min-h-screen">
        <Header />
        <main>{children}</main>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
