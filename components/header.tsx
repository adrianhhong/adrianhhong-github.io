import Image from "next/image";
import Link from "next/link";
import { SiGithub, SiLinkedin } from "react-icons/si";

const Header = () => {
  return (
    <div className="flex justify-between mb-20 mt-8 mx-11">
      <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight">
        <Link href="/" className="hover:underline">
          <Image
            src="/assets/coot.svg"
            alt="Adrian Hong Logo"
            width={200}
            height={200}
          />
        </Link>
      </h2>
      <div className="flex gap-x-5 flex-row">
        <a
          href="https://www.linkedin.com/in/adrianhhong/"
          rel="noreferrer noopener"
          target="_blank"
          className="align-middle"
        >
          <SiLinkedin size={40} />
        </a>
        <a
          href="https://github.com/adrianhhong"
          rel="noreferrer noopener"
          target="_blank"
        >
          <SiGithub size={40} />
        </a>
      </div>
    </div>
  );
};

export default Header;
