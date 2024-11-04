import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "../../components/shared/container";
import PostBody from "../../components/posts/post-body";
import PostHeader from "../../components/posts/post-header";
import Layout from "../../components/layout";
import { getPostBySlug, getAllPosts } from "../../lib/api";
import PostTitle from "../../components/posts/post-title";
import type PostType from "../../interfaces/post";
import sizeOf from "image-size";
import { join } from "path";

type Props = {
  post: PostType;
  morePosts: PostType[];
  preview?: boolean;
  imageSizes: Record<string, { width: number; height: number }>;
};

export default function Post({ post, morePosts, preview, imageSizes }: Props) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout>
      <Container>
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className="mb-32">
              <PostHeader
                title={post.title}
                date={post.date}
                tags={post.tags}
              />
              <PostBody content={post.content} imageSizes={imageSizes} />
            </article>
          </>
        )}
      </Container>
    </Layout>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "author",
    "content",
    "ogImage",
    "coverImage",
    "tags",
  ]);

  const imageSizes: Props["imageSizes"] = {};

  // A regular expression to iterate on all images in the post
  const iterator = post.content.matchAll(/\!\[.*]\((.*)\)/g);
  let match: IteratorResult<RegExpMatchArray, any>;
  while (!(match = iterator.next()).done) {
    const [, src] = match.value;
    try {
      // Images are stored in `public`
      const { width, height } = sizeOf(join("public", src));
      imageSizes[src] = { width, height };
    } catch (err) {
      console.error(`Can’t get dimensions for ${src}:`, err);
    }
  }

  return {
    props: {
      post,
      imageSizes,
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
