import markdownStyles from "../../styles/markdown-styles.module.css";
import Markdown from "react-markdown";
import rehypeCodeTitles from "rehype-code-titles";
import rehypePrismAll from "rehype-prism-plus/all";

type Props = {
  content: string;
};

const PostBody = ({ content }: Props) => {
  return (
    <div className="max-w-5xl mx-auto">
      <Markdown
        className={markdownStyles["markdown"]}
        components={{
          a: (props) => (
            <a href={props.href} target="_blank" rel="noreferrer">
              {props.children}
            </a>
          ),
        }}
        rehypePlugins={[rehypeCodeTitles, rehypePrismAll as any]}
      >
        {content}
      </Markdown>
    </div>
  );
};

export default PostBody;
