import DateFormatter from "../shared/date-formatter";
import Link from "next/link";

type Props = {
  title: string;
  date: string;
  slug: string;
};

const PostPreview = ({ title, date, slug }: Props) => {
  return (
    <Link
      as={`/posts/${slug}`}
      href="/posts/[slug]"
      className="border-2 rounded-xl border-black transition ease-in-out hover:-translate-y-1 hover:scale-105 hover:bg-blue-300 hover:duration-150"
    >
      <div className="p-4">
        <h3 className="text-3xl mb-3 leading-snug">{title}</h3>
        <div className="text-lg mb-4">
          <DateFormatter dateString={date} />
        </div>
      </div>
    </Link>
  );
};

export default PostPreview;
