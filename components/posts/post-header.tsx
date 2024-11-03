import DateFormatter from "../shared/date-formatter";
import PostTitle from "./post-title";

type Props = {
  title: string;
  date: string;
  tags: string[];
};

const PostHeader = ({ title, date, tags }: Props) => {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="mb-6 text-xl">
        <DateFormatter dateString={date} />
      </div>
      <div className="flex flex-wrap gap-2 mb-6">
        {tags.map((tag) => (
          <span
            key={tag}
            className="bg-gray-200 text-gray-700 px-2 py-1 rounded-lg text-sm"
          >
            {tag}
          </span>
        ))}
      </div>
    </>
  );
};

export default PostHeader;
