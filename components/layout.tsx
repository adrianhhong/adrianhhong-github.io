import Head from "next/head";
import Meta from "./meta";
import { WEBSITE_TITLE } from "../lib/constants";
import Header from "./header";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Meta />
      <Head>
        <title>{WEBSITE_TITLE}</title>
      </Head>
      <div>
        <Header />
        <main>{children}</main>
      </div>
    </>
  );
};

export default Layout;
