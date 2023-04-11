import PostPreview from "./post-preview";
import type Post from "../interfaces/post";

type Props = {
  posts: Post[];
};

const AllStories = ({ posts }: Props) => {
  return (
    <section>
      <div className="grid grid-cols-1 md:gap-x-16 lg:gap-x-32 gap-y-8 md:gap-y-8 mb-32">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            date={post.date}
            slug={post.slug}
          />
        ))}
      </div>
    </section>
  );
};

export default AllStories;
