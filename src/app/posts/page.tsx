import Link from "next/link";
import { Header } from "../_ui/Header";
import { Footer } from "../_ui/Footer";
import { getAllPosts } from "@/lib/server/posts";

export default function Posts() {
  const allPosts = getAllPosts();
  return (
    <>
      <Header />
      <section className="py-4 w-full min-h-full">
        <h2 className="text-lg">All Posts</h2>
        <ul className="flex flex-col space-y-2 py-4">
          {allPosts.map((post) => (
            <li key={post.slug}>
              <Link href={`/posts/${post.slug}`}>
                {">"} {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <Footer />
    </>
  );
}
