import markdownStyles from "../../styles/markdown-styles.module.css";
import Markdown from "react-markdown";
import Image from "next/image";
import rehypeCodeTitles from "rehype-code-titles";
import rehypePrismAll from "rehype-prism-plus/all";

type Props = {
  content: string;
  imageSizes: Record<string, { width: number; height: number }>;
};

const PostBody = ({ content, imageSizes }: Props) => {
  return (
    <div className="max-w-2xl mx-auto">
      <Markdown
        className={markdownStyles["markdown"]}
        components={{
          img: (props) => {
            if (imageSizes[props.src]) {
              const { src, alt } = props;
              const { width, height } = imageSizes[props.src];
              return (
                <Image src={src} alt={alt} width={width} height={height} />
              );
            } else {
              // If we don’t have the image’s dimensions, let’s use a classic
              // `img` element.
              return <img {...props} />;
            }
          },
        }}
        rehypePlugins={[rehypeCodeTitles, rehypePrismAll as any]}
      >
        {content}
      </Markdown>
    </div>
  );
};

export default PostBody;
