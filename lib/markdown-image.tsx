import Image from "next/image";

export const MarkdownImage = ({ src, alt }) => (
  <Image src={src} alt={alt} width={800} height={450} placeholder="blur" />
);
