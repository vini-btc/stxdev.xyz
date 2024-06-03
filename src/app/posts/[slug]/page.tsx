import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";
import { Header } from "@/app/_ui/Header";
import { Footer } from "@/app/_ui/Footer";

export default async function Post({ params }: Params) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || "");

  return (
    <>
      <Header />
      <article className="overflow-y-auto flex-grow flex-shrink py-16 prose">
        <h1 className="font-mono text-white font-normal">{post.title}</h1>
        <div
          className="text-white prose-h2:text-white prose-h2:font-mono prose-h2:font-normal"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </article>
      <Footer />
    </>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export function generateMetadata({ params }: Params): Metadata {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const title = `${post.title} | stxdev.xyz - Stacks, Clarity and Blockchain Development Blog`;

  return {
    title,
    openGraph: {
      title,
      images: [""],
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
