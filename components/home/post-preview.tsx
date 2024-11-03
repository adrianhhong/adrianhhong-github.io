import DateFormatter from "../shared/date-formatter";
import Link from "next/link";
import Tag from "./tag";

type Props = {
  title: string;
  date: string;
  slug: string;
  tags: string[];
};

const PostPreview = ({ title, date, slug, tags }: Props) => {
  return (
    <Link
      as={`/posts/${slug}`}
      href="/posts/[slug]"
      className="border-2 rounded-xl border-black transition ease-in-out hover:-translate-y-1 hover:scale-105 hover:bg-blue-300 hover:duration-150"
    >
      <div className="p-4 md:p-6">
        <h3 className="text-2xl md:text-3xl mb-2 md:mb-3 leading-snug">
          {title}
        </h3>
        <div className="text-base md:text-lg mb-3 md:mb-4">
          <DateFormatter dateString={date} />
        </div>
        <div className="flex flex-wrap gap-1 md:gap-2">
          {tags.map((tag) => (
            <Tag key={tag} tag={tag} />
          ))}
        </div>
      </div>
    </Link>
  );
};

export default PostPreview;
